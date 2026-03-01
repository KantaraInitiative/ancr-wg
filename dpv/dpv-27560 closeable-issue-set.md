# ANCR WG → DPV:27560 Comments (v2) — Closeable issue set (v0.2)

> **DRAFT (v0.2)**
>
> This page converts the minimal conformance tests into a **closeable DPV issue set** (TPI: scope, sequencing, definition indicator tests).
>
> **v0.2 intent:** This is a collaboration-oriented issue set that centres Convention 108+ as the legal instrument (or spine for legal digital interoperability) and makes sequence integrity testable.

---

## Issue 1 (Scope) — Scope/authority disclaimer

### Problem
DPV-27560 guidance can be misread as the international instrument for open-network digital consent governance. The definition and context of the Consent Receipt is different and is intended as an artefact that demarcates this boundary between a notice record and evidenced awareness of what the notice means.

### Proposed text change (DPV-27560 guidance)
Add a short scope and authority disclaimer that states what the guidance is for, and what it does not claim.  
Clarify that the Consent Receipt context and evidence semantics differ from controller-authored post-hoc records.

### Acceptance criteria
- Includes a one-paragraph scope statement.
- States what DPV-27560 guidance does not claim (no claim to prove consent validity or “awareness by default” without timing evidence).
- States Convention 108+ baseline orientation for international framing.

### Non-goals
This issue does not redefine DPV vocabulary scope, and does not introduce new legal instruments.

---

## Issue 2 (Sequencing) — Sequence integrity + notice binding

### Problem
Receipt-after-identification patterns allow post-hoc records (privacy receipts) to be treated as consent evidence in open-network digital identification contexts.

### Proposed text change (DPV-27560 guidance)
Add a normative, testable sequence and an explicit anti-pattern section.

### Acceptance criteria
- Normative sequence: Controller identification, then notice, then decision (if consent is legal basis), then permission enforcement.
- Explicit anti-pattern section.
- Evidence binds to a specific notice version.

### Non-goals
This issue does not mandate a specific transport, protocol, or cryptographic scheme.

---

## Issue 3 (Definitions/Tests) — Receipt vs record semantics + minimal conformance tests

### Problem
Receipt vs record semantics are currently ambiguous. This creates category errors, weakens testability, and introduces harmful risks that can be addressed.

### Proposed text change (DPV-27560 guidance)
Add definitions and a copy/paste set of minimal conformance tests suitable for guidance text and issue closure.

### Acceptance criteria
- Definitions clarify who authors/holds each artefact and what it evidences.
- Minimal conformance tests included (timing, notice binding, receipt availability, recipient transparency, identifier binding permission).
- Identifier binding treated as governed disclosure event.

### Non-goals
This issue does not expand the DPV:27560 model to cover all notice/receipt lifecycle events.

---

## Canonical scope of authority boundary (reference)

ISO/IEC TS 27560 is valuable and safe for relationship-based controller recordkeeping. This includes physical-to-digital contexts such as health consent.

It is not sufficient as the international digital consent governance instrument for open-network digital identification.

For international interoperability, ANCR uses an ISO/IEC 27560 **‘Digital’ Consent Record Information Structure Profile** exchange pattern and a Controller Identification Record (CIR). This is historically referred to as “UNR / MVCR v2”. ANCR also uses an anchored notice/receipt exchange, with testable sequence-integrity conformance criteria.
