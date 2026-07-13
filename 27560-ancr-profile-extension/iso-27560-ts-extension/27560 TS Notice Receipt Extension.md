# ANCR Extension for  ISO/IEC TS 27560:2023
Anchored Notice and Consent Receipts for Operational Transparency a consent receipt extension for TS 27560:2023 - [Posted-May2026](https://github.com/KantaraInitiative/ancr-wg/blob/d1a92ce689243708083e5723f02728b0cc00d810/27560%20ancr%20profile%20extension/ISO-27560%20TS%20Extension%20/27560%20TS%20Notice%20Receipt%20Extension.md)

## Foreword

This document specifies a notice receipt information structure that profiles and extends ISO/IEC TS 27560:2023 (consent record information structure). It is published by the Kantara Initiative and the Anchored Notice and Consent Receipt (ANCR) Working Group as a companion specification, and is intended to be cited as prior art and an implementation reference for SC 27/WG 5 work that depends on machine-readable notice and consent records (notably ISO/IEC FDIS 27091 Annex B.4, ISO/IEC WD TS 27568 Table 2, ISO/IEC WD 27573, and ISO/IEC WD 27566-2 Annex F, ISO/IEC 27091 Annex B ).

## Introduction

Governing digital identity for privacy requires identifiers to be bound to an artefact that can be referenced after the fact. Historically, such identifiers have been encapsulated in a record and provided in receipt of an event by context at a time and place. The notice receipt acts as a container not only for identifiers, but for the integrity of the claim that the identifiers represent and link to as real world objects.
A notice receipt is generated through interaction (or a lack of interaction) with a physical sign, access point, a device or an online notification or statement. A notice receipt can be generated independently by an individual, from the notice by creating or accessing a controller identification record to produce a proof of notice disclosure that can be exchanged between devices and across borders.

```
Relationship to related instruments (informative):
ISO/IEC 29100 Privacy framework
↓
ISO/IEC 29184 Online privacy notices and consent
↓
ISO/IEC TS 27560:2023 Consent record information structure
↓
This profile (ISO/IEC TS 27560:2023 extension for Notice Record + Notice Receipt + Notice Event Log)
↓
Applicable code of conduct / code of practice / privac policy / law (jurisdiction-specific)
```

## 1 Scope

This profile extends ISO/IEC TS 27560:2023 (consent record information structure) to specify a machine-readable online Notice Record and corresponding Notice Receipt that provide durable evidence of notice disclosure.
It supports layered and sequenced notices, notifications, and disclosures. Anchored Notice Receipt requirements are legal basis agnostic. When the lawful basis is consent, a corresponding authorization can be represented as a TS 27560:2023 consent receipt specialisation.
The base notice record extension defines a minimum interoperable set of notice artefacts for operational transparency:

- Controller Identification Record (CIR)
- Notice Record / Anchored Notice Receipt
- Notice Event Log
- Reference notice integrity and version binding (including notice_id, notice_version_reference)

Interaction with an online notice record results in a notice receipt, which may be either:

- a full receipt (contains required record fields), or
- a reference receipt (minimal fields plus stable references and rights payload).

Note: An online notice, notifications, disclosure, or statement sequences differ according to

1. in person peer to peer using a device (notice and identity are physically verifiable
2. remote (not in person), identification is not physically verifiable. Controller identification is required.
Out of scope for the base extension (may be handled by optional appendices or companion specs):
- authorization exchange protocol mechanics beyond the Anchored Notice Receipt
- tokens/credentials and wallet portability mechanisms
- full RoPA / processing-record completeness requirements
- cross-border security requirements beyond baseline notice disclosure
- AI lifecycle governance requirements beyond baseline notice disclosure

## 2 Normative references

- ISO/IEC TS 27560:2023 Privacy technologies — Consent record information structure
- ISO/IEC 29100, Privacy framework

## 3 Non-Normative references

- ISO/IEC 29184, Online privacy notices and consent
    - Note: a)  free and open  access to this standard is required for it to be listed as normative, or would block the use of 27568 directly, although it can be used for control interoperability between Profiles.

The key words SHALL, SHOULD, and MAY in this document are to be interpreted as described in ISO/IEC Directives, Part 2.
NOTE: This draft avoids the use of “must” as a normative keyword. Where “must” appears in examples or explanatory text, it is not intended to introduce a normative requirement.

## 4 Terms and definitions

Terms and definitions from ISO/IEC TS 27560:2023 and ISO/IEC 29100 apply.

3.1 Controller Identification Record (CIR): 
publicly accessible controller accountability record used as an anchor for notice and receipt generation.

3.2 Notice Record: 
controller-maintained record of notice content (versioned).

3.3 Anchored Notice Receipt: 
the **first notice receipt** — bilateral evidence artefact recording that a specific notice version was disclosed/presented. When the lawful basis is consent, the Anchored Notice Receipt provides the required proof of notice disclosure needed for valid legal consent (and for linking any subsequent consent/authorization receipts to the anchored disclosure event).

3.4 Notice Event Log: 
append-only record of lifecycle events related to notices/receipts (issuance, material change, withdrawal/objection hooks).

3.5 notice_version_reference: 
immutable reference to the notice version in effect at the time of disclosure.

3.6 transparency statement: 
versioned transparency disclosure artefact that expresses the standing terms of notice (controller identification, processing context, rights mechanisms) and is suitable for audit and stable referencing.

3.7 transparency notification: 
event-bound message signaling that a transparency-relevant event has occurred (for example issuance, material change, rights-related lifecycle event), typically referencing a specific transparency statement version.

3.8 reciprocal and proportionate transparency: 
disclosure property in which the technology-mediated processing capabilities and the practical rights controls available to the individual are stated in a manner that is proportionate to the risk surface and reciprocal to the controller’s technical capability (i.e., what the technology can do is matched by what the individual can see and control).

## 5 Conformance

An implementation conforms to the Base extension if it satisfies all mandatory requirements in Section 7. Implementations MAY additionally claim conformance to optional extension profiles for PII and Personal records of processing activity profiles defined in Annex B.

## 6 Overview of notice artefacts and reference integrity

### 6.1 Overview: two-factor online notice (2FN) and receipt evidence

This profile supports a two-factor online notice pattern (2FN) for establishing durable evidence of notice disclosure and (where applicable) consent.

- **Factor 1 (presentation controls):** the notice is presented using ISO/IEC 29184-aligned online notice and consent presentation controls (e.g., layered notice presentation, timing, and interaction patterns) that are reusable across policy/notice types.
- **Factor 2 (evidence receipt):** an Anchored Notice Receipt is generated to provide durable evidence that a specific notice version was presented/available at a specific time (and, when the lawful basis is consent, to support proof of informed consent by binding the authorization state to the disclosed notice version).

Implementations SHOULD treat 2FN as an interoperability pattern: the presentation controls establish consistent user experience and meaningful choice, while the receipt provides verifiable, referenceable evidence for audit, later inquiry, and dispute resolution.

### 6.2 Notice Receipt Object set

1. CIR (controller accountability anchor)
2. Notice Record (versioned notice content)
3. Anchored Notice Receipt (proof of notice evidence)
4. Notice Event Log (lifecycle)

### 6.3 Reference integrity and version binding

A  Notice Receipt SHALL reference:

- notice_id (stable family identifier)
- notice_version_reference (immutable version reference)

A material change to a notice (purposes, lawful basis, recipients/jurisdictions, retention, rights mechanisms) SHALL:

- create a new notice version, and
- create a corresponding Notice Event Log entry.

Historic notice versions SHALL be retained as long as any processing or records depend on them (ongoing reference discipline).

## 7 Notice record specifications

### 7.1 Controller Identification Record (CIR)

### 7.1.1 CIR minimum field set

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

### 7.1.1 A CIR field specification table (normative)

| Field | Description | Required? | Value type / format | Constraints | Exposure | TS 27560:2023 anchor |
| --- | --- | --- | --- | --- | --- | --- |
| controller_identity_record_id | Stable identifier for the CIR | Yes | URI or string identifier | SHALL be stable; SHALL be suitable for referencing by receipts and event logs | Public | 6.3.6.2 party_id (controller party) |
| controller_public_id_uri | Public resolvable controller identifier | Yes | URI | SHALL be resolvable or dereferenceable by intended relying parties | Public | 6.3.6.5 party_url (closest anchor) |
| controller_name | Controller legal name | Yes | String | SHALL represent the accountable controller entity | Public | 6.3.6.7 party_name |
| jurisdiction | Applicable jurisdiction indicator or pointer | Yes | Code or string | SHALL be present; MAY be a pointer to a code of conduct reference | Public | 6.3.4.17 jurisdiction (PII processing) |
| privacy_access_point | Rights/contact access modalities | Yes | Array of objects | Each entry SHALL include type, value, label | Public | 6.3.6.9 party_contact (closest anchor) |
| notice_event_log_url | Pointer to the notice event log service or resource | No | URL/URI | When present, SHOULD be publicly discoverable | Public | N/A (extension field) |
| controller_address | Controller address (optional) | No | String or structured address | - | Public | 6.3.6.3 party_address (closest anchor) |
| code_of_conduct | Pointer to authoritative code of conduct / practice | No | URI | When present, SHOULD be versioned | Public | 6.3.4.21 codes_of_conduct (closest anchor) |
| derogation_reference | Lawful withholding / derogation metadata (optional) | No | Object | When present, SHOULD include reference_uri, authority, valid_until | Public or restricted | N/A (extension field) |

### 7.1.2 privacy_access_point

rights_access_point SHALL support multiple modalities.
Each modality entry SHALL include: type, value, label.

### 7.1.3 derogation_reference

When lawful derogations apply, derogation_reference SHOULD include: reference_uri, authority, valid_until. (optional)

### 7.2 Notice Record

A Notice Record SHALL be versioned and resolvable such that an Anchored Notice Receipt can reference an immutable version.
This profile uses Anchored Notice Receipts to reference immutable notice versions.
Relationship note (terminology bridge): A Notice Record functions as the machine-readable transparency statement (standing, versioned disclosure artefact). A notification about issuance or change is represented as a transparency notification via the Notice Event Log and/or notice_type = notification, and SHOULD reference the relevant notice_version_reference.

#### 7.2.1 Reciprocal and proportionate transparency disclosure set

For each Notice Record version relied upon by a receipt, the controller SHALL publish a **technology + controls disclosure set** that is:

- bound to the exact notice_version_reference in effect at disclosure time; and
- publicly retrievable either inline in the Notice Record or by stable reference.

The disclosure set SHALL include, at minimum, the elements defined in **Appendix A (Reciprocal and proportionate transparency extensions)**, including:

- technology_in_use;
- controls_available_primary;
- associated_or_derivative_controls (when applicable);
- secondary_purposes_of_use (when present); and
- limitations_or_derogations_on_controls (when applicable).

The Notice Record SHALL include a stable pointer to this disclosure set using `transparency_disclosure_reference` (URL/URI), unless the full disclosure set is embedded inline in the Notice Record itself.

Changes to the disclosure set that affect technology class(es) in use, the availability/scope/effect of practical rights controls, or secondary purposes SHALL be treated as material changes and SHALL trigger a new notice version and a corresponding Notice Event Log entry (see Appendix A).

#### 7.2.2 Lawful basis interoperability

This profile is lawful-basis interoperable: the Notice Receipt structure SHALL support all lawful bases under applicable law. Each lawful basis has distinct rights, obligations, and dispute triggers.
Implementations SHALL communicate the asserted lawful basis in the receipt header, and SHALL publish the applicable rights/obligations variant using the Annex C table structure.
Consent-by-default for two-factor notice: Where an interaction is presented as a two-factor online notice that returns a bilateral receipt (2FN), the default interpretation SHALL be consent unless another lawful basis is explicitly asserted in the receipt header.
If a lawful basis other than consent is asserted, the receipt header SHALL state that lawful basis explicitly (e.g., contract, legal obligation, legitimate interest, vital interest, public interest) and SHALL reference the corresponding Annex C row (rights/obligations variant).
Receipts are designed to be detectable and reusable to reduce repetitive notice prompts and repetitive consent prompts in order to mitigate prompt fatigue. The profile is designed to complement existing physical signs and privacy policy pages by providing a standardized notice record that can be extended by context and external codes of conduct to support transparency by default codes of practice.
By standardizing notice version references and receipt exchange, the profile supports cross border transparency and dispute resolution, including material change signalling through the notice event log.

### 7.3 Anchored Notice Receipt

This profile treats “Anchored Notice Receipt” as a **receipt classification**, not a separate primary artefact type. A receipt MAY be marked as an Anchored Notice Receipt using the optional indicator field `anchored_notice_receipt`.
Where `anchored_notice_receipt` is not asserted (or is false), the receipt SHALL link to the applicable Anchored Notice Receipt via `anchored_notice_receipt_id` so that subsequent receipts are traceable to the initial notice disclosure event.

### 7.3.1 Anonymous-by-default (Anchored Notice Receipt)

Anchored Notice Receipts SHALL NOT require an account_id or pii_principal_id

### 7.3.2  Notice Receipt field specification table

The following fields define the minimum interoperable Anchored Notice Receipt.

| Field | Description | Required? | Value type / format | Constraints | Exposure |
| --- | --- | --- | --- | --- | --- |
| schema_version | Schema reference for technical interpretation of the receipt structure | Yes | String identifier | SHALL reference the implementation documentation (receipt schema) in effect at issuance | Holder issuer |
| anchored_notice_receipt | Indicator that the receipt instance is the Anchored Notice Receipt (first notice receipt) for the applicable notice version disclosure event | No | Boolean | When present and true, the receipt is classified as an Anchored Notice Receipt; when false or absent, the receipt SHALL reference the applicable Anchored Notice Receipt using anchored_notice_receipt_id | Holder issuer |
| receipt_id | First Notice Receipt instance identifier | Yes | URI or string identifier | SHALL be unique within the issuer domain or as defined by the implementation | Holder issuer |
| anchored_notice_receipt_id | Reference to the applicable Anchored Notice Receipt instance identifier | No | URI or string identifier | When anchored_notice_receipt is true, this field SHOULD be absent or equal to receipt_id; when anchored_notice_receipt is false or absent, this field SHALL reference the applicable Anchored Notice Receipt | Holder issuer |
| account_id | Identifier or reference to the account or relationship context (pseudonymous where applicable) | No | URI or string identifier | When present, SHOULD be unlinkable and data-minimizing; MUST NOT be required for anonymous-by-default operation | Holder issuer |
| notice_id | Stable notice family identifier | Yes | URI or string identifier | SHALL remain stable across notice versions | Holder issuer |
| notice_version_reference | Immutable reference to the disclosed notice version | Yes | URI and/or hash reference | SHALL reference the exact notice version in effect at disclosure time | Holder issuer |
| transparency_disclosure_reference | Stable pointer to the Notice Record’s technology + controls disclosure set | No | URL/URI | When the disclosure set is not embedded inline in the Notice Record, this field SHOULD be present so relying parties can retrieve the Appendix A disclosure elements bound to notice_version_reference | Holder issuer |
| controller_identity_record_id | Reference to the CIR | Yes | URI or string identifier | SHALL reference a resolvable CIR | Holder issuer |
| presented_at | Time of disclosure/presentation | Yes | Date-time | SHALL be recorded with sufficient precision for dispute resolution | Holder issuer |
| lawful_basis | Asserted lawful basis for the processing context covered by the notice version | Yes | Controlled vocabulary | SHALL use the vocabulary in Annex C; SHALL be present in the receipt header for lawfulbasis interoperability | Holder issuer |
| two_factor_notice | Indicates whether this disclosure event was a two-factor online notice (2FN) producing a bilateral receipt | No | Boolean | If true and no nonconsent lawful basis is explicitly asserted, the interpretation defaults to consent as per the lawful basis interoperability rule | Holder issuer |
| notice_type | Notice classification | Yes | Controlled vocabulary | SHALL use the vocabulary in 7.3.1A | Holder issuer |
| recipient_jurisdictions | Destination jurisdiction(s) for cross-border transfer/disclosure | No | Array of country codes | When cross-border transfer/disclosure applies, this field SHALL be present; values SHOULD use ISO 31661 alpha-2 | Holder issuer |
| transfer_mechanism | High-level transfer mechanism / safeguard class | No | Controlled vocabulary | When cross-border transfer/disclosure applies, this field SHALL be present; vocabulary MAY be profiled by jurisdiction | Holder issuer |
| surveillance_risks | Material risk disclosure hook for state access/surveillance exposure | No | Text or structured reference | When applicable, SHOULD be present; if present, SHALL be version-bound via notice_version_reference | Holder issuer |
| rights_derogations | Disclosure of rights limitations/derogations in the applicable context | No | Text or structured reference | When applicable, SHOULD be present; changes SHALL be treated as material change | Holder issuer |

### 7.3.1A notice_type vocabulary (normative)

notice_type SHALL use one of the following values:

- Statement
- notification
- risk disclosure
- policy
- signal

Implementations MAY define additional notice types, but SHALL map them to one of the values above for interoperability.

### 6.3.2 Required identifiers

An Anchored Notice Receipt SHALL include at minimum:

- receipt_id
- notice_id
- notice_version_reference
- controller_identity_record_id (or resolvable pointer to the CIR)
- presented_at (event_time)
- notice_type

### 7.4 Notice Event Log

### 7.4.1 Minimum event types

The Notice Event Log SHALL support, at minimum:

- notice_issued
- notice_material_change

### 7.4.2 Event record minimum fields (normative)

Each Notice Event Log entry SHALL include at minimum:

- event_id
- event_time
- event_type
- notice_id and/or notice_version_reference
- receipt_id (when applicable)

### 7.4.3 Event type registry (normative)

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
2. Anonymous Anchored Notice Receipt-by-default (no pii_principal_id required), aligned with §7.3.1
3. Version binding and ongoing reference retention
4. Material change rule + notice event log entry
5. Anchored Notice Receipt SHALL populate notice_type using the vocabulary in 7.3.1A.
6. Reciprocal and proportionate technology + rights-controls disclosure, aligned with the rule in “Lawful basis interoperability”.

## Annex A - Informative Mapping to ISO/IEC TS 27560:2023

This annex provides an initial interoperability mapping between the base extension artefacts and ISO/IEC TS 27560:2023 anchors. It is intentionally a starter mapping suitable for committee review; field-level clause alignment can be expanded as the 27560:2023-1 text is stabilized.

- TS clause references refer to ISO/IEC TS 27560:2023 (not drafts).
- “Profile field” names refer to fields defined in this document’s receipt and record tables.
- “Action” is the recommended migration or interpretation rule for implementers exchanging records across the TS and this profile.

## A.1 TS 27560:2023 record + receipt header alignment

This profile supports TS-style schema governance and identifiers by carrying forward `schema_version` and receipt/record identifiers. Where TS uses `pii_principal_id` as required in the consent record header, this profile uses `account_id` as an optional identifier for relationship context (pseudonymous where applicable).

## A.1.1 New vs updated fields

This section classifies profile fields relative to TS 27560:2023:

- **New fields**: not present in TS 27560:2023.
- **Updated TS fields**: a TS field is renamed, constrained, or its semantics are adapted.

## A.1.1A New fields introduced by this profile

| Profile field | Status | Closest TS anchor | Notes |
| --- | --- | --- | --- |
| anchored_notice_receipt | New | N/A | Indicator that a receipt instance is classified as the First Notice Receipt for the applicable notice disclosure event. |
| anchored_notice_receipt_id | New | N/A | Linkage field; when first_notice_receipt is false/absent, this field references the applicable First Notice Receipt. |
| notice_id | New | privacy_notice (reference) | Stable notice family identifier; complements the TS privacy_notice URL/version reference by providing a stable family identifier across versions. |
| notice_version_reference | New | privacy_notice (reference) | Immutable reference to the disclosed notice version; supports version binding beyond a mutable URL. |
| controller_identity_record_id | New | party_id | Specializes controller party identification as a resolvable CIR identifier. |
| presented_at | New | event_time | Time of disclosure/presentation; aligned to TS event_time semantics for the notice disclosure event. |
| notice_type | New | N/A | Classification vocabulary (notification/disclosure/policy/signal). |
| two_factor_notice | New | N/A | Optional indicator for the 2FN pattern producing a bilateral receipt. |
| recipient_jurisdictions | New | recipient_third_parties / jurisdiction | Optional explicit cross-border destination jurisdictions (simplified hook for transfer disclosure). |
| transfer_mechanism | New | N/A | Optional safeguard/transfer mechanism class for cross-border transfers. |
| surveillance_risks | New | impact_assessment (optional) | Optional risk disclosure hook for surveillance/state access exposure. |
| rights_derogations | New | N/A | Optional disclosure of rights limitations/derogations in the applicable context. |

## A.1.1B Updated TS fields (rename / relax / specialize)

| TS 27560:2023 field | Profile field | Change type | Notes |
| --- | --- | --- | --- |
| pii_principal_id | account_id | Renamed + relaxed | TS requires pii_principal_id in the consent record header; this profile replaces it with optional account_id to support anonymous-by-default operation (pseudonymous where applicable). |
| party_id (controller) | controller_identity_record_id | Specialized | Controller party identifier is specialized as a CIR reference rather than an opaque party_id. |

## A.1A Field mapping table

| TS 27560:2023 field | TS clause | Profile field | Action | Notes |
| --- | --- | --- | --- | --- |
| schema_version | 6.3.3.2 / 6.4.5.2 | schema_version | Same | Required in TS record and TS receipt metadata; required in this profile’s receipt header. |
| record_id | 6.3.3.3 | receipt_id (for receipt artefacts) | Map / rename | TS distinguishes record_id (record) and receipt_id (receipt). This profile uses receipt_id for receipt instances; implementations MAY also persist a TS-style record_id in controller-side records. |
| receipt_id | 6.4.5.3 | receipt_id | Same | Unique receipt instance identifier. |
| pii_principal_id | 6.3.3.4 | account_id | Map / relax | TS requires pii_principal_id in the record header. This profile makes account_id optional to support anonymous-by-default operation; when present it SHOULD be data-minimizing and unlinkable. |
| event_time | 6.3.7.2 | presented_at | Map | For First Notice Receipt classification, presented_at captures the time of disclosure/presentation (TS event_time equivalent). |
| party_id (controller) | 6.3.6.2 | controller_identity_record_id | Map / specialize | Controller party identifier is specialized as a reference to the CIR identifier. |
| party_name (controller) | 6.3.6.7 | controller_name (CIR) | Map | Carried in the CIR rather than repeated per receipt where a reference receipt pattern is used. |
| party_contact (controller) | 6.3.6.9 | privacy_access_point (CIR) | Map | Rights and contact modalities are carried as structured entries in CIR privacy_access_point. |
| privacy_notice | 6.3.4.2 | notice_version_reference | Map / extend | TS uses a notice reference (typically URL/version). This profile uses an immutable notice_version_reference (URL and/or content hash) and MAY also carry a notice URL in a Notice Record. |
| language | 6.3.4.3 | (Notice Record disclosure set) | Map | Language remains applicable to Notice Record rendering; include in the Notice Record and/or referenced transparency statement where multilingual delivery is supported. |
| purposes | 6.3.4.4 | (Notice Record disclosure set) | Map | TS purposes are carried in the Notice Record and SHOULD be bindable to notice_version_reference; secondary purposes are disclosed via secondary_purposes_of_use (Appendix A) when present. |
| purpose | 6.3.4.5 | (Notice Record disclosure set) | Map | Purpose labels/identifiers are disclosed in the Notice Record for the applicable notice version. |
| lawful_basis | 6.3.4.7 | lawful_basis | Map / generalize | TS lawful_basis is consent-scoped; this profile generalizes lawful basis for interoperability across lawful bases (Annex C vocabulary). |
| pii_information | 6.3.4.8 | (Optional Profile B1) | Map | PII attribute/category inventories are profile-extension scope (B1 processing record). A Stage 1 reference receipt MAY omit inventories. |
| pii_controllers | 6.3.4.9 | controller_identity_record_id | Map / specialize | Controller identification is anchored in CIR via controller_identity_record_id; joint controllers MAY be represented as multiple CIR references. |
| storage_locations | 6.3.4.12 | (Optional Profile B1) | Map | Storage location disclosure is processing-record scope (B1) and MAY be referenced from notice versions where required. |
| retention_period | 6.3.4.13 | (Optional Profile B1) | Map | Retention disclosure is processing-record scope (B1) and MAY be referenced from notice versions where required. |
| jurisdiction | 6.3.4.17 | jurisdiction (CIR) | Map | TS jurisdiction is a PII processing field; this profile additionally requires a controller-asserted jurisdiction in CIR for controller-id-first inspection. |
| recipient_third_parties | 6.3.4.18 | (Optional Profile B1) / recipient_jurisdictions | Map / extend | Recipient inventory may be carried in B1; cross-border destinations are disclosed using recipient_jurisdictions when applicable. |
| withdrawal_method | 6.3.4.19 | privacy_access_point (CIR) | Map / refactor | Withdrawal and other rights controls are represented as structured modalities via privacy_access_point and the Appendix A controls disclosure set. |
| privacy_rights | 6.3.4.20 | privacy_access_point (CIR) | Map / refactor | Rights exercise is represented via structured privacy_access_point modalities and the Appendix A controls disclosure set. |
| codes_of_conduct | 6.3.4.21 | code_of_conduct_reference (CIR) | Map | Code-of-conduct reference is carried in the CIR where applicable. |
| impact_assessment | 6.3.4.22 | surveillance_risks (when applicable) | Map / specialize | Profile introduces surveillance_risks as a targeted risk disclosure hook; broader impact assessment remains optional processing-record scope. |
| authority_party | 6.3.4.23 | privacy_access_point (CIR) | Map / refactor | Complaint/appeal access points are represented as privacy_access_point modalities and/or referenced authorities. |
| event_time | 6.3.7.2 | presented_at | Map | Time of disclosure/presentation is recorded in presented_at for notice disclosure events. |
| validity_duration | 6.3.7.3 | (Optional; basis-dependent) | Map | Validity duration MAY be represented for time-bounded authorizations; when used it SHOULD be bound to the applicable lawful basis and scope. |
| entity_id | 6.3.7.4 | controller_identity_record_id | Map / constrain | For controller-issued notice events, the acting entity can be represented by the controller_identity_record_id (CIR reference). |
| event_type | 6.3.7.5 | notice_type | Map / extend | TS event_type supports consent-type examples; this profile uses notice_type to classify notice context and supports Notice Event Log event_type for lifecycle events. |
| event_state | 6.3.7.6 | (Notice Event Log event_type) | Map | Lifecycle state transitions are represented as Notice Event Log entries (notice_issued, notice_material_change, etc.). |
| collection_method | 6.3.4.10 | (Optional Profile B1) | Map | Collection method disclosure is processing-record scope (B1) and MAY be referenced from notice versions where required. |
| processing_method | 6.3.4.11 | technology_in_use | Map / refactor | Where processing methods imply technology-mediated capabilities (e.g., profiling, automated decision), represent them in technology_in_use (Appendix A) and disclose corresponding controls. |
| processing_locations | 6.3.4.14 | (Optional Profile B1) / recipient_jurisdictions | Map / extend | Processing locations may be captured in B1; cross-border destinations are disclosed via recipient_jurisdictions when applicable. |
| geographic_restrictions | 6.3.4.15 | (Optional Profile B1) | Map | Geographic restrictions are processing-record scope (B1) and MAY be referenced from notice versions where required. |
| services | 6.3.4.16 | (Notice Record disclosure set) | Map | Service/business-process labels may be disclosed in the Notice Record to contextualize purposes; keep consistent with notice_version_reference. |
| pii_type | 6.3.5.2 | (Optional Profile B1) | Map | PII category listing is processing-record scope (B1). Where disclosed in notices, it SHOULD be aligned to the same PII categories used in B1 records. |
| pii_attribute_id | 6.3.5.3 | (Optional Profile B1) | Map | Attribute identifiers are an implementation detail within B1 schemas; maintain stable identifiers where possible. |
| pii_optional | 6.3.5.4 | (Optional Profile B1) | Map | Optionality of PII disclosure is captured in B1 inventories and MAY be disclosed in the Notice Record where required for meaningful choice. |
| sensitive_pii_category | 6.3.5.5 | (Optional Profile B1) | Map | Sensitivity classification is processing-record scope (B1) and MAY be disclosed in the Notice Record where required by jurisdiction/sector. |
| special_pii_category | 6.3.5.6 | (Optional Profile B1) | Map | Special-category classification is processing-record scope (B1) and MAY be disclosed in the Notice Record where required by jurisdiction. |
| party_address | 6.3.6.3 | controller_address (CIR) | Map | Controller address may be carried in CIR; for other parties, use TS party identification where B1 requires inventories. |
| party_email | 6.3.6.4 | privacy_access_point (CIR) | Map / refactor | Email is represented as a modality entry in privacy_access_point. |
| party_url | 6.3.6.5 | controller_public_id_uri | Map / specialize | Profile distinguishes a public controller identifier URI (controller_public_id_uri) and may also include general web URLs in CIR extensions. |
| party_phone | 6.3.6.6 | privacy_access_point (CIR) | Map / refactor | Phone is represented as a modality entry in privacy_access_point. |
| party_role | 6.3.6.8 | (CIR scoping) | Constrain | CIR represents the controller role; other roles MAY be represented in B1 party inventories using TS party_role values. |
| party_type | 6.3.6.10 | (Optional CIR extension) | Map | Party type may be carried as an optional CIR extension where useful for accountability classification. |

## A.2 Artefact-to-27560 TS mapping (

| Base extension record | Primary purpose | ISO/IEC TS 27560:2023 anchor | Notes / deltas |
| --- | --- | --- | --- |
| Controller Identification Record (CIR) | Controller accountability anchor (controller-id-first) | Party identification (controller role) | Profiled subset of party fields + required pointers (rights access, event log, publication) |
| Notice Record (versioned) | Machine-readable notice content + version binding | Consent record context (notice/policy content reference) | Adds explicit immutable notice version reference (notice_version_reference) |
| First Notice Receipt | Evidence of disclosure (anonymous-bydefault) | Consent receipt / record header + context | First notice receipt explicitly removes pii_principal_id requirement; receipt is initially versionbound |
| Notice Event Log | Lifecycle and material change events | Event / lifecycle elements (event log / change record) | Adds minimum event type expectations + tiering note |

## A.3 CIR mapping

| CIR field (base extension) | TS 27560:2023 anchor (exact) | Change type | Notes |
| --- | --- | --- | --- |
| controller_public_id_uri | TBD (Party identification fields) | Constrained | Public resolvable controller identifier (URI form); profiled as required |
| controller_name | TBD (Party name fields) | Constrained | Controller legal name; profiled as required |
| jurisdiction | 6.3.4.17 jurisdiction (PII processing) | New | Controller-asserted applicable jurisdiction (or pointer). Closest TS anchor is the PII processing jurisdiction field. |
| privacy_access_point | TBD (Contact / rights contact fields) | Constrained | Structured modalities (web/email/phone/etc.); profiled as required and structured |
| notice_event_log_url | TBD (Event / lifecycle reference) | New | Pointer to append-only lifecycle spine |

## A.4 Notice Receipt mapping

| Notice Receipt field (base extension) | 27560:2023 anchor | Notes |
| --- | --- | --- |
| schema_version | schema_version | Required in TS receipt metadata; required in this profile’s receipt header. |
| receipt_id | Record identifier | Receipt instance identifier |
| first_notice_receipt (indicator) | N/A | New indicator field to classify a receipt instance as the First Notice Receipt. |
| first_notice_receipt_id (reference) | N/A | New linkage field; subsequent receipts reference the applicable First Notice Receipt. |
| notice_id | Notice/receipt linkage | Stable notice family identifier |
| notice_version_reference | Notice reference | Immutable reference to disclosed notice version |
| controller_identity_record_id | Party identification | Links receipt to CIR |
| presented_at (event_time) | Event / record time | Time of disclosure/presentation |
| notice_type | Context | Notification/disclosure/policy/signal (vocabulary defined by the extension) |
| account_id (optional) | pii_principal_id | Profile replaces TS-required pii_principal_id with optional account_id for relationship context (pseudonymous where applicable). |

## A.5 Notice Event Log mapping

| Event Log element (base extension) | 27560:2023 anchor | Notes |
| --- | --- | --- |
| notice_issued | Event type | Stage 1 disclosure issuance event |
| notice_material_change | Event type | Material change triggers new notice version and new receipt issuance |
| tiering note | Conformance guidance | Allows assurance-tiered event-log requirements with explicit tier declaration |

## Annex B - Optional profile extensions

This annex defines two optional profile extensions that build on ISO/IEC TS 27560:2023 while preserving the base extension’s reference integrity and “reciprocal and proportionate” transparency requirements.

### B.0 Extension discipline

Any record created under the optional profiles in this annex:

- SHALL preserve base identifiers and version binding (notice_id + notice_version_reference).
- SHALL NOT redefine Stage 1 (first) notice/receipt semantics.
- SHALL reference the Controller Identification Record (CIR) via controller_identity_record_id.

### B.1 Optional Profile B1 — PII Processing Record structure (controller/processor governance)

**Purpose:** Add a RoPA-aligned, controller/processor-side processing record structure that is traceable to the disclosed notice version(s).

#### B.1.1 Minimum conformance requirements (normative)

A conforming B1 processing record:

- SHALL include a unique processing_record_id.
- SHALL include controller_identity_record_id (CIR reference).
- SHALL include notice_id + notice_version_reference for every disclosed processing fact relied upon.
- SHALL include lawful_basis and SHALL use the Annex C vocabulary.
- SHOULD reference Notice Event Log entries where material change, withdrawal/objection, or scope escalation is relevant.

#### B.1.2 How to extend ISO/IEC TS 27560:2023 with B1

Use TS 27560:2023 as the baseline for:

- party identification (controller role) — profile it into CIR and reference it by controller_identity_record_id;
- event_time semantics — align record creation/update events with the Notice Event Log;
- processing purposes + recipients + retention — reuse TS-style field naming where practical, but ensure each processing claim is bound to notice_version_reference.

### B.2 Optional Profile B2 — Personal Processing Record structure (individual-held)

**Purpose:** Add an individual-held, data-minimizing personal evidence record that is portable and supports rights exercise.

#### B.2.1 Minimum conformance requirements (normative)

A conforming B2 personal record:

- SHALL include a unique personal_record_id.
- SHALL include notice_id + notice_version_reference (the evidence spine).
- SHALL include controller_identity_record_id (CIR reference).
- SHALL include privacy_access_point (or a reference to it via CIR) sufficient to exercise rights.
- SHALL support anonymous or pseudonymous operation by default.
- MAY include receipt_id as a pointer to a specific receipt instance; when present it SHOULD be accompanied by notice_version_reference.

#### B.2.2 How to extend ISO/IEC TS 27560:2023 with B2 Personal processing record

Treat the TS receipt as the exchange artefact and the B2 record as the individual-held “wallet architecture”:

- Keep B2 minimal (references first; no replication of full processing inventories).
- When B2 stores additional details, they SHOULD be derived from the TS receipt fields (or TS-compatible receipt extensions) and remain unlinkable unless the individual chooses otherwise.

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
| legitimate_interest | Processing necessary for legitimate interests balanced against the individual’s rights | Right to object; access; explanation; complaint/appeal pathways | Document balancing/necessity; provide objection mechanism; apply safeguards and minimization | Header SHALL assert legitimate interest and provide a pointer to the balancing rationale or summary |
| vital_interest | Processing necessary to protect vital interests | Access and explanation after the fact (where applicable) | Document emergency necessity; limit scope and duration; later notice and accountability | Header SHALL assert vital interest and record emergency context constraints |
| public_interest | Processing necessary for a task carried out in the public interest or under official authority | Access; explanation; objection/appeal pathways as applicable | Identify authority; define task scope; apply proportionality; enable oversight mechanisms | Header SHALL assert public interest and provide authority/task reference or pointer |

## Annex D - Use of the receipt in a four-stage exchange (informative)

This annex describes a staged exchange pattern (commonly referred to as an ANCR-style exchange) in which a Notice Receipt is used as the **evidence architecture** across multiple stages. This annex is informative; it does not define protocol mechanics.

### D.1 Stage 1 — Anchored Notice Receipt (notice disclosure proof)

Purpose: establish bilateral evidence that a specific notice version was disclosed/presented, suitable for dispute resolution and (when the lawful basis is consent) valid legal consent proof-of-notice.

Minimum binding identifiers:

- `receipt_id`
- `notice_id`
- `notice_version_reference`
- `controller_identity_record_id`
- `presented_at`

Optional linkage fields:

- `anchored_notice_receipt` (true)

### D.2 Stage 2 — Authorization receipt (basis-dependent)

Purpose: express an authorization state (e.g., consent, contract acknowledgement, legal obligation acknowledgement) that is **explicitly linked** to the Stage 1 Anchored Notice Receipt.

Interoperability rule: a Stage 2 receipt SHOULD reference the Stage 1 Anchored Notice Receipt using `anchored_notice_receipt_id` (or by reusing `receipt_id` where a single receipt instance is updated in-place by the implementation).

### D.3 Stage 3 — Micro credential (protocol-facing)

Purpose: represent Stage 2 authorization as a credential or signed assertion suitable for protocol enforcement (e.g., API/device authorization) without resharing full receipt content.

Interoperability rule: any Stage 3 credential SHOULD carry (or be derivable from) the binding identifiers of Stage 1 (`controller_identity_record_id` + `notice_version_reference` + `receipt_id`) to prevent ambiguity and replay across relying parties.

### D.4 Stage 4 — Portable token (portability)

Purpose: enable portability and re-use of authorization state across controllers and jurisdictions, subject to scope limits and revocation/withdrawal controls.

Interoperability rule: any Stage 4 token SHOULD be traceable to Stage 1 via the binding identifiers and SHOULD include (or reference) a status pointer that enables relying parties to verify whether the Stage 1 notice version and the Stage 2 authorization remain active.

### D.5 Lifecycle and invalidation

Where staged exchanges are used, implementations SHOULD record lifecycle events (issuance, material change, withdrawal/objection, expiry, supersession) in the Notice Event Log so that credentials/tokens derived in Stages 3–4 can be invalidated or superseded when the underlying notice or authorization state changes.

##
