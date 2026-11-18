// Builds the namespace documents for the ANCR vocabulary IRIs into the site folder, so each IRI resolves once merged.
// Each IRI base https://kantarainitiative.github.io/ancr-wg/ns/<module># gets ns/<module>/index.html, with an anchor per
// term so that <base>#<term> lands on its definition, and the module's Turtle beside it. The pages are provisional:
// they move to the Kantara ANCR site only once the Working Group accepts the vocabulary.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Parser } from "n3";

const SRC = "dist"; // run from ancr-dpv/vocabulary
const OUT = "../../ancr-ts-27560-extension/docs/ns"; // served by the site at https://kantarainitiative.github.io/ancr-wg/ns/
const BASE = "https://kantarainitiative.github.io/ancr-wg/ns/";
const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", RDFS = "http://www.w3.org/2000/01/rdf-schema#", SKOS = "http://www.w3.org/2004/02/skos/core#";
const DCT = "http://purl.org/dc/terms/", OWL = "http://www.w3.org/2002/07/owl#", SW = "http://www.w3.org/2003/06/sw-vocab-status/ns#";
const STAGED = "17 November 2026";
const PROVISIONAL = `Provisional. These identifiers are proposed in the ANCR DPV vocabulary draft 0.7. The ANCR Working Group and Kantara Initiative have not yet accepted them. They are staged by TCIEG for review and will be published at this address only after acceptance. They are not DPV, W3C, ISO/IEC or Council of Europe identifiers. Definitions may change before acceptance; the identifiers are intended to stay the same.`;

type Term = { iri: string; local: string; types: string[]; props: Record<string, string[]> };
const modules = new Map<string, { file: string; ontology?: Term; terms: Term[] }>();
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const short = (iri: string) => {
  for (const [p, ns] of [["rdf:", RDF], ["rdfs:", RDFS], ["skos:", SKOS], ["dct:", DCT], ["owl:", OWL], ["dpv:", "https://w3id.org/dpv#"], ["xsd:", "http://www.w3.org/2001/XMLSchema#"], ["sw:", "http://www.w3.org/2003/06/sw-vocab-status/ns#"]] as const) if (iri.startsWith(ns)) return p + iri.slice(ns.length);
  if (iri.startsWith(BASE)) { const [m, l] = iri.slice(BASE.length).split("#"); return l ? `${m}:${l}` : iri; }
  return iri;
};
const link = (iri: string) => iri.startsWith(BASE) ? (() => { const [m, l] = iri.slice(BASE.length).split("#"); return `<a href="../${m}/${l ? `#${encodeURIComponent(l)}` : ""}">${esc(short(iri))}</a>`; })()
  : /^https?:/.test(iri) ? `<a href="${esc(iri)}">${esc(short(iri))}</a>` : esc(iri);

for (const file of ["ancr.ttl", "conv108.ttl", "mappings.ttl"]) {
  const quads = new Parser().parse(readFileSync(join(SRC, file), "utf8"));
  const subj = new Map<string, Term>();
  for (const q of quads) {
    if (q.subject.termType !== "NamedNode" || !q.subject.value.startsWith(BASE)) continue;
    const iri = q.subject.value; const [mod, local = ""] = iri.slice(BASE.length).split("#");
    if (!subj.has(iri)) subj.set(iri, { iri, local, types: [], props: {} });
    const t = subj.get(iri)!; const p = q.predicate.value;
    if (p === RDF + "type") t.types.push(short(q.object.value));
    else (t.props[p] ||= []).push(q.object.termType === "Literal" ? esc(q.object.value) : link(q.object.value));
    if (!modules.has(mod)) modules.set(mod, { file, terms: [] });
  }
  for (const t of subj.values()) {
    const mod = t.iri.slice(BASE.length).split("#")[0]; const m = modules.get(mod)!;
    if (!t.local) m.ontology = t; else if (!m.terms.find((x) => x.iri === t.iri)) m.terms.push(t);
  }
}

const css = `:root{--bg:#fff;--fg:#1a1a1a;--mute:#555;--line:#ddd;--warn-bg:#fff4e0;--warn-fg:#7a4a00;--link:#0b5394}
@media (prefers-color-scheme:dark){:root{--bg:#121212;--fg:#e8e8e8;--mute:#aaa;--line:#333;--warn-bg:#3a2a10;--warn-fg:#ffd59a;--link:#8ab4f8}}
body{background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;margin:0 auto;max-width:960px;padding:16px}
a{color:var(--link)}code{font-size:.92em}.warn{background:var(--warn-bg);color:var(--warn-fg);border-radius:6px;padding:12px 14px;margin:16px 0}
.term{border-top:1px solid var(--line);padding:12px 0}.term h3{margin:0 0 4px;font-size:1.05em;word-break:break-all}.meta{color:var(--mute);font-size:.9em}
dl{display:grid;grid-template-columns:max-content 1fr;gap:2px 12px;margin:6px 0 0}dt{color:var(--mute)}dd{margin:0;word-break:break-word}
:target{background:var(--warn-bg)}`;
const page = (title: string, body: string) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title><style>${css}</style></head><body>${body}</body></html>\n`;

const index: string[] = [];
for (const [mod, m] of [...modules].sort()) {
  const dir = join(OUT, mod); mkdirSync(dir, { recursive: true });
  copyFileSync(join(SRC, m.file), join(dir, m.file));
  if (m.file === "ancr.ttl") copyFileSync(join(SRC, "ancr-context.jsonld"), join(dir, "ancr-context.jsonld"));
  const o = m.ontology?.props || {};
  const title = (o[DCT + "title"] || [mod])[0];
  const terms = m.terms.sort((a, b) => a.local.localeCompare(b.local)).map((t) => {
    const rows = Object.entries(t.props).filter(([p]) => p !== RDFS + "label").map(([p, v]) => `<dt>${esc(short(p))}</dt><dd>${v.join("<br>")}</dd>`).join("");
    return `<div class="term" id="${esc(t.local)}"><h3><code>${esc(mod)}:${esc(t.local)}</code></h3><div class="meta">${esc(t.iri)} · ${esc(t.types.join(", "))}</div><dl>${rows}</dl></div>`;
  }).join("\n");
  writeFileSync(join(dir, "index.html"), page(`${title} (provisional)`,
    `<p><a href="../">ANCR vocabulary namespaces</a></p><h1>${title}</h1><div class="warn" role="note"><strong>${PROVISIONAL.split(".")[0]}.</strong>${PROVISIONAL.slice(PROVISIONAL.indexOf(".") + 1)}</div>
<p>Namespace: <code>${esc(BASE + mod)}#</code><br>Version: ${esc((o[OWL + "versionInfo"] || ["0.7"])[0])} · Staged: ${STAGED}<br>Machine-readable: <a href="${m.file}">${m.file}</a>${m.file === "ancr.ttl" ? ` · <a href="ancr-context.jsonld">ancr-context.jsonld</a>` : ""}</p>
<p>${(o[DCT + "description"] || [""])[0]}</p><h2>${m.terms.length} terms</h2>\n${terms}`));
  index.push(`<li><a href="${mod}/">${esc(title)}</a>: <code>${esc(BASE + mod)}#</code>, ${m.terms.length} terms</li>`);
}
writeFileSync(join(OUT, "index.html"), page("ANCR vocabulary namespaces (provisional)",
  `<h1>ANCR vocabulary namespaces</h1><div class="warn" role="note"><strong>${PROVISIONAL.split(".")[0]}.</strong>${PROVISIONAL.slice(PROVISIONAL.indexOf(".") + 1)}</div>
<p>The identifiers are permanent once accepted. DPV and other vocabularies link to them; they are not moved into another namespace.</p><ul>${index.join("")}</ul>`));
console.log([...modules].map(([m, x]) => `${m}: ${x.terms.length}`).join(", "));
