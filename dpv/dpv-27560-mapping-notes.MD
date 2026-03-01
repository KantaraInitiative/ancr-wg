# DPV:27560 Mapping Notes — How an ISO/IEC 27560-aligned profile addresses evidence-first gaps (ANCR WG)

## Purpose
Map the technical critique items to how the ANCR Digital Consent pattern (aligned to ISO/IEC 27560 **‘Digital’ Consent Record Information Structure Profile**) addresses them, and where it provides clearer separation of layers and international interoperability.

> ⚠️ **Scope discipline (DPVCG-ready):** This page is an *informative mapping note* that explains how ANCR’s evidence-first requirements can be satisfied by an ISO/IEC 27560-aligned profile approach. It is not a proposal to reinterpret DPV or Convention 108+. It does not propose new DPV vocabulary.

---

## A) Notice is baseline across all legal bases

**Critique item:** DPV-27560 guide frames notice primarily as an input to “informed consent.”

**ANCR / ISO/IEC 27560-aligned response:**
- ANCR treats **machine-readable notice** as the baseline disclosure layer for any processing context.
- The legal basis can vary, but notice remains a precondition for inspectable governance.
- This supports treaty-aligned interoperability (Convention 108+ style notice requirement) without collapsing into a regional consent-only model.

---

## B) Separate artefacts: notice vs record vs receipt vs token

**Critique item:** Consent record/receipt boundary confusion; receipts framed as controller output copy.

**ANCR / ISO/IEC 27560-aligned response:**
- Treats artefacts as distinct evidence objects and keeps their authority clear:

  - **Controller Identification Record (CIR)** disclosure
  - **Digital notice** / policy disclosure (machine-readable)
  - **Notice receipt** (bilateral evidence)
  - **Notice event logs** (append-only state changes)
  - **Notice tokens** (portable evidence of meaningful choice)

- This separation prevents permission/workflow logs from being mislabeled as consent evidence.

---

## C) Consent vs permission separation

**Critique item:** DPV-27560 conflates human authority consent with technical permission.

**ANCR / ISO/IEC 27560-aligned response:**
- Human decision (consent if consent is the legal basis) remains distinct from system permission enforcement.
- Evidence artefacts capture meaningful choice after disclosure, while permissions are operational controls executed post-authorization.

---

## D) International baseline for cross-border governance (Convention 108+ alignment)

**Critique item:** GDPR-centric default framing.

**ANCR / ISO/IEC 27560-aligned response:**
- Treats Convention 108+ style notice and lawful-processing requirements as the international baseline legal spine.
- Supports multi-jurisdiction portability by design.

---

## E) Digital identification + invisible third parties

**Critique item:** Physical-world consent assumptions imported into digital identification contexts.

**ANCR / ISO/IEC 27560-aligned response:**
- Enforces a transparency-by-default sequence:
  1. controller disclosure
  2. notice disclosure
  3. authorization decision (if consent is used)
  4. permission enforcement

- This addresses invisible third-party and identifier risk by requiring disclosure prior to collection/processing.

---

## F) Consent modalities and governance contexts

**Critique item:** Under-specified consent modalities.

**ANCR / ISO/IEC 27560-aligned response:**
- Uses a legal-basis-agnostic core.
- Where consent is the legal basis, modality and evidentiary conditions can be represented explicitly (including via event-log states) without collapsing into generic “consent management.”

---

## Open mapping tasks (to refine)
- Identify the exact clauses/fields in the current ISO/IEC 27560-aligned profile draft that correspond to:
  - notice-first requirements
  - bilateral receipt semantics
  - modality representation
  - event-log and token bindings
- Produce a table mapping:  
  *DPV critique item → ISO/IEC 27560-aligned profile clause/field → implementation guidance note*