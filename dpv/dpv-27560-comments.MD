# ANCR-DPV Comments

## Purpose
Comment table for DPV-27560 guidance and related DPV schema guidance.

## How to use
- Add/adjust wording directly using suggested text or comments.
- Add missing citations in Evidence / authority.

## DPV-PD validation notes (ANCR)
Key validation: DPV-PD improves notice content precision (what data), but does not address evidence-grade requirements such as timing, notice binding, recipient transparency, or identifier governance. Those must be handled in DPV:27560 guidance and minimal conformance tests.

## ISO/IEC 27560 remediation pathway (linked concept)
This comment set has an explicit remediation pathway: **ISO/IEC 27560 ‘Digital’ Consent Record Information Structure Profile** (ANCR Digital Consent pattern).

## DPV 2.3 (comments approved for submission)
Comment 1 = C1

### C1 — Identifier governance (Data Subject / principal identifier)
**DPV artefact(s):** DPV-27560 guide (Consent-27560), DPV-27560 schema profiles  
**Source hook:** DPV-27560: “Data Subject field MUST be present” and maps “pii principal id” as mandatory via `dpv:hasDataSubject`.  
**Comment-ready text (ANCR ask):**  
DPV-27560 guidance currently normalises Data Subject identification as mandatory in the record header/metadata. In open-network digital identification contexts, binding a stable principal identifier is a governed disclosure event that creates linkability and cross-context correlation risk. Update DPV-27560 guidance to support an anonymous-by-default Stage 1 notice/receipt pattern, and treat any principal identifier binding as explicitly permitted and context-bounded after Controller identification and notice are inspectable.  
**DPV 2.3 crosswalk note:** DPV 2.3 does not appear to introduce evidence-grade identifier governance semantics. No fix expected from taxonomy changes; this remains a guidance requirement.

### C2 — Sequence integrity (timing must be testable)
**DPV artefact(s):** DPV-27560 guide; DPV core Processing module terms used as anchors (`dpv:Collect`, `dpv:Use`, `dpv:Transfer`)  
**Source hook:** DPV-27560 scope: “how a notice is provided (beyond a link)… and matching the contents of a notice to that of a consent record is outside scope”; and “security, communication, and maintenance… outside scope”.  
**Comment-ready text (ANCR ask):**  
DPV-27560 guidance must explicitly prevent “record-first, notice-later” implementations being represented as valid consent evidence. Add normative guidance (and an anti-pattern section) requiring the testable sequence: Controller-ID → Notice → authorization decision (when consent is legal basis) → permission enforcement, and make timing assessable relative to processing operations such as `dpv:Collect`, `dpv:Use`, and `dpv:Transfer`.  
**DPV 2.3 crosswalk note:** Drift risk: DPV 2.3 purpose taxonomy changes (e.g., `ServiceProvision` narrowing) can alter example interpretation. Ensure any DPV-27560 examples cited for sequencing do not depend on pre-2.3 purpose semantics.

### C3 — Recipient transparency + role governance
**DPV artefact(s):** DPV-27560 guide (Recipients modelling); DPV core Entities/Recipients concepts  
**Source hook:** DPV-27560 models recipients (`dpv:hasRecipient`) but places security/communication out of scope; recipients can still be under-specified at interaction-time.  
**Comment-ready text (ANCR ask):**  
DPV-27560 guidance should require that recipients/third parties are explicit at the time of interaction and execution, and represented with accountable roles aligned to ISO/IEC 29100. Avoid implicit or unnamed recipient patterns that allow invisible third parties to be normalised by default. Where transfers occur, require explicit linkage to the notice terms that authorised the transfer.  
**DPV 2.3 crosswalk note:** DPV 2.3 does not (so far) introduce interaction-time governance semantics; expect only maintenance impacts, not requirement closure.

### C5 — Notice versioning + evidence binding
**DPV artefact(s):** DPV-27560 guide (Notice fields); DPV core `dpv:Notice` / `dpv:ConsentNotice` concepts  
**Source hook:** DPV-27560 shows notice references with `dpv:hasNotice` and includes example metadata (`dct:date`, `dct:coverage`) but also scopes out “how notice is provided” and “matching notice contents to the record”.  
**Comment-ready text (ANCR ask):**  
DPV-27560 already supports referencing a notice instance and associated timestamps, but it does not ensure evidence-grade binding between the notice presented and the authorization event. Update guidance to require/encourage version-bound notice references (issuance/modification timestamps) and binding between notice version and authorization evidence so post-hoc rewriting is detectably non-conformant.  
**DPV 2.3 crosswalk note:** DPV 2.3 does not appear to add new core semantics that solve evidence binding. This remains a guide-level gap.

### C8 — International baseline
**DPV artefact(s):** DPV-27560 guide legal framing; DPV LEGAL extensions  
**Source hook:** DPV-27560 positions GDPR as primary legal reference (GDPR-specific profiles such as `record-eu-gdpr`, `receipt-eu-gdpr`).  
**Comment-ready text (ANCR ask):**  
DPV-27560 guidance must treat Convention 108+ as the baseline legal model for international interoperability and digital consent governance, and treat GDPR as a regional profile/extension. This prevents GDPR-default semantics being applied as universal, which undermines cross-border interoperability and evidence expectations.  
**DPV 2.3 crosswalk note:** DPV 2.3 taxonomy changes do not address the baseline-instrument problem; this remains a framing/guidance correction.

### C17 — Receipt vs record semantics
**DPV artefact(s):** DPV-27560 guide (receipt profiles + definitions)  
**Source hook:** DPV-27560 defines receipts as an “authoritative copy of the consent record” and provides `receipt-record` profile as “Consent Receipts … providing a copy of the consent record”.  
**Comment-ready text (ANCR ask):**  
DPV-27560 currently reinforces “receipt = copy of record,” which can normalize controller-authored, post-hoc recordkeeping exports as if they were consent evidence in open-network identification contexts. Update guidance to align terminology with authority: artefact labels must match who authors the artefact, who holds it, and what it evidences. Add an explicit anti-pattern: “privacy receipt” or receipt export must not be used to imply notice-first consent evidence when identifiers/processing occurred before notice was inspectable.  
**DPV 2.3 crosswalk note:** DPV 2.3 does not inherently resolve this semantic inversion; it is a guidance/definition change.

## Quick finding (DPV artefacts vs ANCR requirements)
- DPV core + extensions: strong for vocabularies (purposes, processing, entities, etc.), but do not satisfy evidence-first requirements (timing, binding, durable receipt availability) without guide-level constraints.
- Therefore, the “meeting our requirements” work is primarily a DPV:27560 guidance issue, with DPV 2.3 deltas mainly creating maintenance risk (term drift) rather than solving the evidence gaps.

## (Additional working material)
The remainder of the original [ANCR-DPV comments page]( includes:
- a longer working comment table,
- authority/evidence tables,
- and an impact register for failure modes and acceptance criteria.
This repo snapshot focuses on the DPV 2.3 submission-ready blockers and the core evidence-first requirements.
