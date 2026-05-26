# Notice Receipt Extension for  ISO/IEC TS 27560:2023

Kantara Initiative / ANCR Working Group submission draft (May 24 2026)

## Foreword

This document specifies a notice receipt information structure that profiles and extends ISO/IEC TS 27560:2023 (consent record information structure). It is published by the Kantara Initiative and the Anchored Notice and Consent Receipt (ANCR) Working Group as a companion specification, and is intended to be cited as prior art and an implementation reference for SC 27/WG 5 work that depends on machine-readable notice and consent records (notably ISO/IEC FDIS 27091 Annex B.4, ISO/IEC WD TS 27568 Table 2, ISO/IEC WD 27573, and ISO/IEC WD 27566-2 Annex F, ISO/IEC 27091 Annex B ).

## Scope Clarification

This profile extends ISO/IEC TS 27560:2023 (consent record information structure) to specify a machine readable online notice record and a corresponding notice receipt that provides durable evidence of notice disclosure.
It supports layered and sequenced notices, notifications, and disclosures. First Notice Receipt requirements are legal basis agnostic. When the lawful basis is consent, a corresponding authorization can be represented as a TS 27560:2023 consent receipt specialisation.
This profile further requires that transparency disclosures be **reciprocal and proportionate** to the technologies in use and the rights controls that are available to the individual (including associated or derivative rights controls).
Interaction with an online notice record results in a notice receipt, which may be either:

- a full receipt (contains required record fields), or
- a reference receipt (minimal fields plus stable references and rights payload).

## Lawful basis interoperability

(normative editorial rule)

This profile is lawful-basis interoperable: the First Notice Receipt structure SHALL support all lawful bases under applicable law. Each lawful basis has distinct rights, obligations, and dispute triggers.
Implementations SHALL communicate the asserted lawful basis in the receipt header, and SHALL publish the applicable rights/obligations variant using the Annex C table structure.
Consent-by-default for two-factor notice: Where an interaction is presented as a two-factor online notice that returns a bilateral receipt (2FN), the default interpretation SHALL be consent unless another lawful basis is explicitly asserted in the receipt header.
If a lawful basis other than consent is asserted, the receipt header SHALL state that lawful basis explicitly (e.g., contract, legal obligation, legitimate interest, vital interest, public interest) and SHALL reference the corresponding Annex C row (rights/obligations variant).
Receipts are designed to be detectable and reusable to reduce repetitive notice prompts and repetitive consent prompts, in order to mitigate ‘consent fatigue’ dark patterns associated with prompt fatigue. The profile is designed to complement existing physical signs and privacy policy pages by providing a standardized notice record that can be extended by context and external codes of conduct to support transparency by default codes of practice. (AI Governance Capable)

By standardizing notice version references and receipt exchange, the profile supports cross border transparency and dispute resolution, including material change signalling through the notice event log.

### Reciprocal and proportionate transparency for technology and rights controls (normative editorial rule)

Where a notice version is used to justify or enable a technology-mediated processing capability, the Notice Record (and/or a referenced transparency statement) SHALL disclose, in a proportionate and reciprocal manner:

- the technology class(es) in use (for example: tracking, profiling, automated decision, biometric inference, cross-device linkage, data brokerage, disclosure/transfer mechanisms);
- what rights controls are practically available (for example: access, rectification, erasure, portability, objection/withdrawal, restriction, appeal/complaint, human review);
- any associated or derivative rights controls that arise due to technology choices (for example: “opt-out of targeted advertising” controls, signal-based controls, browser/device signals, global privacy controls, do-not-sell/share controls);
- any material limitations or derogations that constrain those controls, including where a control is unavailable in a given context (and why).

Disclosures SHALL be proportional to the risk surface and SHALL be written so that relying parties can determine whether a control exists, how it can be exercised, and what scope it applies to.

## Historical Context:

This completes the minimum viable notice and consent receipt work, with thanks to the long term support of the Kantara Initiative and community. In particular, the CIS and ANCR working groups that contributed this work in support of the ISO/IEC 29100 security and privacy framework and ISO/IEC 29184 online privacy notice and consent standard, and now ISO/IEC 27560:2023 TS, open and free to access at [ISO.org](https://www.iso.org/standard/80392.html)

## Introduction

Governing digital identity for privacy requires identifiers to be bound to an artefact that can be referenced after the fact. Historically, such identifiers have been encapsulated in a record and provided in receipt of a notice-based event by context at a time and place, similar to a transaction receipt. The receipt acts as a container not only for identifiers, but for the integrity of what those identifiers represent and link to as real world objects.
A notice receipt is generated through interaction (or a lack of interaction) with a physical sign, access point, a device or an online notice. A notice receipt can be generated independently by an individual, from the notice by creating or accessing a controller identification record to produce a proof of notice disclosure that can be exchanged between devices and across borders.

Dependency Chain:
Code of Conduct (Authoritative policy)
↓
ISO/IEC 27560-1 Notice + Consent Record information structure

↓
code of practice(controls)/privacy policy/legislative/common law
↓
ISO/IEC 29100 Security & Privacy framework

## 1 Scope

This profile extends ISO/IEC TS 27560:2023 to specify a machine-readable online Notice Record and corresponding Notice Receipt that provide durable evidence of notice disclosure.
The base extension defines a minimum interoperable set of artefacts:

- Controller Identification Record (CIR)
- Notice Record / First Notice Receipt
- Notice Event Log
- Reference integrity and version binding (including notice_id, notice_version_reference)

Note: An online notice, Notifications, disclosure, or statement sequences differ according to

1. in person peer to peer using a device (notice and identity are physically verifiable
2. remote (not in person), identification is not physically verifiable. Controller identification is required.
Out of scope for the base extension (may be handled by optional appendices or companion specs):
- authorization exchange protocol mechanics beyond the First Notice Receipt
- tokens/credentials and wallet portability mechanisms
- full RoPA / processing-record completeness requirements
- cross-border security requirements beyond baseline notice disclosure
- AI lifecycle governance requirements beyond baseline notice disclosure

## 2 Normative references

- ISO/IEC TS 27560:2023 Privacy technologies — Consent record information structure
- ISO/IEC 29100, Privacy framework

## Verbal forms

The key words SHALL, SHOULD, and MAY in this document are to be interpreted as described in ISO/IEC Directives, Part 2.
NOTE: This draft avoids the use of “must” as a normative keyword. Where “must” appears in examples or explanatory text, it is not intended to introduce a normative requirement.

## 3 Additional references

- ISO/IEC 29184, Online privacy notices and consent
    - Note:  free and open  access pending

## 4 Terms and definitions

Terms and definitions from ISO/IEC TS 27560:2023 and ISO/IEC 29100 apply.
3.1 Controller Identification Record (CIR): publicly accessible controller accountability record used as an anchor for notice and receipt generation.
3.2 Notice Record: controller-maintained record of notice content (versioned).
3.3 First Notice Receipt: bilateral evidence artefact recording that a specific notice version was disclosed/presented.
3.4 Notice Event Log: append-only record of lifecycle events related to notices/receipts (issuance, material change, withdrawal/objection hooks).
3.5 notice_version_reference: immutable reference to the notice version in effect at the time of disclosure.
3.6 transparency statement: versioned transparency disclosure artefact that expresses the standing terms of notice (controller identification, processing context, rights mechanisms) and is suitable for audit and stable referencing.
3.7 transparency notification: event-bound message signaling that a transparency-relevant event has occurred (for example issuance, material change, rights-related lifecycle event), typically referencing a specific transparency statement version.
3.8 reciprocal and proportionate transparency: disclosure property in which the technology-mediated processing capabilities and the practical rights controls available to the individual are stated in a manner that is proportionate to the risk surface and reciprocal to the controller’s technical capability (i.e., what the technology can do is matched by what the individual can see and control).

## 5 Conformance

An implementation conforms to the Base extension if it satisfies all mandatory requirements in Section 7. Implementations MAY additionally claim conformance to optional extensions defined in Annex B.

## 6 Overview of notice artefacts and reference integrity

### 6.1 Notice Receipt Artefact set

1. CIR (controller accountability anchor)
2. Notice Record (versioned notice content)
3. First Notice Receipt (evidence)
4. Notice Event Log (lifecycle)

### 6.2 Reference integrity and version binding

A First Notice Receipt SHALL reference:

- notice_id (stable family identifier)
- notice_version_reference (immutable version reference)

A material change to a notice (purposes, lawful basis, recipients/jurisdictions, retention, rights mechanisms) SHALL:

- create a new notice version, and
- create a corresponding Notice Event Log entry.

Historic notice versions SHALL be retained as long as any processing or records depend on them (ongoing reference discipline).

## 7 Notice record specifications

### 6.1 Controller Identification Record (CIR)

### 6.1.1 CIR minimum field set

A CIR SHALL include at minimum:

- controller_public_id_uri
- controller_name
- jurisdiction
- privacy_access_point (structured)

A CIR SHOULD include:

- controller_address
- code_of_conduct_reference (if applicable)

A CIR MAY include:

- derogation_reference (lawful withholding)

### 6.1.1A CIR field specification table (normative)

| Field | Description | Required? | Value type / format | Constraints | Exposure |
| --- | --- | --- | --- | --- | --- |
| controller_identity_record_id | Stable identifier for the CIR | Yes | URI or string identifier | SHALL be stable; SHALL be suitable for referencing by receipts and event logs | Public |
| controller_public_id_uri | Public resolvable controller identifier | Yes | URI | SHALL be resolvable or dereferenceable by intended relying parties | Public |
| controller_name | Controller legal name | Yes | String | SHALL represent the accountable controller entity | Public |
| jurisdiction | Applicable jurisdiction indicator or pointer | Yes | Code or string | SHALL be present; MAY be a pointer to a code of conduct reference | Public |
| privacy_access_point | Rights/contact access modalities | Yes | Array of objects | Each entry SHALL include type, value, label | Public |
| notice_event_log_url | Pointer to the notice event log service or resource | No | URL/URI | When present, SHOULD be publicly discoverable | Public |
| controller_address | Controller address (optional) | No | String or structured address | - | Public |
| code_of_conduct_reference | Pointer to authoritative code of conduct / practice | No | URI | When present, SHOULD be versioned | Public |

| Field | Description | Required? | Value type / format | Constraints | Exposure |
| --- | --- | --- | --- | --- | --- |
| derogation_reference | Lawful withholding / derogation metadata (optional) | No | Object | When present, SHOULD include reference_uri, authority, valid_until | Public or restricted |

### 6.1.2 privacy_access_point

rights_access_point SHALL support multiple modalities.
Each modality entry SHALL include: type, value, label.

### 6.1.3 derogation_reference (optional)

When lawful derogations apply, derogation_reference SHOULD include: reference_uri, authority, valid_until.

### 6.2 Notice Record (versioned)

A Notice Record SHALL be versioned and resolvable such that a First Notice Receipt can reference an immutable version.
This profile uses First Notice Receipts to reference immutable notice versions.
Relationship note (terminology bridge): A Notice Record functions as the machine-readable transparency statement (standing, versioned disclosure artefact). A notification about issuance or change is represented as a transparency notification via the Notice Event Log and/or notice_type = notification, and SHOULD reference the relevant notice_version_reference.

### 6.3 First Notice Receipt

### 6.3.1 Anonymous-by-default

First Notice Receipts SHALL NOT require a pii_principal_id

### 6.3.2 First Notice Receipt field specification table (normative)

The following fields define the minimum interoperable First Notice Receipt.

| Field | Description | Required? | Value type / format | Constraints | Exposu |
| --- | --- | --- | --- | --- | --- |
| receipt_id | First Notice Receipt instance identifier | Yes | URI or string identifier | SHALL be unique within the issuer domain or as defined by the implementation | Holder issuer |
| notice_id | Stable notice family identifier | Yes | URI or string identifier | SHALL remain stable across notice versions | Holder issuer |
| notice_version_reference | Immutable reference to the disclosed notice version | Yes | URI and/or hash reference | SHALL reference the exact notice version in effect at disclosure time | Holder issuer |

| Field | Description | Required? | Value type / format | Constraints | Exposu |
| --- | --- | --- | --- | --- | --- |
| controller_identity_record_id | Reference to the CIR | Yes | URI or string identifier | SHALL reference a resolvable CIR | Holder issuer |
| presented_at | Time of disclosure/presentation | Yes | Date-time | SHALL be recorded with sufficient precision for dispute resolution | Holder issuer |
| lawful_basis | Asserted lawful basis for the processing context covered by the notice version | Yes | Controlled vocabulary | SHALL use the vocabulary in Annex C; SHALL be present in the receipt header for lawfulbasis interoperability | Holder issuer |
| two_factor_notice | Indicates whether this disclosure event was a two-factor online notice (2FN) producing a bilateral receipt | No | Boolean | If true and no nonconsent lawful basis is explicitly asserted, the interpretation defaults to consent as per the lawful basis interoperability rule | Holder issuer |
| notice_type | Notice classification | Yes | Controlled vocabulary | SHALL use the vocabulary in 6.3.1A | Holder issuer |
| recipient_jurisdictions | Destination jurisdiction(s) for cross-border transfer/disclosure | No | Array of country codes | When cross-border transfer/disclosure applies, this field SHALL be present; values SHOULD use ISO 31661 alpha-2 | Holder issuer |
| transfer_mechanism | High-level transfer mechanism / safeguard class | No | Controlled vocabulary | When cross-border transfer/disclosure applies, this field SHALL be present; vocabulary MAY be profiled by jurisdiction | Holder issuer |
| surveillance_risks | Material risk disclosure hook for state access/surveillance exposure | No | Text or structured reference | When applicable, SHOULD be present; if present, SHALL be version-bound via notice_version_reference | Holder issuer |
| rights_derogations | Disclosure of rights limitations/derogations in the applicable context | No | Text or structured reference | When applicable, SHOULD be present; changes SHALL be treated as material change | Holder issuer |

### 6.3.1A notice_type vocabulary (normative)

notice_type SHALL use one of the following values:

- notification
- disclosure
- policy
- signal

Implementations MAY define additional notice types, but SHALL map them to one of the values above for interoperability.

### 6.3.2 Required identifiers

A First Notice Receipt SHALL include at minimum:

- receipt_id
- notice_id
- notice_version_reference
- controller_identity_record_id (or resolvable pointer to the CIR)
- presented_at (event_time)
- notice_type

### 6.4 Notice Event Log

### 6.4.1 Minimum event types

The Notice Event Log SHALL support, at minimum:

- notice_issued
- notice_material_change

### 6.4.2 Event record minimum fields (normative)

Each Notice Event Log entry SHALL include at minimum:

- event_id
- event_time
- event_type
- notice_id and/or notice_version_reference
- receipt_id (when applicable)

### 6.4.3 Event type registry (normative)

Implementations SHALL support at minimum the following event types. Additive event types MAY be defined by companion specifications.

| event_type | Trigger | Required linkages | Notes |
| --- | --- | --- | --- |
| notice_issued | On issuance/publication of a new notice version | SHALL include notice_version_reference; SHOULD include notice_id | Supports discovery of current and historic notice versions |
| notice_material_change | On any material change (purposes, lawful basis, recipients/jurisdictions, retention, rights mechanisms) | SHALL include prior and new notice_version_reference OR an implementationdefined diff pointer | Used to enforce version binding and ongoing reference discipline |

The Notice Event Log SHOULD support hooks for:

- withdrawal/objection events
- rights exercise events

NOTE: Implementations MAY tier event-log requirements by assurance level; where tiered, the implementation SHALL state the tier.

## 8 Mandatory requirements

1. CIR publication (publicly accessible)
2. Anonymous First Notice Receipt-by-default (no pii_principal_id required), aligned with §6.3.1
3. Version binding and ongoing reference retention
4. Material change rule + notice event log entry
5. First Notice Receipt SHALL populate notice_type using the vocabulary in 6.3.1A.
6. Reciprocal and proportionate technology + rights-controls disclosure, aligned with the rule in “Lawful basis interoperability”.

## Annex A - Informative Mapping to ISO/IEC TS 27560:2023

This annex provides an initial interoperability mapping between the base extension artefacts and ISO/IEC TS 27560:2023 anchors. It is intentionally a starter mapping suitable for committee review; field-level clause alignment can be expanded as the 27560:2023-1 text is stabilized.

## A. 1 Artefact-to-anchor mapping (high level)

| Base extension record | Primary purpose | ISO/IEC TS 27560:2023 anchor | Notes / deltas |
| --- | --- | --- | --- |
| Controller Identification Record (CIR) | Controller accountability anchor (controller-id-first) | Party identification (controller role) | Profiled subset of party fields + required pointers (rights access, event log, publication) |
| Notice Record (versioned) | Machine-readable notice content + version binding | Consent record context (notice/policy content reference) | Adds explicit immutable notice version reference (notice_version_reference) |
| First Notice Receipt | Evidence of disclosure (anonymous-bydefault) | Consent receipt / record header + context | Stage 1 explicitly removes pii_principal_id requirement; receipt is initially versionbound |
| Notice Event Log | Lifecycle and material change spine | Event / lifecycle elements (event log / change record) | Adds minimum event type expectations + tiering note |

## A. 2 CIR mapping

| CIR field (base extension) | TS 27560:2023 anchor (exact) | Change type | Notes |
| --- | --- | --- | --- |
| controller_public_id_uri | TBD (Party identification fields) | Constrained | Public resolvable controller identifier (URI form); profiled as required |
| controller_name | TBD (Party name fields) | Constrained | Controller legal name; profiled as required |
| jurisdiction | TBD (Jurisdiction / applicability context) | New | Controller-asserted applicable jurisdiction (or pointer) |
| privacy_access_point | TBD (Contact / rights contact fields) | Constrained | Structured modalities (web/email/phone/etc.); profiled as required and structured |
| notice_event_log_url | TBD (Event / lifecycle reference) | New | Pointer to append-only lifecycle spine |

## A. 3 First Notice Receipt mapping

| Notice Receipt field (base extension) | 27560:2023 anchor | Notes |
| --- | --- | --- |
| receipt_id | Record identifier | Receipt instance identifier |
| notice_id | Notice/receipt linkage | Stable notice family identifier |
| notice_version_reference | Notice reference | Immutable reference to disclosed notice version |
| controller_identity_record_id | Party identification | Links receipt to CIR |
| presented_at (event_time) | Event / record time | Time of disclosure/presentation |
| notice_type | Context | Notification/disclosure/policy/signal (vocabulary defined by the extension) |
| (explicit absence) pii_principal_id | Data subject / principal identifier | Removed for Stage 1 anonymous-bydefault conformance |

## A. 4 Notice Event Log mapping

| Event Log element (base extension) | 27560:2023 anchor | Notes |
| --- | --- | --- |
| notice_issued | Event type | Stage 1 disclosure issuance event |
| notice_material_change | Event type | Material change triggers new notice version and new receipt issuance |
| tiering note | Conformance guidance | Allows assurance-tiered event-log requirements with explicit tier declaration |

## Annex B - Optional profile-extension appendix

This annex defines optional profile extensions for implementers that need processing-record alignment. These extensions are in addition to this existing UNRP and are not required for 27560:2023-1 base extension conformance.
Editorial rule: any record created under these optional profiles SHALL preserve the base extension’s reference integrity requirements (e.g., stable notice_id and immutable notice_version_reference) and SHALL NOT redefine Stage 1 notice/receipt semantics.

## B. 1 Optional Profile - PII Processing Records (controller/processor governance)

## B.1.1 Scope

Defines an optional controller/processor-side processing record profile (RoPA-aligned) that references base extension artefacts by identifier.

## B.1.2 Minimum interoperability requirements

- SHALL reference notice_id + notice_version_reference for any processing facts claimed to be disclosed.
- SHALL reference controller_identity_record_id (CIR).
- SHOULD reference Notice Event Log entries where material change, withdrawal/objection, or scope escalation is relevant.

## B.1.3 Conformance variants (starter)

- B1-Controller (controller record obligations)
- B1-Processor (processor/sub-processor chain)

## B. 2 Optional Profile - Personal PII Processing Records (individual-held)

## B.2.1 Scope

Defines an optional individual-held evidence record set (receipt wallet spine) that supports portability and rights exercise while remaining data-minimizing.

## B.2.2 Minimum interoperability requirements

- SHALL support anonymous/pseudonymous operation by default.
- SHALL support a minimal “reference receipt” pattern that points to notice_version_reference + CIR.
- SHALL include a minimum rights exercise payload via privacy_access_point.

## B. 3 Mapping and field tables (to be completed)

Populate:

1. Field lists + cardinality
2. Relationship to ISO/IEC TS 27560:2023 anchors
3. Worked examples

## B.3.1 Field lists + requirement status (starter tables)

B.3.1.1 Optional Profile B1 (Controller/Processor processing record) — minimum fields

| Field | Description | Required? | Value type / format | Constraints |
| --- | --- | --- | --- | --- |
| processing_record_id | Identifier for the processing record instance | Yes | URI or string identifier | SHALL be unique within the issuer domain or as defined by the implementation |
| controller_identity_record_id | Pointer to the Controller Identification Record (CIR) | Yes | URI or string identifier | SHALL reference a resolvable CIR |
| notice_id | Stable notice family identifier | Yes | URI or string identifier | Each referenced notice_id SHALL be paired with a notice_version_reference |
| notice_version_reference | Immutable reference(s) to notice versions relied upon for disclosure claims | Yes | URI and/or hash reference | SHALL reference the exact notice version in effect for the disclosed processing facts |
| lawful_basis | Asserted lawful basis for the processing context | Yes | Controlled vocabulary | SHALL use Annex C vocabulary |

| Field | Description | Required? | Value type / format | Constraints |
| --- | --- | --- | --- | --- |
|  | processing context |  |  |  |
| purposes | Declared processing purposes covered by the record | Yes | Array of strings and/or purpose identifiers | SHALL be consistent with the referenced notice version(s) |
| recipients_or_categories | Recipients or recipient categories | No | Array of strings and/or identifiers | When present, SHOULD include crossborder/jurisdiction indicators |
| retention | Retention period or retention rule | No | String/object | When present, SHOULD be consistent with referenced notice version(s) |
| notice_event_log_url | Pointer to relevant Notice Event Log (optional) | No | URL/URI | When present, SHOULD support discovery of material-change events impacting this record |

B.3.1.2 Optional Profile B2 (Personal evidence spine / wallet-held) - minimum fields

| Field | Description | Required? | Value type / format | Constraints |
| --- | --- | --- | --- | --- |
| personal_record_id | Identifier for the individual-held record instance | Yes | URI or string identifier | SHALL be unique within the holder domain or wallet context |
| receipt_id | Referenced First Notice Receipt identifier | No | URI or string identifier | When present, SHOULD be accompanied by notice_version_reference |
| notice_id | Stable notice family identifier | Yes | URI or string identifier | SHALL remain stable across notice versions |
| notice_version_reference | Immutable reference(s) to disclosed notice versions | Yes | URI and/or hash reference | SHALL reference the exact notice version(s) held as evidence |
| controller_identity_record_id | Pointer to the CIR | Yes | URI or string identifier | SHALL reference a resolvable CIR; MAY be cached by the holder |
| privacy_access_point | Rights/contact access modalities | Yes | Array of objects | SHALL enable rights exercise without requiring additional identification by default |

| Field | Description | Required? | Value type / format | Constraints |
| --- | --- | --- | --- | --- |
|  | (copied or referenced) |  |  |  |
| notes | Optional holder annotations | No | String | SHOULD remain dataminimizing and unlinkable |

B.3.2 Relationship to ISO/IEC TS 27560:2023 anchors (minimum mapping)

| Optional profile element | Closest TS 27560:2023 anchor | Interoperability note |
| --- | --- | --- |
| B1 processing_record_id | Record identifier | Distinct from receipt_id; used to reference processing-record instances that cite notice versions |
| B1 controller_identity_record_id | Party identification (controller role) | Uses the base extension CIR pointer as the stable accountability anchor |
| B1 notice_id + notice_version_reference | Context / notice reference | Provides verifiable linkage between processing facts and disclosed notice versions |
| B1 lawful_basis | Legal basis / justification context | Uses Annex C vocabulary so the same basis indicator is interoperable across receipts and processing records |
| B2 receipt_id | Consent receipt / record identifier | Wallet-held evidence MAY store only references (reference receipt pattern) to remain data-minimizing |
| B2 privacy_access_point | Contact / rights mechanisms | Supports rights exercise by carrying forward access modalities from the CIR |

## B.3.3 Worked examples (frame)

B.3.3.1 Example: B1 processing record citing a disclosed notice version

| Field | Example value |
| --- | --- |
| processing_record_id | urn:example:processing-record:7f2b |
| controller_identity_record_id | https://controller.example/cir/123 |
| notice_id | https://controller.example/notice/abc |
| notice_version_reference | sha256:2b7e… (immutable hash reference) |
| lawful_basis | legitimate_interest |
| purpose, or purpose bundle | [“fraud prevention”, “service security”] |

B.3.3.2 Example: B2 personal evidence record storing a reference receipt set

| Field | Example value |
| --- | --- |
| personal_record_id | urn:example:wallet:evidence:91aa |

| Field | Example value |
| --- | --- |
| receipt_id | urn:example:receipt:55cc |
| notice_id | https://controller.example/notice/abc |
| notice_version_reference | sha256:2b7e… (immutable hash reference) |
| controller_identity_record_id | https://controller.example/cir/123 |
| privacy_access_point | [{type:"web", value:"https://controller.example/privacy", label:"Privacy access point"}] |

## B. 4 Relationship to companion specifications

Cross-border security and AI lifecycle governance requirements SHOULD be specified in the companion documents, not in this annex:

- [Cross-border transfer mechanisms: alignment to be tracked against ISO/IEC 27091 Annex B. 4 (operational transparency) and 27566-2 Annex F practice statements]
- [AI lifecycle governance: alignment to be tracked against ISO/IEC FDIS 27091 (AI cybersecurity and privacy) and ISO/IEC 42001]

## Annex C - Lawful basis variants: rights and obligations table (normative)

This annex defines the lawful basis vocabulary and a minimum rights/obligations disclosure table for lawful-basis interoperability. Implementations SHALL reference the applicable row via lawful_basis in the First Notice Receipt header.

| lawful_basis (value) | Meaning (high level) | Rights commonly triggered | Controller obligations commonly triggered | Receipt/header requirements (minimum) |
| --- | --- | --- | --- | --- |
| consent | Processing based on meaningful choice by the individual | Withdrawal; access; rectification; erasure (where applicable); objection (where applicable) | Record evidence of consent; enable withdrawal; ensure freely given/specific/informed/unambiguous; avoid coercion; demonstrate proof | 2FN MAY be used; if 2FN used and no other lawful basis asserted, consent is the default interpretation |
| contract | Processing necessary for contract performance or steps at request of the individual | Access; rectification; objection/complaint pathways; portability where applicable | Disclose necessity scope; limit processing to contract purposes; document retention aligned to contract | Header SHALL assert contract and identify the contractpurpose scope covered by the notice version |
| legal_obligation | Processing necessary to comply with a legal obligation | Access and explanation; complaint/appeal pathways; restrictions where lawful | Identify the obligation authority; document statutory basis; apply minimization; disclose retention mandates | Header SHALL assert legal obligation and provide authority reference (law/regulation/court order) or pointer |

| lawful_basis (value) | Meaning (high level) | Rights commonly triggered | Controller obligations commonly triggered | Receipt/header requirements (minimum) |
| --- | --- | --- | --- | --- |
| legitimate_interest | Processing necessary for legitimate interests balanced against the individual’s rights | Right to object; access; explanation; complaint/appeal pathways | Document balancing/necessity; provide objection mechanism; apply safeguards and minimization | Header SHALL assert legitimate interest and provide a pointer to the balancing rationale or summary |
| vital_interest | Processing necessary to protect vital interests | Access and explanation after the fact (where applicable) | Document emergency necessity; limit scope and duration; later notice and accountability | Header SHALL assert vital interest and record emergency context constraints |
| public_interest | Processing necessary for a task carried out in the public interest or under official authority | Access; explanation; objection/appeal pathways as applicable | Identify authority; define task scope; apply proportionality; enable oversight mechanisms | Header SHALL assert public interest and provide authority/task reference or pointer |

## Proposed Additions Appendix - A - Reciprocal and proportionate transparency extensions (normative)

This appendix defines a normative extension pattern for implementers and committees who need explicit, testable requirements for reciprocal and proportionate transparency tied to the technologies in use and the practical rights controls (including associated or derivative rights controls).

### C.1 Normative objective

Where a technology-mediated processing capability is present, the Notice Record (and/or referenced transparency statement) SHALL disclose the corresponding practical rights controls in a manner that is:

- **proportionate** to the risk surface and the capability in use, and
- **reciprocal** to the controller’s technical capability (what the technology can do is matched by what the individual can see and control).

### C.2 Minimum disclosure elements (normative)

For each Notice Record version relied upon by a First Notice Receipt, the controller SHALL publish (inline or by stable reference) the following disclosure elements as represented in the record of notice.

### C.2.1 Disclosure element specification table (normative)

| Element | Description | Required? | Value type / format | Constraints | Exposure |
| --- | --- | --- | --- | --- | --- |
| technology_in_use | Technology class(es) in use for the processing context (e.g., tracking, profiling, automated decision, biometric inference, cross-device linkage, data brokerage, disclosure/transfer mechanisms). | Yes | Array (controlled vocabulary values + optional free-text labels) | SHALL be specific enough for relying parties to understand the capability present and assess proportionality. | Public |
| controls_available_primary | Controls that can be exercised by the individual, including at minimum: withdraw (when consent), object (when applicable), complain/appeal, and automatic information access. | Yes | Array of objects | Each entry SHALL include: control_type, modality (e.g., web, email, API, signal), scope, and effect. | Public |
| associated_or_derivative_controls | Additional controls arising due to technology choices (e.g., opt-out of targeted advertising, signal-based controls, browser/device signals, global privacy controls, do-not-sell/share controls). | Yes (when applicable) | Array of objects | When a derivative control exists, it SHALL be disclosed with the same minimum structure as primary controls (control_type, modality, scope, effect). | Public |
| secondary_purposes_of_use | Disclosure of secondary purposes (beyond the primary purpose) and the corresponding control(s) available for those secondary purposes. | Yes (when present) | Array of objects | Each secondary purpose entry SHALL disclose: purpose label/identifier, lawful basis (if distinct), and the control mechanism (e.g., separate opt-in/opt-out, withdrawal equivalence, or objection pathway), including scope and effect. | Public |
| limitations_or_derogations_on_controls | Material limitations or derogations that constrain controls, including where a control is unavailable in a given context (and why), and the authority/pointer supporting that limitation. | Yes (when applicable) | Array of objects | Each entry SHOULD include: affected_control, limitation_type, rationale, authority_reference (URI), and valid_until (where applicable). | Public or restricted |

### C.3 Material change rule (normative addition)

Changes to any of the following SHALL be treated as **material changes**:

- technology class(es) in use;
- availability, scope of disclosure, or practical effect of any rights control (including associated or derivative controls);
- secondary purposes of use and their control mechanisms.

Such changes SHALL trigger (a) a new notice version, and (b) a corresponding Notice Event Log entry.

### C.4 ISO/IEC JTC 1/SC 27/WG 5 comment table (proposed updates)

Use this table to submit exact normative changes into the relevant draft (clause numbers/line numbers to be updated to match the target working draft pagination).

| **MB** | **NC** | **Line number** | **Clause/Subclause** | **Paragraph/Figure/Table** | **Type of comment** | **Comments** | **Proposed change** | **Observations of the secretariat** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CA | C-1 | TBD | 6.2 (Reference integrity and version binding) | Material change rule | te | Material change definition currently lists examples (purposes, lawful basis, recipients/jurisdictions, retention, rights mechanisms) but does not explicitly include technology class changes nor practical rights controls changes, which are essential for reciprocal and proportionate transparency. | Add to the material change list: “technology class(es) in use; availability/scope/effect of practical rights controls (including associated or derivative controls); and secondary purposes of use and corresponding controls.” Also require a Notice Event Log entry for these changes. |  |
| CA | C-2 | TBD | 6.2 and/or 7 (Notice Record specifications) | Notice Record (versioned) | te | The profile introduces reciprocal and proportionate transparency as a normative rule, but the Notice Record specification does not require publishing the minimum disclosure elements needed for testable interoperability (technology in use, controls, derivative controls, limitations, and secondary purposes). | Insert normative minimum disclosure requirements for each Notice Record version relied upon by a receipt: (a) technology class(es) in use; (b) controls available including withdraw (where consent), object (where applicable), complain/appeal, automatic information access; (c) associated/derivative controls; (d) secondary purposes of use + corresponding controls; (e) limitations/derogations + authority/pointer. |  |
| CA | C-3 | TBD | Annex C (Lawful basis variants) | Rights and obligations rows | te | Annex C enumerates rights and obligations per lawful basis but does not explicitly require a pointer to the technology/control disclosure set, and does not ensure secondary purposes are separately controllable and disclosed. | Add a minimum receipt/header requirement (or additional column) requiring a pointer/reference to the Notice Record’s “technology + rights controls + secondary purposes” disclosure set. For consent, explicitly require withdrawal mechanism and scope; for legitimate interest/public interest, explicitly require objection/complaint pathway and automatic information access. |  |