# ANCR DPV Model Extension

**Convention 108+ legal model, with an AI transparency profile**

**External review draft**

**Author and editor:** Mark Lizar
**Version:** 0.3 draft
**Date:** 30 August 2026
**Review context:** Prepared for technical review in relation to the ANCR Working Group at Kantara Initiative. This attribution does not imply endorsement, adoption, or authorship by Kantara Initiative, the ANCR Working Group, the W3C Data Privacy Vocabularies and Controls Community Group, the Council of Europe, ISO, or IEC.

## Abstract

This document proposes a DPV style model for representing selected requirements of the modernised Convention 108 in machine readable notice and consent records. It also defines evidence based acceptance criteria for digital and open network contexts, and an AI transparency profile that extends the same model to automated processing and model training contexts.

The proposal distinguishes three concepts:

- **Consent:** an individual's freely given, specific, informed, and unambiguous authorization where consent is the applicable legal basis.
- **Permission:** a technical control enforced by a system after the applicable authority has been established.
- **Identification:** information or processes used to distinguish or recognize a party. Identification is not consent or permission.

The proposed model supports three related artefacts: a machine readable notice or consent receipt, a resolvable Controller Identification Record (CIR), and a transparency code of practice. Together, these artefacts are intended to make the accountable party, purpose, legal basis, recipients, rights mechanisms, and record state inspectable.

The record structure for those artefacts is specified in the ANCR Extension for ISO/IEC TS 27560:2023. This document does not restate it, and does not mint vocabulary terms for fields that document already defines.

## 1 Scope and status

This document:

1. provides a traceable modelling structure based on the modernised Convention 108;
2. uses established DPV terms where suitable and labels every proposed term;
3. defines testable acceptance criteria for evidence carried in notice and consent records;
4. describes alignment with ISO/IEC TS 27560:2023, the ANCR extension, and related standards; and
5. states an AI transparency profile, clause 7 items I3, I5, I6, and I16, anchored to the EU AI Act and to ISO/IEC 22989 rather than to Convention 108+.

### 1.1 Status

This document is an independent draft. It is not an official Council of Europe text, W3C DPVCG deliverable, Kantara Initiative recommendation, or ISO/IEC publication. It does not replace DPV specifications or the published DPV guidance for ISO/IEC TS 27560:2023. References to standards and community specifications indicate alignment only.

The Convention 108+ article references identify relevant source provisions. Proposed technical requirements that go beyond the treaty text are identified as implementation requirements, not treaty obligations. Items anchored to the EU AI Act or to ISO/IEC 22989 are identified as such and are not attributed to Convention 108+.

**Relationship to the ANCR extension.** The ANCR Extension for ISO/IEC TS 27560:2023 governs the record structure: the Controller Identification Record field set, the Notice Record, the Notice Version Object, the Notice Receipt, and the Notice Event Log. This document governs the vocabulary mapping and the legal model. Where the two diverge, the ANCR extension governs the record structure and this document is corrected.

### 1.2 Verbal forms

The verbal forms used in this document are those defined in the ISO/IEC Directives, Part 2, and are written in lower case. A requirement is expressed by "shall" and "shall not". A recommendation is expressed by "should" and "should not". Permission is expressed by "may". Possibility and capability are expressed by "can".

NOTE: This document does not use "must" to express a requirement. Requirements stated here are proposals of this draft and are not obligations of Convention 108+, DPV, the EU AI Act, or ISO/IEC text unless the anchor column identifies them as such.

## 2 Proposed namespace

Proposed namespace and prefix for the Convention 108+ legal model extension:

```text
conv108: https://kantarainitiative.github.io/ancr-wg/ns/conv108plus#
```

**Intended migration destination.** Should the DPVCG accept these terms, the intended target IRI is `https://w3id.org/dpv/legal/int/conv108plus#`, with `conv108plus` used in the path because a literal plus sign can be re-encoded by intermediaries. The short prefix remains `conv108` in either case.

NOTE: The DPV IRI space is controlled by W3C and the DPVCG. Terms proposed by this document are published under an ANCR controlled base until the group has considered them, so that a draft proposal is not mistaken for a registered DPV namespace.

### 2.1 Companion namespaces reused

This extension reuses core DPV and its modules rather than duplicating terms.

| Prefix | Namespace | Reused for |
| --- | --- | --- |
| dpv | https://w3id.org/dpv# | controller, purpose, personal data, legal basis, rights, timing |
| pd | https://w3id.org/dpv/pd# | personal data categories |
| loc | https://w3id.org/dpv/loc# | processing and destination locations |
| tech | https://w3id.org/dpv/tech# | technical and processing detail |
| dct | http://purl.org/dc/terms/ | title, description, issued, modified |
| dcat | http://www.w3.org/ns/dcat# | version |
| ancr | ANCR extension, alignment reference | receipt and record structure, Notice Version Object, notice event object |

New terms are proposed only where an existing DPV term does not express the required concept, and never where the ANCR extension already defines a field.

## 3 Convention 108+ legal model

### 3.1 Legitimacy and purpose compatibility

Article 5.2 provides for processing based on the individual's free, specific, informed, and unambiguous consent or another legitimate basis laid down by law. Article 5.4(b) separately requires explicit, specified, and legitimate purposes and prohibits incompatible further processing, subject to the stated exceptions and safeguards.

The model therefore keeps legal basis and purpose compatibility separate. Article 5.4(b) addresses whether further processing is compatible with the original purpose. It does not itself supply a legal basis.

| Proposed term | DPV relationship | Convention 108+ anchor | Meaning |
| --- | --- | --- | --- |
| conv108:ConsentBasis | Specialization of dpv:Consent | Article 5.2 | Consent used as the legal basis for a specified purpose |
| conv108:OtherLegitimateBasisUnderLaw | Specialization of dpv:LegalBasis | Article 5.2 | Another legitimate basis established by applicable law |
| conv108:CompatibleFurtherProcessing | Proposed processing condition, not a legal basis | Article 5.4(b) | A recorded determination that further processing is compatible with the original purpose |

This proposal does not create Convention 108+ legal bases for legal obligation, legitimate interests, accountability, or transborder safeguards. Any more specific legal basis is established under the applicable law. Article 8 transparency and Article 14 transborder safeguards are represented as requirements, not legal bases.

### 3.2 Online and offline consent constructions

Where consent is the legal basis, this document adopts the distinction stated in the ANCR extension at 3.20 and 7.2.2.

- **Online consent** is expressed online, where notice, choice, action, and the resulting evidence are represented by machine readable records of the interaction. Identification, notice version, and time are recorded rather than assumed, and the resulting record is bilateral.
- **Offline consent presented through an online interface** is a construction in which the identity and the location of the individual are assumed rather than recorded. It is a controller held compliance artefact, captured in a private record of processing activities and not accessible by default, and it is governed by the applicable data protection regulation.

The two constructions shall be named distinctly in a record, shall not be exchanged or reported as equivalent, and an offline consent record shall not be referenced as evidence of online consent. Where `conv108:ConsentBasis` is asserted, the record shall state which construction is in use.

NOTE: This distinction is the test behind I11 in clause 7. Dual custody is not a matter of good practice. It is what separates a recorded authorization from an assumed one.

## 4 Principles, rights, and transparency requirements

### 4.1 Principles

Convention 108+ principles expressed as `conv108:` classes for reference by a record. These are modelling handles for the articles, not new obligations.

| Proposed term | Convention 108+ anchor | Principle |
| --- | --- | --- |
| conv108:LawfulnessPrinciple | Article 5.1 to 5.3 | Lawful and proportionate processing that reflects a fair balance of interests, rights, and freedoms |
| conv108:PurposeSpecificationPrinciple | Article 5.4(b) | Explicit, specified, and legitimate purposes; no incompatible further processing |
| conv108:DataMinimisationPrinciple | Article 5.4(c) | Adequate, relevant, and not excessive |
| conv108:TransparencyRequirement | Article 8 | Required information about the controller and intended processing |
| conv108:TransborderProtectionRequirement | Article 14 | Appropriate protection for transborder data flows |

### 4.2 Rights

Rights are expressed through `dpv:hasRight` with `conv108:` subclasses of `dpv:DataSubjectRight`, each anchored to Article 9.

| Proposed term | Convention 108+ anchor | Right |
| --- | --- | --- |
| conv108:RightOfAccess | Article 9.1(b) | Confirmation of processing, communication of personal data in an intelligible form, and available information concerning origin, preservation period, and other required details |
| conv108:RightAgainstSolelyAutomatedDecision | Article 9.1(a) | Not to be subject to a decision significantly affecting the individual when based solely on automated processing, without the individual's views being taken into consideration |
| conv108:RightToKnowAutomatedReasoning | Article 9.1(c) | To obtain knowledge of the reasoning underlying relevant automated processing results |
| conv108:RightToObject | Article 9.1(d) | To object on grounds relating to the individual's situation, subject to the conditions in the Convention |
| conv108:RightToRectificationOrErasure | Article 9.1(e) | To obtain rectification or erasure where processing does not comply with the Convention |

A consent withdrawal route is modelled as a consent lifecycle requirement aligned with ISO/IEC TS 27560:2023 and with the Notice Event Log in the ANCR extension. Article 5.2 requires consent to be free, which supports a withdrawal route, and this document does not attribute withdrawal to an express Article 9 right.

### 4.3 Transparency requirements

Transparency requirements express what is inspectable, and when, using DPV timing terms `dpv:isBefore` and `dpv:isDuring` relative to `dpv:Collect`.

| Proposed term | Source | Requirement |
| --- | --- | --- |
| conv108:TransparencyInformation | Convention 108+ Article 8 | Controller identity and establishment, legal basis, purposes, personal data categories, recipients, rights mechanisms, and any additional information needed for fair and transparent processing |
| conv108:TransparencyBeforeCollection | Implementation requirement, transparency by default | Required transparency information is resolvable before the first collection event |
| conv108:TransborderTransparency | Convention 108+ Article 14 plus implementation requirement | Destination and applicable safeguard information are resolvable before transfer |
| conv108:AutomatedProcessingTransparency | Convention 108+ Article 9.1(a) and 9.1(c) plus implementation requirement | Relevant automated decision scope and reasoning information are available in time for the individual to exercise applicable rights |
| conv108:DualHeldRecordRequirement | ISO/IEC TS 27560 and ANCR alignment | A record of what was presented is available to the individual as well as the controller, in the online construction described in 3.2 |

The timing and dual custody requirements are technical design requirements. They are not presented as verbatim Convention 108+ obligations.

## 5 The Controller Identification Record: accountability expressed

The CIR is the artefact through which the controller information required by Article 8 is made resolvable before the individual is asked to identify themselves.

**Normative source.** The CIR field set is specified in clause 7.1.1 and 7.1.2 of the ANCR extension. This document does not restate or vary it. The table below gives the DPV expression of those fields, and states four additions proposed by this document.

| ANCR CIR field | DPV or conv108 expression | Anchor | Status |
| --- | --- | --- | --- |
| controller_identification_record_id | dpv:hasDataController plus dpv:hasIdentifier, for example did:web | Article 8; I1 | Specified in ANCR 7.1.1 |
| controller_public_id_uri | dpv:hasDataController plus dpv:hasIdentifier | Article 8; I1 | Specified in ANCR 7.1.1 |
| controller_name | dpv:hasName on the controller | Article 8 | Specified in ANCR 7.1.1 |
| jurisdiction | dpv:hasJurisdiction | Article 8, Article 14 | Specified in ANCR 7.1.1 |
| privacy_access_point | dpv:hasContact, structured modalities; carries the non-exclusion condition in ANCR 7.1.3 | Article 9; I10 | Specified in ANCR 7.1.1 |
| notice_event_log_url | ancr alignment reference, lifecycle record pointer | Article 8; I11 | Specified in ANCR 7.1.1 |
| code_of_conduct | dpv:hasPolicy or a code of conduct reference | Article 8 | Specified in ANCR 7.1.1 |
| derogation_reference | conv108:hasDerogationReference, alignment to ANCR derogation_reference | lawful withholding | Specified in ANCR 7.1.1 |
| Lawful basis per purpose | dpv:hasLegalBasis to conv108 classes | Article 5.2; I2 | Reused DPV |
| Purposes, including any model training purpose | dpv:hasPurpose plus conv108:CompatibleFurtherProcessing where applicable | Article 5.4(b); I3, I4 | Reused DPV plus proposed condition |
| Processing and destination locations | dpv:hasLocation, loc: | Article 14; I8 | Reused DPV |
| Transborder safeguard | conv108:hasTransborderSafeguard | Article 14; I8 | Proposed addition |
| Issuing authority and registry identifier | conv108:hasIssuingAuthority, conv108:hasRegistryIdentifier | registry; I14 | Proposed addition |
| Active validity state | conv108:hasActiveState, expressing record_validity in the ANCR Authorization State Object | ANCR 7.2.5; I15 | Specified in ANCR 7.2.5, expressed here |
| Assurance status, self asserted or registry verified | conv108:hasAssuranceStatus | registry | Proposed addition |

A CIR may be self asserted or registry verified. The record shall state its assurance status. A registry verified CIR may include evidence of domain control, legal entity verification, issuing authority, jurisdiction, and registry identifier. These are proposed assurance features of this document, not requirements stated in Convention 108+.

NOTE: The four proposed additions are candidates for a later revision of the ANCR extension. Until they are adopted there, an implementation carrying them is carrying extension fields, and its CIR remains conforming only on the ANCR 7.1.1 field set.

## 6 New and existing terms in the legal model layer

Existing means already in DPV or a DPV module. Proposed means introduced by this document as a design layer, not adopted standard text.

| Term | Status |
| --- | --- |
| dpv:hasLegalBasis, dpv:Consent, dpv:hasPurpose, dpv:hasPersonalData, dpv:hasLocation, dpv:hasRight, dpv:DataSubjectRight, dpv:hasDataController, dpv:hasIdentifier, dpv:hasContact, dpv:isBefore, dpv:Collect, dcat:version, dct:issued, dct:modified | Existing DPV, reused and not redefined |
| conv108:ConsentBasis, conv108:OtherLegitimateBasisUnderLaw | Proposed, Article 5.2 aligned legal basis classes |
| conv108:CompatibleFurtherProcessing | Proposed, Article 5.4(b) aligned processing condition, not a legal basis |
| conv108:LawfulnessPrinciple, PurposeSpecificationPrinciple, DataMinimisationPrinciple, TransparencyRequirement, TransborderProtectionRequirement | Proposed, modelling handles for Articles 5, 8, and 14 |
| conv108:RightOfAccess, RightAgainstSolelyAutomatedDecision, RightToKnowAutomatedReasoning, RightToObject, RightToRectificationOrErasure | Proposed, modelling handles for Article 9 |
| conv108:TransparencyBeforeCollection, TransborderTransparency, AutomatedProcessingTransparency, DualHeldRecordRequirement | Proposed, transparency timing and custody requirements |
| conv108:hasTransborderSafeguard, hasRightsAccessReference, hasIssuingAuthority, hasRegistryIdentifier, hasAssuranceStatus, hasDerogationReference | Proposed, CIR and registry properties |
| conv108:hasAuthorizationState, conv108:hasActiveState | Expression only, mapping purpose_state and record_validity in the ANCR Authorization State Object, ANCR 7.2.5; no independent state model is proposed here |
| conv108:ChainOfNotice, hasNoticeParticipant, hasParticipantScope, hasLifecycleRole | Proposed, chain of notice, I16 |
| conv108:hasTrainingDataProvenance, hasRightsReservationStatus | Proposed, AI transparency profile, I5 and I6 |

**No duplicate terms for ANCR fields.** No `conv108:` term is minted for the notice version reference, the notice integrity hash, the notice publication time, or the receipt identifier. These reuse the ANCR field names `notice_id`, `notice_version_reference`, `notice_hash`, `published_at`, and `receipt_id`, and are mapped in 7.2. The earlier candidates `conv108:hasNoticeVersionHash` and `conv108:hasReceiptIdentifier` are retired. No `conv108:` term is minted for authorization state either. `purpose_state` and `record_validity` are specified in the ANCR Authorization State Object at 7.2.5, and this document supplies only their expression, mapped in 7.2.

## 7 Proposed information set for dynamic data and AI systems

The I1 to I16 set is a proposed implementation profile. It combines treaty anchored information, standards aligned record fields, and new technical requirements. It is not a requirement of Convention 108+, DPV, the EU AI Act, or ISO/IEC TS 27560 as a whole.

| I# | Required information | DPV style expression | Existing or new | Anchor |
| --- | --- | --- | --- | --- |
| I1 | Accountable party identity, resolvable before collection | dpv:hasDataController plus dpv:hasIdentifier; conv108:TransparencyBeforeCollection | Existing DPV plus new timing requirement | Convention 108+ Article 8; CIR |
| I2 | Legal basis for each purpose | dpv:hasLegalBasis to conv108:ConsentBasis or conv108:OtherLegitimateBasisUnderLaw | Existing base plus proposed specialization | Convention 108+ Article 5.2 |
| I3 | Legal basis and compatibility assessment for model training as further processing | dpv:hasLegalBasis plus conv108:CompatibleFurtherProcessing | Existing base plus proposed condition | Convention 108+ Article 5.2 and 5.4(b) |
| I4 | Purposes, including training as a named secondary purpose | dpv:hasPurpose plus dct:title and dct:description | Existing DPV | Convention 108+ Article 5; AI Act Article 53 |
| I5 | Training data provenance and sources | conv108:hasTrainingDataProvenance | New, AI profile | AI Act Article 53(1)(d) |
| I6 | Copyright and machine actionable rights reservation status | conv108:hasRightsReservationStatus | New, AI profile | AI Act Article 53(1)(c); Directive 2019/790 Article 4(3) |
| I7 | Personal data categories in training data | dpv:hasPersonalData, pd: categories | Existing DPV | Convention 108+ Articles 5 and 6 |
| I8 | Processing and disclosure locations, destination jurisdictions | dpv:hasLocation, loc:, plus conv108:hasTransborderSafeguard | Existing base plus proposed property | Convention 108+ Article 14 |
| I9 | Automated decision scope and relevant reasoning information | conv108:AutomatedProcessingTransparency; conv108:RightAgainstSolelyAutomatedDecision; conv108:RightToKnowAutomatedReasoning | Proposed | Convention 108+ Article 9.1(a) and 9.1(c) |
| I10 | Applicable rights mechanisms and, where consent is used, a consent lifecycle route | dpv:hasRight plus conv108:hasRightsAccessReference | Existing base plus proposed property | Convention 108+ Article 9; ISO/IEC TS 27560 lifecycle alignment |
| I11 | Machine readable record of I1 to I10, held by at least two parties | conv108:DualHeldRecordRequirement; ancr Notice Receipt, alignment | New plus ANCR alignment | ISO/IEC TS 27560 and ANCR; see 3.2 |
| I12 | Notice version identity, integrity, and publication time | ancr notice_id, notice_version_reference resolving to a Notice Version Object carrying notice_hash and published_at | Reused from ANCR, mapped and not minted | ANCR clause 7.2.4 |
| I13 | Receipt identifier carried with a training contribution | ancr receipt_id | Reused from ANCR, mapped and not minted | ANCR extension |
| I14 | Issuing authority and jurisdiction scoped registry identifier | conv108:hasIssuingAuthority plus conv108:hasRegistryIdentifier | New | CIR and registry |
| I15 | Authorization state per purpose, and live record validity, valid, invalid, or suspended, evaluable at a stated time | ancr Authorization State Object; conv108:hasAuthorizationState expressing purpose_state, conv108:hasActiveState expressing record_validity | Reused from ANCR, mapped and not minted | ANCR clause 7.2.5 |
| I16 | Per participant notice through the chain, bound to ISO/IEC 22989 AI lifecycle roles | conv108:ChainOfNotice, conv108:hasNoticeParticipant typed by conv108:hasLifecycleRole, conv108:hasParticipantScope | New, AI profile | Chain of notice; ISO/IEC 22989 roles |

**AI transparency profile.** I3, I5, I6, and I16 are anchored to the EU AI Act and to ISO/IEC 22989, not to Convention 108+. An implementation operating outside those instruments can conform to I1, I2, I4, I7 to I15 without them.

### 7.1 Additional implementation requirements, I11 to I16

I11 to I16 are proposed design requirements. They are not attributed to Convention 108+, DPV, the EU AI Act, or adopted ISO text unless a specific field is identified as reused from another source.

- **I11, conv108:DualHeldRecordRequirement.** The record of I1 to I10 is machine readable and held by at least two parties, so the affected person can produce it, not only the provider. Custody is what distinguishes the online construction from an offline construction presented online, see 3.2. Where only the controller holds the record, the record is an offline consent artefact and shall be named as one.
- **I12, notice version identity and integrity.** The notice is a first class object with a stable family identifier and an immutable version reference. "What was presented at time T" has an answer that does not depend on the presenting party's goodwill or retention practice. The ANCR extension defines this as a Notice Version Object carrying `notice_url`, `notice_version_id`, `notice_hash`, and `published_at`, resolved through `notice_version_reference`, with `notice_id` supplying the stable notice family identifier. This document reuses those field names and mints no duplicate property.
- **I13, receipt identifier.** A receipt identifier carried with a training contribution converts a consent claim into an artefact that is validatable before training and revisitable on withdrawal. The ANCR extension defines `receipt_id`, the base ISO/IEC TS 27560 `record_id` field renamed for receipt instance tracking. This document reuses it.
- **I14, conv108:hasRegistryIdentifier.** A jurisdiction scoped identifier issued after registry verification, so that a receipt issued under one authority can be evaluated against the authority claimed in another.
- **I15, authorization state and live validity.** State is evaluable at a stated time, because a receipt issued last month cannot represent an authorization or a risk posture that changed last week. The ANCR extension specifies this as one Authorization State Object at 3.25 and 7.2.5, carrying `purpose_state` per disclosed purpose, from the vocabulary not_given, given, altered, restricted, objected, withdrawn, expired, and `record_validity` from valid, invalid, suspended, with each change appended and logged against the same `notice_id` and `notice_version_reference`. This document expresses those values through `conv108:hasAuthorizationState` and `conv108:hasActiveState`, and mints no state property of its own.
- **I16, conv108:ChainOfNotice.** Notice per participant through the AI lifecycle, each notice bound to the participant that issued it and to the notice version it issued, and tested by the next participant before that participant relies on it. Each `conv108:hasNoticeParticipant` is typed by `conv108:hasLifecycleRole` naming the ISO/IEC 22989 role it acts in, so that who issued a notice, in which lifecycle role, at which version, is answerable from the record.

### 7.2 ANCR field mapping for I12, I13, and I15

I12, I13, and I15 are carried by existing ANCR field names rather than fresh `conv108:` properties. This document supplies only the mapping.

| This document's need | ANCR field reused | ANCR definition, source | I# |
| --- | --- | --- | --- |
| Stable notice family identifier | notice_id | Stable notice family identifier, stable across notice versions, ANCR 7.3.2 | I12 |
| Immutable notice version reference | notice_version_reference | Immutable reference to the disclosed notice version, resolving to the applicable Notice Version Object, ANCR 3.6 and 7.2.4 | I12 |
| Notice content integrity | notice_hash, in the Notice Version Object | Integrity hash of the notice content as published, SHA-256 or an equivalent or stronger algorithm, ANCR 7.2.4 | I12 |
| Notice publication time | published_at, in the Notice Version Object | Time at which that notice version was published, ANCR 7.2.4 | I12 |
| Verification of a disclosure claim | ANCR 7.2.4 verification procedure | Retrieve by notice_url, compute the hash, compare with notice_hash, verify any signature or notary proof over the same inputs | I12 |
| Receipt identifier for a contribution | receipt_id | Base ISO/IEC TS 27560 record_id renamed for receipt instance tracking, ANCR 7.3.2 | I13 |
| Authorization state per disclosed purpose | purpose_state, in the Authorization State Object | Per purpose state from not_given, given, altered, restricted, objected, withdrawn, expired, each with the lawful basis relied upon and a state time, ANCR 7.2.5 | I15 |
| Live validity of the record carrying the state | record_validity, in the Authorization State Object | valid, invalid, or suspended, with derogation_reference where suspension is lawful, ANCR 7.2.5 | I15 |
| State at a stated past time | ANCR 7.2.5 reconstruction procedure, with authorization_state_changed and record_validity_changed in the Notice Event Log | Append only state instances ordered by supersedes, cross checked against the event log and bound to the notice version the state was formed against, ANCR 7.2.5 and 7.4.1 | I15 |

### 7.3 Chain of notice, ISO/IEC 22989 role binding

Chain participants are bound to ISO/IEC 22989:2022 AI stakeholder and lifecycle roles. Each role's notice is bound to the party acting in that role and to the notice version it issued, and each downstream role tests the upstream notice before relying on it.

| Chain stage | ISO/IEC 22989 role, alignment reference | Notice binding | Tested by |
| --- | --- | --- | --- |
| Design | AI producer, acting in a design function | Notice bound to the designing party and notice version | Developing party |
| Develop | AI producer, acting in a development function | Notice bound to the developing party and notice version | Training or production party |
| Train or produce | AI producer, training and model production | Notice bound to the producing party and notice version, including training as an Article 5.4(b) secondary purpose, see I3 | AI operator or deployer |
| Deploy or operate | AI operator, toward the AI customer and AI user | Notice bound to the operating party and notice version | AI customer or AI subject, as relying party |

NOTE 1: The four stage decomposition is this document's interpretation, not a structure stated in ISO/IEC 22989. ISO/IEC 22989 groups design, development, and model production functions within the AI producer and AI provider roles. The finer stages are preserved here so that each notice issuance point stays individually testable.

NOTE 2: `conv108:hasLifecycleRole` carries the role value. The 22989 labels are used as alignment references to name the participant's lifecycle role, not as adopted `conv108:` terms.

Where a deployment does not distinguish a design function from a development function, the stages may be merged. Any merge shall be explicit in the record and shall not be backfilled silently, see AC-SEQ-2.

## 8 Evidence based acceptance criteria

Each criterion is a testable condition on a record or receipt. Detailed test procedures may be maintained separately and referenced by criterion identifier.

### 8.1 Sequence integrity

- **AC-SEQ-1.** The CIR or accountable party record is resolvable at a timestamp before the first collection event. Evidence: the notice event or receipt timestamp precedes the first processing timestamp. This is a transparency by default implementation requirement aligned with the information listed in Article 8.
- **AC-SEQ-2.** Where a chain of notice is claimed, each participant is typed by its ISO/IEC 22989 lifecycle role through `conv108:hasLifecycleRole`, each notice is bound to the issuing party and notice version, and each participant's notice timestamp precedes the next participant's build or test event. Ordering is verifiable, the next role in the chain has tested the upstream notice, and any stage merge is explicit in the record. (I16)

### 8.2 Notice binding

- **AC-BIND-1.** The record carries `notice_version_reference` bound to the stable notice family `notice_id`, and that reference resolves to a Notice Version Object. The notice is retrieved using `notice_url`, its hash is computed using the stated algorithm, and the computed value equals `notice_hash`. Where the values differ, the notice version is unverified and the record shall not be relied upon as evidence of the content disclosed. Where resolution is not available to the relying party, `notice_version_reference` carries `notice_version_id` and `notice_hash` directly. (I12; ANCR 7.2.4)
- **AC-BIND-2.** The legal basis for each purpose, and any applicable further processing compatibility assessment, are bound to the versioned notice. The record identifies the basis relied on, the purpose, and the relevant time. (I2 and I3; Article 5.2 and 5.4(b))
- **AC-BIND-3.** The Notice Version Object carries `published_at`, and the publication time precedes the disclosure time recorded in the receipt. (I12; ANCR 7.2.4)

### 8.3 Receipt availability and custody

- **AC-RCPT-1.** A receipt exists and is held by the individual, or by an agent acting for them, and not only by the controller. (I11; conv108:DualHeldRecordRequirement)
- **AC-RCPT-2.** The receipt carries a receipt identifier, ANCR `receipt_id`, that can be carried with a training contribution and re-resolved on withdrawal. (I13)
- **AC-RCPT-3.** Where `conv108:ConsentBasis` is asserted, the record states whether the construction is online consent or offline consent presented through an online interface, and the two are not reported as equivalent. A record that is held only by the controller is not reported as online consent. (3.2; ANCR 7.2.2)

### 8.4 Recipient transparency

- **AC-RECIP-1.** Processing and destination locations, `dpv:hasLocation`, and for transborder flows the Article 14 safeguard, `conv108:hasTransborderSafeguard`, are resolvable in advance of the transfer. (I8; conv108:TransborderTransparency)
- **AC-RECIP-2.** Automated decision and inference scope, `conv108:AutomatedProcessingTransparency`, is disclosed before processing, so that the Article 9.1(c) right is meaningful. (I9)

### 8.5 Identifier governance

- **AC-ID-1.** The controller identifier resolves to an issuing authority, `conv108:hasIssuingAuthority`, and where verified, to a jurisdiction scoped registry identifier, `conv108:hasRegistryIdentifier`. A self asserted CIR is distinguishable from a registry verified one through `conv108:hasAssuranceStatus`. (I14; Article 8 and registry)
- **AC-ID-2.** An Authorization State Object exists for the processing context, its `record_validity`, expressed as `conv108:hasActiveState`, is evaluable as valid, invalid, or suspended, and an expired or suspended state is detectable at the point of reliance. (I15; ANCR 7.2.5)
- **AC-ID-3.** The state applying at a stated past time is reconstructable using the procedure in ANCR 7.2.5: state instances are ordered by `supersedes`, cross checked against the `authorization_state_changed` and `record_validity_changed` entries in the Notice Event Log, and evaluated against the notice version the state was formed against. A record that carries only a current state value, with no history, does not satisfy this criterion. (I15; ANCR 7.2.5 and 7.4.1)

### 8.6 AI transparency profile

- **AC-AI-1.** Where model training is claimed as further processing, the record carries the purpose as a named secondary purpose and a recorded compatibility determination, `conv108:CompatibleFurtherProcessing`, bound to the notice version in effect. (I3 and I4)
- **AC-AI-2.** Training data provenance, `conv108:hasTrainingDataProvenance`, and rights reservation status, `conv108:hasRightsReservationStatus`, are recorded and resolvable, and the rights reservation status is machine actionable. (I5 and I6; AI Act Article 53(1)(c) and (d))
- **AC-AI-3.** Personal data categories present in training data are recorded using `dpv:hasPersonalData` with `pd:` categories, and are bound to the notice version relied upon for the training purpose. (I7)

### 8.7 Rights and lifecycle routes

- **AC-RIGHTS-1.** Each applicable right in 4.2 resolves to at least one access modality through `conv108:hasRightsAccessReference` or the ANCR `privacy_access_point`, and at least one modality is operable without the individual holding, presenting, or authenticating a digital identification credential. (I10; ANCR 7.1.3)
- **AC-RIGHTS-2.** Where consent is the legal basis, a withdrawal route is recorded and a withdrawal event is capable of being written to the Notice Event Log against the same `notice_id` and `notice_version_reference`. (I10; ANCR 7.4)

## 9 Attribution and publication status

This document is an independent external review draft authored and edited by **Mark Lizar**. It was prepared for technical discussion in relation to the ANCR Working Group at Kantara Initiative. Kantara Initiative and the ANCR Working Group are not identified as authors or editors, and no endorsement or adoption is implied.

All `conv108:` terms are proposals in this document. They are not Council of Europe treaty text, published DPV terms, or ISO/IEC terms. Existing `dpv:`, `pd:`, `loc:`, `tech:`, `dct:`, and `dcat:` terms remain attributable to their respective specifications. The `ancr:` references identify an alignment target and do not claim a published namespace.

ISO/IEC TS 27560:2023 is identified as a Technical Specification titled *Privacy technologies: Consent record information structure*. ISO/IEC 27091 is not quoted or analysed in this draft because, as of 30 August 2026, it remains under development at the Final Draft International Standard stage.

## 10 References

- Council of Europe, [Convention 108 as it will be amended by Protocol CETS No. 223](https://rm.coe.int/16808ade9d).
- ISO/IEC TS 27560:2023, [Privacy technologies: Consent record information structure](https://www.iso.org/standard/80392.html).
- ANCR Extension for ISO/IEC TS 27560:2023, `ancr-ts-27560-extension/ancr-ts-27560 Notice Record Extension.md`, in `KantaraInitiative/ancr-wg`. Normative source for the record structure referenced by this document.
- W3C Data Privacy Vocabularies and Controls Community Group, [Consent Records and Receipts as per ISO/IEC TS 27560:2023 using DPV](https://w3id.org/dpv/guides/consent-27560).
- ISO/IEC 22989:2022, Information technology: Artificial intelligence: Artificial intelligence concepts and terminology.
- ISO/IEC FDIS 27091, [Cybersecurity and Privacy: Artificial Intelligence: Privacy protection](https://www.iso.org/standard/56582.html).
- Regulation (EU) 2024/1689 (Artificial Intelligence Act), Article 53.
- Directive (EU) 2019/790, Article 4(3).
