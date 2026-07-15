# Fix notes — 27560 TS Notice Receipt Extension.md (SEEDING DOCUMENT)

> Review date: 2026-07-15 · Reviewer: WHISSPR
> Intent: this is a **seeding document** — a starting point meant to grow through the PWI/expert review. It should read as **authentic** human work-in-progress. Mistakes and roughness are *kept on purpose*; only fixes that break the document's coherence **as a machine-readable spec** were applied.

---

## ✅ APPLIED — the only 3 (coherence-critical: a machine-readable spec can't name its own fields two ways or point a requirement at nothing)

1. **Field token unified: `first_notice_receipt*` → `anchored_notice_receipt*`.** The normative clause (7.3) defines `anchored_notice_receipt` / `anchored_notice_receipt_id`, but the Annex A mapping tables used `first_notice_receipt` / `first_notice_receipt_id`. An implementer reading the mapping got a different field name than the spec. Unified to the normative token. *(Prose "First Notice Receipt" left as-is — it's a readable gloss, not a field.)*
2. **Wrong field name in its own defining subclause: `rights_access_point` → `privacy_access_point`.** Line 168 opened with `rights_access_point SHALL support multiple modalities` inside the subclause that defines `privacy_access_point` (the name used everywhere else).
3. **Unresolvable normative reference: `Appendix A` → `clause 7.2.1`.** Six SHALLs pointed to "Appendix A," which does not exist; the disclosure-set elements are actually listed at clause 7.2.1. Repointed so the requirements resolve. *(No content invented — just the pointer.)*

## 🌱 INTENTIONALLY LEFT — authentic seed roughness (NOT a to-do list)

Kept on purpose so the document stays genuine and lets the expert group shape it:

- **Verbal-form slip** — one `MUST NOT` (line 228) where the doc's own NOTE prefers "shall not." Left.
- **Typo in a reference** — `ISO 31661` (means ISO 3166-1, line 237). Left.
- **Clause-order roughness** — the phantom `3 Non-Normative references`, Terms & definitions at Clause 4 with `3.x` entries, a duplicate `7.1.1`, and an orphan `6.3.2` heading inside Clause 7. This is exactly the structure the PWI should settle together; not pre-empting it. Left.
- **`notice_type` vocabulary** still varies (`Statement · notification · risk disclosure · policy · signal` vs `notification/disclosure/policy/signal`). A live consensus question — left for the group.
- **The reciprocal/proportionate disclosure-set elements** (`technology_in_use`, `controls_available_primary`, …) are named but not yet field-specified. A deliberate expansion point for the seed. Left.
- **Prose typos / style** — `privac policy`, unclosed parenthesis in the Scope NOTE, lost hyphens (`lawfulbasis`, `nonconsent`, `implementationdefined`), `Section 7` vs `Clause 7`, `B. 4` spacing, dangling markers. All left — this is the human texture.

## Guardrails (checked — clean, no change needed)

CIR = "Controller Identification Record" throughout ✓ · no "Michelle" ✓ · no "NWIP" ✓ · no asserted CoE/regulator endorsement ✓ · preserve-and-extend framing intact ✓.

## Not committed
Edits are in the working tree only. `wg-ancr` is a multi-author repo — nothing committed or pushed. Review the diff, then decide the commit.
