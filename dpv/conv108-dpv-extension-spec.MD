# Convention 108+ DPV Extension Specification (ANCR WG Contribution) — v1

## Status block
**Status:** ANCR WG contribution draft  
**Version:** v1.1 (terminology alignment update)  
**Date:** 2026-02-22  
**Editor:** Mark Lizar, Digital Transparency Lab  

**Scope note (important):** This document describes a *Convention 108+ legal-model extension for DPV* and its integration points with the **‘Digital’ Consent Record Information Structure Profile** (normative reference: ISO/IEC 27560). It is not to be used as a DPV:27560 implementation guide, as these are not compatible.

## Abstract
The Convention 108+ extension (`conv108`) extends the W3C Data Privacy Vocabulary (DPV) with concepts for the Council of Europe’s Convention 108+ (Treaty 223). The goal is to enable **machine-readable** representation of Convention 108+ legal bases, rights, principles, and transparency requirements, and to support semantic interoperability between:
- **Convention 108+** as the international baseline instrument
- **ISO/IEC 27560** ‘Digital’ Consent Record Information Structure Profile for notice-first, evidence-grade transparency artefacts
- **DPV** and adjacent cataloguing (e.g., DPCat) for interoperability and downstream reuse

### Namespace and prefix
- **Namespace:** `https://w3id.org/dpv/legal/coe/convention108plus#`
- **Prefix:** `conv108`

### Normative references
- Convention 108+ (CoE Treaty 223)
- W3C DPV core
- ISO/IEC 27560 (‘Digital’ Consent Record Information Structure Profile)

### Informative references (non-normative)
- EU Regulation 2018/1725

## 1. Introduction
Convention 108+ is a ratifiable international treaty (55+ jurisdictions) that provides a universal baseline for data protection and transparency requirements. Unlike GDPR (a regional EU/EEA regulation), Convention 108+ can serve as the normative legal spine for international exchange profiles and cross-jurisdiction enforcement coordination.

### 1.1 Key distinctions from GDPR (for scope discipline)
- **Scope:** International treaty vs regional regulation.
- **Transparency timing:** Convention 108+ includes a clear controller identification + transparency duty in Art 8 that supports *notice-first* architectures.
- **Implementation posture:** Article 11 enables codes of conduct and technical mechanisms as implementation vehicles.
- (Non-normative note): International implementations often depend on ordering and scope constraints between legal bases and any enacted derogations of rights. This document does not introduce new interpretations of Convention 108+.

### 1.2 Trustparency Signal (0PN / ANCR alignment)
Controller identification establishes the asserted legal authority, jurisdiction, and default policy/code-of-conduct, while the individual’s location and purpose establish the digital context in which legal basis must be evaluated.

**ANCR requirement proposal (non-normative):** DPV concepts and guidance should support *testable sequence integrity* (controller identification and notice before identification/collection) and should treat identifier binding (including any `pii_principal_id`) as a governed disclosure event.

### 1.3 Integration points
- **‘Digital’ Consent Record Information Structure Profile (ISO/IEC 27560):** Controller Identification Record (CIR), digital notice artefacts, receipt availability, notice event log access (public / PII principal), legal basis codes.
- **DPV:** compatibility with other legal extensions and processing representations.
- **Catalogues (e.g., DPCat):** public discoverability of controller and processing assertions.

## 2. Legal Bases

### 2.1 Core Legal Bases (Convention 108+ Article 5.2)
Convention 108+ Article 5.2 defines six legal bases for processing personal data.

#### A5-2-a: Consent
- **URI:** `conv108:A5-2-a`
- **Type:** `dpv:LegalBasis`
- **Label:** Consent
- **Definition:** Legal basis where the individual has freely given specific, informed consent to the processing of personal data for specified purposes.
- **Source:** Convention 108+ Article 5.2.a
- **ISO/IEC 27560-1 code:** `consent`

Variants (illustrative):
- `conv108:A5-2-a-explicit`
- `conv108:A5-2-a-informed`
- `conv108:A5-2-a-specific`

#### A5-2-b: Contract
- **URI:** `conv108:A5-2-b`
- **Type:** `dpv:LegalBasis`
- **Label:** Contract
- **Definition:** Processing necessary for performance of a contract or pre-contractual steps at the individual’s request.
- **Source:** Convention 108+ Article 5.2.b
- **ISO/IEC 27560-1 code:** `contract`

#### A5-2-c: Legal Obligation
- **URI:** `conv108:A5-2-c`
- **Type:** `dpv:LegalBasis`
- **Label:** Legal obligation
- **Definition:** Processing required by law to which the controller is subject.
- **Source:** Convention 108+ Article 5.2.c
- **ISO/IEC 27560-1 code:** `legal_obligation`

#### A5-2-d: Legitimate Interest
- **URI:** `conv108:A5-2-d`
- **Type:** `dpv:LegalBasis`
- **Label:** Legitimate interest
- **Definition:** Processing necessary for legitimate interests pursued by controller or third party, not overridden by individual’s rights.
- **Source:** Convention 108+ Article 5.2.d
- **ISO/IEC 27560-1 code:** `legitimate_interest`

#### A5-2-e: Vital Interest
- **URI:** `conv108:A5-2-e`
- **Type:** `dpv:LegalBasis`
- **Label:** Vital interest
- **Definition:** Processing necessary to protect vital interests of the individual or another person.
- **Source:** Convention 108+ Article 5.2.e
- **ISO/IEC 27560-1 code:** `vital_interest`

#### A5-2-f: Public Interest
- **URI:** `conv108:A5-2-f`
- **Type:** `dpv:LegalBasis`
- **Label:** Public interest
- **Definition:** Processing necessary for a task carried out in the public interest or in exercise of official authority.
- **Source:** Convention 108+ Article 5.2.f
- **ISO/IEC 27560-1 code:** `public_interest`

### 2.2 Special category legal bases (Article 6.2)
(Outline retained from v0.1; expand as needed)
- A6-2-a … A6-2-j

### 2.3 Data transfer legal bases (Article 14)
#### Transfer with adequate safeguards
- **URI:** `conv108:A14-adequate-safeguards`
- **Type:** `dpv:DataTransferLegalBasis`
- **Label:** Transfer with adequate safeguards
- **Source:** Convention 108+ Article 14

## 3. Principles
(From v0.1; retained)
- `conv108:ProportionalityPrinciple` (Art 5.4.a)
- `conv108:PurposeLimitationPrinciple` (Art 5.4.b)
- `conv108:DataQualityPrinciple` (Art 5.4.c, 5.4.d)
- `conv108:RetentionPrinciple` (Art 5.4.e)
- `conv108:SecurityPrinciple` (Art 7)

## 4. Rights
(From v0.1; retained)
- `conv108:A9-1-a` Right to information
- `conv108:A9-1-b` Right of access
- `conv108:A9-1-c` Right to rectification
- `conv108:A9-1-d` Right to erasure
- `conv108:A9-1-e` Right to restriction
- `conv108:A9-1-f` Right to object
- `conv108:A9-1-g` Right to portability
- `conv108:A9-2` Right to withdraw consent

## 5. Transparency requirements (Article 8) — with sequence integrity emphasis

### 5.1 Article 8.1 Transparency obligation
- **URI:** `conv108:A8-transparency`
- **Type:** `dpv:Principle`

### 5.2 Article 8.2 Controller identification before processing
- **URI:** `conv108:A8-2-controller-identification`
- **Type:** `dpv:Principle`
- **Definition (tightened):** requirement that controller identity (and the associated transparency terms needed to evaluate processing) be disclosed before personal data processing begins.

### 5.3 Controller identification disclosure record (ANCR-aligned)
- **URI:** `conv108:ControllerIdentificationRecord`
- **Type:** `dpv:Record`

**ANCR WG note (informative):** A Stage 1 notice-first artefact may be **signed** by the controller for integrity/non-repudiation **without** including any `pii_principal_id`.  
(Implementation patterns for publishing a controller identification disclosure, such as `/.well-known/notice.txt`, are documented in Appendix A so they are not confused with treaty modelling.)

## 6. Technical transparency mechanisms (Article 11)
(From v0.1; retained)
- `conv108:TechnicalTransparencyStandard`
- `conv108:NoticeReceiptMechanism`
- `conv108:NoticeEventLog`

## 7. Derivative digital transparency controls
(From v0.1; retained, with framing)
These controls operationalize Convention 108+ transparency and security duties through ISO/IEC 27560-1 patterns.

## 8. ISO/IEC 27560 integration (mappings)
(Informative appendix content; retained from v0.1)

## Appendix A — Implementation patterns (informative)
- Example publication location for controller identification disclosure: `/.well-known/notice.txt`
- Profile framing: ISO/IEC 27560 ‘Digital’ Consent Record Information Structure Profile

## 9. Minimal conformance tests (v1) — for guidance that claims to support consent evidence
These tests are provided so implementers and reviewers can distinguish **notice-first evidence** from post-hoc record keeping in data protection requirements that are not modernised:
- **Test 1 (Timing):** Evidence shows controller identification + notice occurred before any identify/collect/use/transfer.
- **Test 2 (Notice binding):** Evidence binds to a specific notice version.
- **Test 3 (Receipt availability):** Individual can obtain and retain a durable receipt.
- **Test 4 (Recipient transparency):** Recipients/transfers explicit at time of interaction.
- **Test 5 (Identifier binding permission):** If an identifier is bound into a record, explicit permission is linked to the authorising notice terms.

## 10. Change log
- **v1.2 (2026-02-28):** Applied DPVCG review readiness edits: separated normative vs informative references; labelled ANCR requirement proposals as non-normative; moved implementation patterns to an appendix; retained the **‘Digital’ Consent Record Information Structure Profile** naming (normative reference: ISO/IEC 27560).
- **v1.1 (2026-02-28):** Terminology alignment: replaced MVCR v2 / UNR framing with the **‘Digital’ Consent Record Information Structure Profile** (normative reference: ISO/IEC 27560) to reduce DPVCG ambiguity; updated scope + integration language.
- **v1 (2026-02-22):** Reframed as ANCR WG contribution; added Trustparency Signal; emphasized sequence integrity and governed identifier binding; added minimal conformance tests; tightened scope note.
- **v0.1 (2025-12-29):** Initial working draft.

Notes:
- The CIR refers generically to Controller Identification Record and standard information schema, that is represented in 27560.
- Technically its utility is defined as a PII Controller notice identification record (for digital-id transparency) it is the corresponding digital-notice-id that can be used for digital consent (as a secondary purpose) to digitally manage consent.