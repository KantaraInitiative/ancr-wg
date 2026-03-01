# Explainer: How we modelled Convention 108+ as a DPV legal extension (ANCR WG) — v1

## Purpose (v1)
Explain (plainly and technically) how the ANCR WG derived a Convention 108+ DPV legal model extension from the treaty text, and how it connects to ISO/IEC 27560 **‘Digital’ Consent Record Information Structure Profile** artefacts (CIR, digital notice, receipts, event logs).

## 1) What we are doing (one paragraph)
We are expressing Convention 108+ as a **machine-readable legal model** using W3C DPV patterns so that controllers, implementers, and regulators can reference a common, interoperable vocabulary for legal bases, rights, and transparency duties. The objective is **testable evidence semantics** for notice-first transparency and lawful processing in open-network digital identification contexts.

## 2) Design principles (ANCR WG)

### 2.1 International baseline first
- Convention 108+ is treated as the **baseline** for international interoperability.
- Regional regimes (e.g., GDPR) are treated as **profiles layered on top**.

### 2.2 Transparency based Digital Trust Signal (authority split)
Controller identification establishes the asserted legal authority, jurisdiction, and default policy/code-of-conduct, while the individual’s location and purpose establish the digital context in which legal basis must be evaluated.

### 2.3 Sequence integrity
Any model that claims to support “consent evidence” (when consent is the legal basis) must be compatible with:

- **Controller identification → Notice → decision → permission enforcement**

### 2.4 Governed identifier binding
Binding a `pii_principal_id` (or equivalent routable identifier) into any record is a **governed disclosure event**, not neutral metadata.

## 3) Method: how we derived the DPV model from Convention 108+

### Step A — Identify normative hooks in the treaty
We start from Convention 108+ articles that define:
- **Legal bases** (Art 5.2)
- **Principles** (Art 5.4, Art 7)
- **Rights** (Art 9)
- **Transparency duties** (Art 8)
- **Transfers** (Art 14)
- **Implementation mechanisms** (Art 11 codes of conduct)

### Step B — Map each hook to a DPV category
We then map each treaty hook to the closest DPV class:
- Legal basis → `dpv:LegalBasis`
- Rights → `dpv:DataSubjectRight`
- Principles → `dpv:Principle`
- Notices / obligations → `dpv:Notice` (where suitable) or `dpv:Principle`
- Organisational / technical measures → `dpv:OrganisationalMeasure` / `dpv:TechnicalMeasure`

### Step C — Create stable identifiers (URIs) with traceability
We mint identifiers that are:
- **Traceable** to the source article (e.g., `A5-2-a`)
- **Stable** for implementers
- **Composable** with DPV patterns

Example pattern:
- `conv108:A5-2-a` (Consent)
- `conv108:A8-2-controller-identification` (Controller-ID before processing)

### Step D — Add the “evidence semantics” layer (ANCR add-on)
Treaty text alone does not enforce implementation sequencing. Therefore the ANCR WG adds explicit implementation semantics:
- notice-first timing
- receipt availability
- notice version binding
- recipient transparency

These are expressed as **conformance tests** (Section 5 below) so they can be used as acceptance criteria in DPV guidance and issues.

## 4) Integration with ISO/IEC 27560 ‘Digital’ Consent Record Information Structure Profile (why the legal model matters)
The DPV legal model becomes operational when bound to evidence-grade artefacts from the ISO/IEC 27560 ‘Digital’ Consent Record Information Structure Profile: (Submitted as 27560-1 UNR Profile)
- **CIR / notice surface** (controller identification + declared legal basis + default policy or code of conduct)
- **Signed notice-first artefacts** (integrity without forcing identification)
- **Bilateral receipts** (durable proof the individual can retain)
- **Event logs** (append-only state changes that are auditable and contestable)

## 5) Minimal conformance tests (v1)
Use these as acceptance criteria for any DPV guidance claiming to support consent evidence in open-network contexts.
- **Test 1 (Timing):** Controller identification + notice before identify/collect/use/transfer.
- **Test 2 (Notice binding):** Evidence binds to a specific notice version.
- **Test 3 (Receipt availability):** Individual can obtain and retain a durable receipt.
- **Test 4 (Recipient transparency):** Recipients/transfers explicit at time of interaction.
- **Test 5 (Identifier binding permission):** Explicit permission linked to authorising notice terms.

## 6) DPV instructions / guidance we followed (with references)
The DPV family is designed to be **globally useful and extensible**, including extensions for jurisdictions and domains.
- https://www.w3.org/community/dpvcg/2022/12/05/dpv-v1-release/

### 6.1 How DPV expects extensions to be structured
- DPV Primer: https://w3id.org/dpv/primer
- DPV Guides: https://w3id.org/dpv/guides
- DPV LEGAL extension: https://w3id.org/dpv/legal

### 6.2 Where to look for modelling patterns we mirrored
- Legal Basis module: https://w3c.github.io/dpv/2.0/dpv/modules/legal_basis.html  
  (Note: includes consent semantics beyond only “given consent”.)
- Rights guide: https://w3c.github.io/dpv/guides/rights
- Examples index: https://w3id.org/dpv/examples

### 6.3 Practical implication for the Convention 108+ extension
- We treat the Convention 108+ legal model as a **LEGAL extension** candidate, using the DPV pattern: stable namespace + prefixed identifiers + alignment to DPV classes.
- Where DPV guidance is not yet explicit (e.g., treaty-as-baseline positioning), we propose the minimal conformance tests as “guide-level acceptance criteria” for implementers, consistent with DPV’s use of guides to drive adoption.

## 7) Action list — complete
- Add DPV/DPVCG “how to create an extension / legal model” references (links + quotations as needed). **Done** (Section 6).
- Align URI minting pattern with DPV maintainers’ preferred naming conventions. **Done** (Step C examples).
- Decide whether this extension lives under an existing DPV legal module structure or a new CoE-specific module. **Done** (treated as DPV LEGAL extension candidate).
- Convert the conformance tests into three closeable DPV issues (scope, sequencing, definitions/tests). **Done** (captured as an issue split in the closeable issue set).