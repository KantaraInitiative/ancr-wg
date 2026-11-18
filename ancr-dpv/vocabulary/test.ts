// Checks the built vocabulary. Usage: bun build.ts && bun test.ts
import { Parser } from "n3"
import jsonld from "jsonld"
import * as A from "./terms-ancr.ts"
import * as C from "./terms-conv108.ts"
import * as N from "./ntc-link.ts"
import * as M from "./mappings.ts"

const dist = `${import.meta.dir}/dist`
const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
let failures = 0
const check = (name: string, ok: boolean, detail = "") => { console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ": " + detail : ""}`); if (!ok) failures++ }

// 1. Each Turtle file parses, and no IRI is typed (defined) in more than one module
const typedIn = new Map<string, string[]>()
const allSubjects = new Set<string>()
const objects = new Map<string, string[]>()
for (const f of ["ancr.ttl", "conv108.ttl", "mappings.ttl"]) {
  try {
    const quads = new Parser().parse(await Bun.file(`${dist}/${f}`).text())
    check(`${f} parses`, true, `${quads.length} triples`)
    for (const q of quads) {
      allSubjects.add(q.subject.value)
      if (q.object.termType === "NamedNode") objects.set(f, [...(objects.get(f) ?? []), q.object.value])
      if (q.predicate.value === RDF_TYPE) typedIn.set(q.subject.value, [...new Set([...(typedIn.get(q.subject.value) ?? []), f])])
    }
  } catch (e: any) { check(`${f} parses`, false, e.message) }
}
const twice = [...typedIn].filter(([, fs]) => fs.length > 1)
check("no term is defined in two modules", twice.length === 0, twice.map(([i, fs]) => `${i} in ${fs.join(", ")}`).join("; "))

// 2. Cross-references resolve
const fields = new Set(A.FIELDS.map(f => f[0]))
const ancrValues = new Set(Object.values(A.VALUES).flatMap(v => v.values.map(x => x[1])))
const elements = new Set((await Bun.file(`${import.meta.dir}/conv108-legal-elements.csv`).text()).split("\n").slice(1).map(l => l.split(",")[0].replace(/"/g, "").replace(/^conv108:/, "")).filter(Boolean))
const badAnchors = C.TERMS.flatMap(t => t.anchors.filter(a => !elements.has(a)).map(a => `${t.term}->${a}`))
check("every legal model anchor is a legal element", badAnchors.length === 0, badAnchors.join(", "))
const badEv = M.EVIDENCES.flatMap(([f, els]) => [...(!fields.has(f) ? [f] : []), ...els.filter(e => !elements.has(e))])
check("every evidences relation names a real field and element", badEv.length === 0, badEv.join(", "))
const badRet = M.CONV108_RETIRED.filter(([, f]) => !fields.has(f)).map(r => r[1])
check("every retired conv108 property maps to an ancr field", badRet.length === 0, badRet.join(", "))
const badF = M.ANCRF_TERMS.filter(f => !fields.has(f))
check("every ancrf term maps to an ancr field", badF.length === 0, badF.join(", "))
const A_NS = A.NS, C108 = "https://kantarainitiative.github.io/ancr-wg/ns/conv108plus#"
const ancrTerms = new Set([...fields, ...ancrValues.values()].map(x => x.replace(/^ancr:/, "")))
// NTC controls checks moved to ntc-v1/controls/test-controls.ts with the module (17 November 2026).
const undefinedTerms = C.TERMS.filter(t => /to be supplied/.test(t.definition)).map(t => t.term)
check("every legal model term has a definition", undefinedTerms.length === 0, undefinedTerms.join(", "))

// 3. The JSON-LD context expands Extension records in safe mode (fails on any key it cannot map)
const ctx = (await Bun.file(`${dist}/ancr-context.jsonld`).json())["@context"]
const docs: Record<string, object> = {
  receipt: { schema_version: "ancr-notice-receipt-2.0", receipt_id: "urn:uuid:7d1f0c2e-0b8a-4c51-9a63-2f0e6c1d4b11", notice_id: "https://example.org/notice",
    notice_version_reference: "https://example.org/notice/v/2026-11-01", controller_identification_record_id: "https://example.org/.well-known/cir",
    presented_at: "2026-11-18T14:05:00Z", lawful_basis: "legal_obligation", purpose: "Age assurance for account opening", notice_type: "statement" },
  authorization_state: { authorization_state_id: "aso-0002", controller_identification_record_id: "https://example.org/.well-known/cir",
    purpose_state: [{ purpose: "Newsletter", lawful_basis: "consent", state: "withdrawn", state_time: "2026-11-20T09:00:00Z" }],
    record_validity: "valid", state_time: "2026-11-20T09:00:00Z", state_source: "individual" },
  event: { event_id: "nel-19", event_time: "2026-11-01T00:00:00Z", event_type: "notice_material_change", notice_id: "https://example.org/notice" },
  legacy_name: { controller_identity_record_id: "https://example.org/.well-known/cir" },
}
for (const [name, doc] of Object.entries(docs)) {
  try {
    const nq = (await jsonld.toRDF({ "@context": ctx, ...doc }, { format: "application/n-quads", safe: true })) as string
    check(`context expands ${name}`, true, `${nq.trim().split("\n").length} triples`)
  } catch (e: any) { check(`context expands ${name}`, false, e.message) }
}

// 4. Age assurance pilot fixtures: expand in safe mode and carry the expected terms
const fx = `${import.meta.dir}/fixtures/age-assurance`
const expect: Record<string, string[]> = {
  "cir.json": ["urn:x-ntc:v1:CodeOfPracticeDeclaration", "urn:x-ntc:v1:ITCoPPrinciple8", "urn:x-ntc:v1:SelfDeclared", "ancr#code_of_conduct"],
  "receipt.json": ["dpv#LegalObligation", "ancr#NoticeTypeStatement"],
  "authorization-state.json": ["ancr#PurposeStateObjected", "ancr#PurposeStateGiven", "dpv#LegitimateInterest", "ancr#StateSourceIndividual"],
}
const used = new Set<string>()
for (const [file, want] of Object.entries(expect)) {
  const doc = await Bun.file(`${fx}/${file}`).json()
  try {
    const nq = (await jsonld.toRDF({ "@context": ctx, ...doc }, { format: "application/n-quads", safe: true })) as string
    const missing = want.filter(w => !nq.includes(w))
    check(`pilot ${file} expands with the expected terms`, missing.length === 0, missing.length ? `missing ${missing.join(", ")}` : `${nq.trim().split("\n").length} triples`)
    for (const m of nq.matchAll(/<https:\/\/kantarainitiative\.github\.io\/ancr-wg\/ns\/ancr#([a-z_]+)>/g)) used.add(m[1])
  } catch (e: any) { check(`pilot ${file} expands`, false, e.message) }
}
const linked = new Set(M.EVIDENCES.map(e => e[0]))
console.log(`INFO  pilot fields with no link to the law: ${[...used].filter(f => fields.has(f) && !linked.has(f)).sort().join(", ")}`)

console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed")
process.exit(failures ? 1 : 0)
