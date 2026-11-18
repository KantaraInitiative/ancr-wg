// Builds the ANCR DPV vocabulary from the four term lists.
// Usage: bun build.ts [outdir]   (default: ./dist)
// Writes ancr.ttl, conv108.ttl, mappings.ttl, ancr-context.jsonld and register.csv.
import * as A from "./terms-ancr.ts"
import * as C from "./terms-conv108.ts"
import * as N from "./ntc-link.ts"
import * as M from "./mappings.ts"

const out = process.argv[2] ?? `${import.meta.dir}/dist`
const VERSION = "0.7"
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
const csvq = (s: string) => `"${s.replace(/"/g, '""')}"`

// ---------- legal elements ----------
function parseCsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let f = ""; let q = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (q) { if (ch === '"' && text[i + 1] === '"') { f += '"'; i++ } else if (ch === '"') q = false; else f += ch }
    else if (ch === '"') q = true
    else if (ch === ",") { row.push(f); f = "" }
    else if (ch === "\n") { row.push(f); rows.push(row); row = []; f = "" }
    else if (ch !== "\r") f += ch
  }
  if (f || row.length) { row.push(f); rows.push(row) }
  return rows
}
const [hdr, ...elRows] = parseCsv(await Bun.file(`${import.meta.dir}/conv108-legal-elements.csv`).text())
const col = (n: string) => hdr.indexOf(n)
export const ELEMENTS = elRows.filter(r => r.length > 1).map(r => ({
  id: r[col("element_id")].replace(/^conv108:/, ""), citation: r[col("citation")], heading: r[col("heading")],
  text: r[col("text")], source: r[col("source")],
}))

const PREFIXES = [
  `@prefix ancr: <${A.NS}> .`, `@prefix conv108: <${C.NS}> .`, `@prefix ancrf: <${M.ANCRF_NS}> .`, `@prefix ntc: <${N.NS}> .`,
  "@prefix dpv: <https://w3id.org/dpv#> .", "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .",
  "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .", "@prefix owl: <http://www.w3.org/2002/07/owl#> .",
  "@prefix skos: <http://www.w3.org/2004/02/skos/core#> .", "@prefix dct: <http://purl.org/dc/terms/> .",
  "@prefix sw: <http://www.w3.org/2003/06/sw-vocab-status/ns#> .", "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .", "",
]
const ontology = (iri: string, title: string, desc: string) => [
  `<${iri}> a owl:Ontology ;`, `    dct:title "${title}"@en ;`, `    dct:description "${esc(desc)}"@en ;`,
  '    dct:creator "Mark Lizar" ;', `    owl:versionInfo "${VERSION}" ;`, '    dct:license <https://creativecommons.org/licenses/by/4.0/> .', "",
]
const register: string[][] = [["iri", "module", "kind", "status", "stack_layer", "source", "definition"]]

// ---------- module 1: ancr ----------
const a: string[] = [...PREFIXES, ...ontology(A.NS.replace(/#$/, ""), "ANCR Extension fields and controlled values",
  "Module 1 of the ANCR DPV vocabulary. An identifier for each field and controlled value of the ANCR Extension for ISO/IEC TS 27560:2023, Release 1. Each identifier is an address for the Extension definition, not a new definition.")]
a.push("# Fields")
for (const [f, , clause, def] of A.FIELDS) {
  a.push(`ancr:${f} a rdf:Property ;`, `    rdfs:label "${f}" ;`, `    skos:definition "${esc(def)}"@en ;`,
    `    dct:source "ANCR Extension for ISO/IEC TS 27560:2023, ${clause}" ;`, '    sw:term_status "proposed" .', "")
  register.push([`ancr:${f}`, "ancr", "field", "proposed", "5 Evidence", `ANCR Extension ${clause}`, def])
}
a.push("# Deprecated field names, accepted on input for one revision cycle")
for (const [old, cur] of A.DEPRECATED) {
  a.push(`ancr:${old} a rdf:Property ;`, `    owl:equivalentProperty ancr:${cur} ;`, "    owl:deprecated true ;",
    `    skos:definition "Deprecated name of ancr:${cur}"@en .`, "")
  register.push([`ancr:${old}`, "ancr", "field", "deprecated", "5 Evidence", `replaced by ancr:${cur}`, ""])
}
a.push("# Controlled values")
const seen = new Set<string>()
for (const [field, v] of Object.entries(A.VALUES)) {
  if (v.parentDef && !seen.has(v.parent)) {
    seen.add(v.parent)
    const broader = v.parent === "ancr:NoticeType" ? "    skos:broader dpv:Notice ;\n" : ""
    a.push(`${v.parent} a rdfs:Class, skos:Concept ;`, `${broader}    skos:definition "${esc(v.parentDef)}"@en ;`,
      `    dct:source "ANCR Extension, ${v.clause}" ;`, '    sw:term_status "proposed" .', "")
    register.push([v.parent, "ancr", "value class", "proposed", "5 Evidence", `ANCR Extension ${v.clause}`, v.parentDef])
  }
  for (const [val, iri, parent, note] of v.values) {
    if (!iri.startsWith("ancr:")) { register.push([iri, "dpv", "value", "reused", "2 Framework", `value ${val} of ${field}`, note]); continue }
    const rel = iri === "ancr:NoticeTypePolicy" ? "    skos:related dpv:PrivacyNotice ;\n" : ""
    a.push(`${iri} a rdfs:Class, skos:Concept ;`, `    rdfs:subClassOf ${parent} ;`, `    skos:broader ${parent} ;`, `    skos:notation "${val}" ;`,
      `${rel}    skos:definition "${esc(note)}"@en ;`, `    dct:source "ANCR Extension, ${v.clause}, value ${val} of ${field}" ;`, '    sw:term_status "proposed" .', "")
    register.push([iri, "ancr", "value", "proposed", "5 Evidence", `ANCR Extension ${v.clause}, ${field}=${val}`, note])
  }
}
a.push("# Exposure classes", "ancr:Exposure a rdfs:Class ;", '    skos:definition "Exposure of a field value, ANCR Extension 7.3.2"@en ;', '    sw:term_status "proposed" .', "")
for (const [iri, def] of A.EXPOSURE) {
  a.push(`${iri} a rdfs:Class ;`, "    rdfs:subClassOf ancr:Exposure ;", `    skos:definition "${esc(def)}"@en ;`, '    sw:term_status "proposed" .', "")
  register.push([iri, "ancr", "exposure class", "proposed", "5 Evidence", "ANCR Extension 7.3.2", def])
}
a.push("# Relation from a field to the legal element it carries evidence for",
  "ancr:evidences a rdf:Property ;", "    rdfs:domain rdf:Property ;",
  '    skos:definition "The field carries evidence for the legal element. The relation adds no obligation."@en ;', '    sw:term_status "proposed" .', "")
register.push(["ancr:evidences", "ancr", "property", "proposed", "5 Evidence", "this vocabulary", "The field carries evidence for the legal element"])

// ---------- module 2: conv108 ----------
const c: string[] = [...PREFIXES, ...ontology(C.NS.replace(/#$/, ""), "Convention 108+ legal model",
  "Module 2 of the ANCR DPV vocabulary. The requirements of the modernised Convention 108 that a notice and consent record evidences, with an identifier for each legal element and an AI transparency profile anchored outside Convention 108+. Convention 108+ (CETS 223) is not yet in force.")]
c.push("conv108:LegalElements a skos:ConceptScheme ;", '    skos:prefLabel "Convention 108+ legal elements"@en ;',
  '    skos:definition "Identifiers for the articles, paragraphs and points of Convention 108+, its preamble and appendix, and the Explanatory Report paragraphs relied on. They name the treaty structure and add no obligation."@en .', "")
for (const e of ELEMENTS) {
  c.push(`conv108:${e.id} a skos:Concept ;`, "    skos:inScheme conv108:LegalElements ;", `    skos:prefLabel "${esc(e.citation)}"@en ;`,
    ...(e.heading ? [`    skos:altLabel "${esc(e.heading)}"@en ;`] : []), `    skos:definition "${esc(e.text)}"@en ;`, `    dct:source "${esc(e.source)}" .`, "")
  register.push([`conv108:${e.id}`, "conv108", "legal element", "proposed", "6 Treaty", e.source, e.citation])
}
c.push("# Legal model terms")
for (const t of C.TERMS) {
  const type = t.kind === "class" ? "rdfs:Class, skos:Concept" : "rdf:Property"
  const lines = [`conv108:${t.term} a ${type} ;`]
  if (t.parent) lines.push(`    rdfs:subClassOf ${t.parent} ;`)
  if (t.anchors.length) lines.push(`    dct:source ${t.anchors.map(x => `conv108:${x}`).join(", ")} ;`)
  if (t.source) lines.push(`    dct:bibliographicCitation "${esc(t.source)}" ;`)
  if (t.related) lines.push(`    skos:related ${t.related.join(", ")} ;`)
  lines.push(`    skos:scopeNote "Operational Transparency Stack: ${t.layer}"@en ;`, `    skos:definition "${esc(t.definition)}"@en ;`, '    sw:term_status "proposed" .', "")
  c.push(...lines)
  register.push([`conv108:${t.term}`, "conv108", t.kind, "proposed", t.layer,
    [t.anchors.map(x => `conv108:${x}`).join(" "), t.source ?? ""].filter(Boolean).join("; "), t.definition])
}

// Module 3 (NTC controls) moved to ntc-v1/controls on 17 November 2026: NTC is the PWI 26689 companion vocabulary,
// developed in ad hoc group WG 5-57-001. This vocabulary links to it and does not include it.

// ---------- module 4: mappings ----------
const m: string[] = [...PREFIXES, ...ontology("https://kantarainitiative.github.io/ancr-wg/ns/ancr-dpv-mappings", "ANCR DPV mappings",
  "Module 4 of the ANCR DPV vocabulary. Each Extension field or value has one identifier, in ancr:. Other names for it are kept as deprecated equivalents. Also relates fields to the legal elements they carry evidence for.")]
m.push("# conv108: properties retired in favour of the ancr: field")
for (const [old, field, clause] of M.CONV108_RETIRED) {
  m.push(`conv108:${old} a rdf:Property ;`, `    owl:equivalentProperty ancr:${field} ;`, "    owl:deprecated true ;",
    `    skos:definition "Retired. Use ancr:${field}, ANCR Extension ${clause}"@en .`, "")
  register.push([`conv108:${old}`, "mappings", "property", "deprecated", "5 Evidence", `replaced by ancr:${field}`, ""])
}
m.push("# ancrf: withdrawn")
for (const f of M.ANCRF_TERMS) {
  m.push(`ancrf:${f} owl:equivalentProperty ancr:${f} ;`, "    owl:deprecated true .", "")
  register.push([`ancrf:${f}`, "mappings", "property", "deprecated", "5 Evidence", `replaced by ancr:${f}`, ""])
}
m.push("# Fields and the legal elements they carry evidence for")
for (const [f, els] of M.EVIDENCES) m.push(`ancr:${f} ancr:evidences ${els.map(e => `conv108:${e}`).join(", ")} .`)
m.push("")

// ---------- JSON-LD context ----------
const ctx: Record<string, any> = { "@version": 1.1, "@protected": true, ancr: A.NS, conv108: C.NS, dpv: "https://w3id.org/dpv#", xsd: "http://www.w3.org/2001/XMLSchema#" }
for (const [f, kind] of A.FIELDS) {
  const id = `ancr:${f}`
  ctx[f] = kind === "uri" ? { "@id": id, "@type": "@id" } : kind === "datetime" ? { "@id": id, "@type": "xsd:dateTime" }
    : kind === "vocab" ? { "@id": id, "@type": "@vocab" } : id
}
for (const [old, cur] of A.DEPRECATED) ctx[old] = ctx[cur] ?? `ancr:${cur}`
for (const v of Object.values(A.VALUES)) for (const [val, iri] of v.values) {
  if (ctx[val] && ctx[val] !== iri) throw new Error(`value collides with a key: ${val}`)
  ctx[val] = iri
}
// ITCoP code of practice declaration, carried in code_of_conduct. Its terms are NTC terms, linked by namespace.
Object.assign(ctx, { ntc: N.NS, dct: "http://purl.org/dc/terms/" })
ctx.code_of_conduct = { ...ctx.code_of_conduct, "@context": N.DECLARATION_CONTEXT }
for (const [val, iri] of Object.entries(N.DECLARATION_VALUES)) {
  if (ctx[val] && ctx[val] !== iri) throw new Error(`value collides with a key: ${val}`)
  ctx[val] = iri
}

await Bun.write(`${out}/ancr.ttl`, a.join("\n"))
await Bun.write(`${out}/conv108.ttl`, c.join("\n"))
await Bun.write(`${out}/mappings.ttl`, m.join("\n"))
await Bun.write(`${out}/ancr-context.jsonld`, JSON.stringify({ "@context": ctx }, null, 2) + "\n")
await Bun.write(`${out}/register.csv`, register.map(r => r.map(csvq).join(",")).join("\n") + "\n")
const count = (mod: string) => register.filter(r => r[1] === mod).length
console.log(`ancr ${count("ancr")}, conv108 ${count("conv108")} (legal elements ${ELEMENTS.length}, model terms ${C.TERMS.length}), mappings ${count("mappings")}, register rows ${register.length - 1}`)
