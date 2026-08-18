# Convention 108+ DPV-style Legal-Model Extension: Draft Specification

**Status:** DRAFT
**Editor:** ANCR Working Group (Kantara Initiative)
**Version:** 0.1-draft
**Date:** 2026-08-18

> **Scope discipline (binding, from `dpv/README.md`).** This document does **not** propose new interpretations of Convention 108+. It provides (1) a traceable Convention 108+ modelling structure expressed in a DPV-style pattern, and (2) evidence-first acceptance criteria for guidance that claims to represent valid consent evidence in digital / open-network contexts. It is **not** an official W3C DPVCG deliverable, **not** a replacement for DPV specifications or DPV:27560 documentation, and **not** an ISO-adopted profile. All references to ISO/IEC TS 27560 and related standards are **alignment references** and an implementation-pattern concept, not claims of adoption.

---

## 1. Purpose and framing

This extension expresses the **Convention 108+ legal model** as a DPV-style vocabulary so that a notice / consent record can carry, in machine-readable form, the authority under which personal data is processed. It then adds an **AI profile** that carries the AI-required information set (elements I1-I16 from the companion AI-required information analysis) as DPV-style fields and classes.

The framing is **Operational Transparency**: notice and permission expressed as records produced by the operation itself, so that legal authority, technical operation, and individual awareness hold in the same moment (the *synchronic* property). Three artefacts carry it: a machine-readable notice / consent receipt, a publicly resolvable **Controller Identification Record (CIR)**, and an Internet Transparency Code of Practice grounded in Convention 108+. This spec is the legal-model layer those artefacts resolve to.

The load-bearing distinction this vocabulary must keep testable (from the Operational Transparency framing, companion material):

- **Consent** is authority held by the individual and expressed as a legal basis.
- **Technical permission** is system enforcement.
- **Identification** is neither.

A permission may not stand in for the authority it is meant to carry. The vocabulary keeps the three apart so the boundary is testable rather than asserted.

---

## 2. Namespace

Proposed namespace and prefix for the Convention 108+ legal-model extension:

```
conv108: https://w3id.org/dpv/legal/int/conv108plus#
```

**Justification.**

- **Path segment `int/conv108+`.** The IRI path renders this as `int/conv108plus`: a URI-safe form of "Convention 108+" (the modernised protocol). A literal `+` in an IRI path segment is fragile (it is ambiguous with the `+`-as-space convention in query strings and is frequently re-encoded to `%2B` by intermediaries), so the "+" is spelled out as `plus` in the path while the human-facing choice remains "conv108+".
- The DPV legal extensions already namespace jurisdictional legal models under `dpv/legal/<jurisdiction>` (e.g. `eu-gdpr: https://w3id.org/dpv/legal/eu/gdpr#` per the 29184-DPV guide).
- The prefix is kept **short** as `conv108` (not `conv108plus`): unambiguous, and matching the common short name of the modernised Convention (CETS 223 / Convention 108+). Only the namespace IRI carries the `plus` rendering.
- The pattern mirrors `dpv-29184: https://w3id.org/dpv/schema/dpv-29184#` and `eu-gdpr:` so an implementer already using DPV can add this extension without a new modelling idiom.

**Companion namespaces reused (not redefined here).** This extension reuses core DPV and its modules rather than duplicating terms:

| Prefix | Namespace | Reused for |
|---|---|---|
| `dpv` | `https://w3id.org/dpv#` | controller, purpose, personal data, legal basis, rights, timing |
| `pd` | `https://w3id.org/dpv/pd#` | personal-data categories |
| `loc` | `https://w3id.org/dpv/loc#` | processing / destination locations |
| `tech` | `https://w3id.org/dpv/tech#` | technical / processing detail |
| `dct` | `http://purl.org/dc/terms/` | title, description, issued, modified |
| `dcat` | `http://www.w3.org/ns/dcat#` | version |
| `ancr` | (ANCR extension, alignment reference) | receipt / record structure, notice-event object |

New terms proposed **only** where no existing DPV term carries the Convention 108+ or AI-evidence semantics. Each new term is flagged in section 6 and section 7.

---

## 3. Legal bases: mapped to Convention 108+ articles

Legal bases are expressed DPV-style via `dpv:hasLegalBasis`, with `conv108:` subclasses of `dpv:LegalBasis`. These name the **treaty article** the authority resolves to. This is a modelling structure, not a reinterpretation: each term points at the article it derives from and asserts nothing the article does not already say.

| Term (proposed) | Subclass of | Convention 108+ anchor | Meaning |
|---|---|---|---|
| `conv108:LawfulProcessingBasis` | `dpv:LegalBasis` | Art 5 (lawfulness, proportionality) | Root class: processing has a lawful, proportionate basis fixed per purpose |
| `conv108:ConsentBasis` | `conv108:LawfulProcessingBasis`, `dpv:Consent` | Art 5.2 | Consent as the individual-held authority for a purpose |
| `conv108:CompatibleSecondaryPurposeBasis` | `conv108:LawfulProcessingBasis` | **Art 5.4** | Compatible secondary use, incl. **model training** as a named secondary purpose |
| `conv108:LegalObligationBasis` | `conv108:LawfulProcessingBasis` | Art 5 | Basis grounded in a legal obligation |
| `conv108:LegitimateInterestBasis` | `conv108:LawfulProcessingBasis` | Art 5 | Basis grounded in an overriding legitimate interest, proportionality-tested |
| `conv108:AccountabilityBasis` | `dpv:LegalBasis` | **Art 8** | Controller identity / accountability precondition for any basis to be relied on |
| `conv108:TransborderSafeguardBasis` | `dpv:LegalBasis` | **Art 14** | Standardised safeguard that makes a transborder flow lawful, demonstrable in advance |

**Note on Art 5.4 (`conv108:CompatibleSecondaryPurposeBasis`).** This is the treaty basis on which model training as a *secondary* purpose becomes explicitly authorised rather than inherited. It is the single most load-bearing basis for the AI profile (I3): it turns "training was assumed lawful" into "training was authorised as a compatible secondary purpose and evidenced" (Operational Transparency framing, companion material). This is a **fresh class**, subclassed only under `conv108:LawfulProcessingBasis`: *not* a subclass of `dpv:LegitimateInterest` or any existing DPV secondary-use term. Rationale: the Art 5.4 compatibility test (is the secondary purpose compatible with the purpose for which the data was originally collected?) is treaty-specific; collapsing it into an existing DPV secondary-use term would import that term's semantics and blur the treaty anchor the AI profile depends on. Keeping it fresh keeps the Art 5.4 test explicit and testable. (See section 6.)

**Note on Art 8 (`conv108:AccountabilityBasis`).** Modelled as a distinct basis-class because Convention 108+ Art 8 makes controller identity and accountability a **precondition** that must be resolvable *before* collection (I1): not a purpose-specific basis but the condition under which any purpose-specific basis can be relied on. Expressed via the CIR (section 5).

---

## 4. Principles, rights, and transparency requirements (DPV-style)

### 4.1 Principles

Convention 108+ principles expressed as `conv108:` classes for reference by a record. These are modelling handles for the articles, not new obligations.

| Term (proposed) | Convention 108+ anchor | Principle |
|---|---|---|
| `conv108:LawfulnessPrinciple` | Art 5.1-5.2 | Lawful, fair, proportionate processing |
| `conv108:PurposeSpecificationPrinciple` | Art 5.4 (b) | Explicit, specified, legitimate purposes; compatible secondary use only |
| `conv108:DataMinimisationPrinciple` | Art 5.4 (c) | Adequate, relevant, not excessive |
| `conv108:AccountabilityPrinciple` | Art 8 | Controller demonstrably accountable and identifiable in advance |
| `conv108:TransborderProtectionPrinciple` | Art 14 | Appropriate level of protection for transborder flows, demonstrable in advance |

### 4.2 Rights

Rights are expressed DPV-style via `dpv:hasRight` with `conv108:` subclasses of `dpv:DataSubjectRight`, each anchored to **Article 9**.

| Term (proposed) | Convention 108+ anchor | Right |
|---|---|---|
| `conv108:RightToInformation` | Art 9.1.b | To obtain, on request, knowledge of the processing |
| `conv108:RightOfAccess` | Art 9.1.b | Access to one's personal data |
| `conv108:RightToRectification` | Art 9.1.e | Rectification / erasure |
| `conv108:RightToObject` | Art 9.1.d | To object to processing |
| `conv108:RightAgainstSolelyAutomatedDecision` | **Art 9.1.c** | Not to be subject to a decision based solely on automated processing without views taken into account |
| `conv108:RightToWithdrawConsent` | Art 9 (with Art 5.2) | To withdraw consent, with a resolvable withdrawal route |

**Note on Art 9.1.c (`conv108:RightAgainstSolelyAutomatedDecision`).** This is the treaty hook for automated-decision / inference-scope disclosure (I9). The right is meaningful only if the inference scope was disclosed in advance, which the AI profile requires.

**Note on `conv108:RightToWithdrawConsent`.** Modelled to require a **resolvable withdrawal route** (a reference, not a promise), so I10 is testable: a record either carries a resolvable route or it does not.

### 4.3 Transparency requirements

Transparency requirements express the **synchronic** property: what must be inspectable, and *when*, expressed with DPV timing terms (`dpv:isBefore`, `dpv:isDuring`) relative to `dpv:Collect`.

| Term (proposed) | Convention 108+ anchor | Requirement |
|---|---|---|
| `conv108:TransparencyBeforeCollection` | Art 8, Art 5 | Accountable party + authority resolvable **before** collection (`dpv:isBefore dpv:Collect`) |
| `conv108:TransborderTransparency` | Art 14 | Destination jurisdictions + safeguard resolvable **before** any transfer |
| `conv108:AutomatedProcessingTransparency` | Art 9.1.c | Automated-decision / inference scope disclosed before processing |
| `conv108:DualHeldRecordRequirement` | Art 8 + ANCR (alignment) | A record of what was presented is held by the individual, not only the controller |

`conv108:DualHeldRecordRequirement` is where the treaty-derived structure meets the ANCR evidence layer: it is the modelling handle for I11 (dual-held record).

---

## 5. The Controller Identification Record (CIR): accountability expressed (Art 8)

The CIR is the DPV-expression of `conv108:AccountabilityBasis` (Art 8). It is published by the controller about itself and resolves the accountable party **before** identification is demanded of the individual. Expressed reusing DPV controller terms with `conv108:` additions:

| Field | DPV / conv108 expression | Convention 108+ / I-anchor |
|---|---|---|
| Controller identity | `dpv:hasDataController` + `dpv:hasIdentifier` (e.g. `did:web:`) | Art 8; I1 |
| Privacy contact point | `dpv:hasContact` (schema:ContactPoint) | Art 8 |
| Lawful basis per purpose | `dpv:hasLegalBasis` → `conv108:*` | Art 5; I2 |
| Purposes (incl. training) | `dpv:hasPurpose` (+ `conv108:CompatibleSecondaryPurposeBasis`) | Art 5 / 5.4; I3, I4 |
| Processing / destination locations | `dpv:hasLocation` (`loc:`) | Art 14; I8 |
| Transborder safeguard | `conv108:hasTransborderSafeguard` | Art 14; I8 |
| Rights access reference | `conv108:hasRightsAccessReference` | Art 9; I10 |
| Issuing authority + registry id | `conv108:hasIssuingAuthority`, `conv108:hasRegistryIdentifier` | registry; I14 |
| Active validity state | `conv108:hasActiveState` | ITCoP dynamic transparency; I15 |

The CIR on its own is still a self-assertion. What makes the claim testable is **registry verification** (proof of domain control + legal entity), after which a **jurisdiction-scoped registry identifier** (`conv108:hasRegistryIdentifier`, I14) is issued and every record that controller produces resolves to it. This is the first assurance transition (self-assertion to registry verification) described in the Operational Transparency framing (companion material).

---

## 6. New vs existing terms: legal-model layer

Honesty about what is reused vs proposed. Existing = already in DPV or a DPV module. Proposed = introduced by this extension (design layer, not adopted standard text).

| Term | Status |
|---|---|
| `dpv:hasLegalBasis`, `dpv:Consent`, `dpv:hasPurpose`, `dpv:hasPersonalData`, `dpv:hasLocation`, `dpv:hasRight`, `dpv:DataSubjectRight`, `dpv:hasDataController`, `dpv:hasIdentifier`, `dpv:hasContact`, `dpv:isBefore`, `dpv:Collect`, `dcat:version`, `dct:issued`, `dct:modified` | **Existing DPV**: reused, not redefined |
| `conv108:LawfulProcessingBasis`, `ConsentBasis`, `CompatibleSecondaryPurposeBasis`, `LegalObligationBasis`, `LegitimateInterestBasis`, `AccountabilityBasis`, `TransborderSafeguardBasis` | **Proposed (new)**: Conv 108+ article-anchored legal-basis subclasses |
| `conv108:*Principle` (5 terms), `conv108:RightTo*` / `RightOf*` / `RightAgainst*` (6 terms) | **Proposed (new)**: modelling handles for Conv 108+ Art 5, 8, 9, 14 |
| `conv108:TransparencyBeforeCollection`, `TransborderTransparency`, `AutomatedProcessingTransparency`, `DualHeldRecordRequirement` | **Proposed (new)**: transparency-timing requirements |
| `conv108:hasTransborderSafeguard`, `hasRightsAccessReference`, `hasIssuingAuthority`, `hasRegistryIdentifier`, `hasActiveState` | **Proposed (new)**: CIR / registry properties |
| `conv108:ChainOfNotice`, `hasNoticeParticipant`, `hasParticipantScope`, `hasLifecycleRole` | **Proposed (new)**: chain-of-notice (I16); `hasLifecycleRole` carries an **ISO/IEC 22989 alignment-reference** role value, not an adopted term |

**Note on I12 / I13 (ANCR field reuse).** No `conv108:` term is minted for the notice version hash (I12) or the receipt identifier (I13). These reuse the existing ANCR field names `notice_id` plus `notice_version_reference` (I12) and `receipt_id` (I13) and are mapped in section 7.1. The earlier candidates `conv108:hasNoticeVersionHash` and `conv108:hasReceiptIdentifier` are retired to avoid minting `conv108:` duplicates of fields the ANCR extension already defines.

**Note on `conv108:CompatibleSecondaryPurposeBasis` (fresh class).** This is minted as a **fresh class** under `conv108:LawfulProcessingBasis`, not as a subclass of `dpv:LegitimateInterest` or any existing DPV secondary-use term. The Art 5.4 compatibility test is treaty-specific: whether a secondary purpose (notably model training) is *compatible* with the original collection purpose is a Convention 108+ determination, and subclassing an existing DPV term would silently inherit that term's semantics and detach the class from its treaty anchor. Minting fresh keeps the Art 5.4 test explicit, keeps the I3 evidence criterion checkable, and avoids asserting an equivalence between the treaty's compatibility test and any DPV legal-basis category. It is the deliberate exception to the general "reuse before mint" rule, made because the reused term would change the meaning.

---

## 7. The AI profile: I1-I16 mapped to DPV-style fields

Every AI-required information element from the companion AI-required information analysis (I1 to I16), mapped to a DPV-style field or `conv108:` class, with its I-number, its legal / standard anchor, and whether it uses an **existing** DPV term or a **proposed new** term.

| I# | Required information | DPV-style expression | Existing / New | Anchor |
|---|---|---|---|---|
| I1 | Accountable party identity, resolvable before collection | `dpv:hasDataController` + `dpv:hasIdentifier`; `conv108:TransparencyBeforeCollection` | Existing (DPV) + New (timing req) | Conv 108+ Art 8; CIR |
| I2 | Lawful basis per purpose | `dpv:hasLegalBasis` → `conv108:LawfulProcessingBasis` | Existing base + New subclass | Conv 108+ Art 5 |
| I3 | Secondary-purpose basis for model training | `conv108:CompatibleSecondaryPurposeBasis` | **New** | Conv 108+ Art 5.4 |
| I4 | Purpose(s), incl. training as named secondary purpose | `dpv:hasPurpose` (+ `dct:title`/`dct:description`) | Existing (DPV) | Conv 108+ Art 5; AI Act 53 |
| I5 | Training-data provenance / sources | `conv108:hasTrainingDataProvenance` | **New** | AI Act 53(1)(d) |
| I6 | Copyright / machine-actionable rights-reservation status | `conv108:hasRightsReservationStatus` | **New** | AI Act 53(1)(c); Dir 2019/790 Art 4(3) |
| I7 | Personal-data categories in training data | `dpv:hasPersonalData` (`pd:` categories) | Existing (DPV) | Conv 108+ Art 5-6 |
| I8 | Processing & disclosure locations / destination jurisdictions | `dpv:hasLocation` (`loc:`) + `conv108:hasTransborderSafeguard` | Existing base + New safeguard prop | Conv 108+ Art 14 |
| I9 | Automated-decision / inference scope disclosure | `conv108:AutomatedProcessingTransparency`; `conv108:RightAgainstSolelyAutomatedDecision` | **New** | Conv 108+ Art 9.1.c |
| I10 | Data-subject rights + withdrawal route | `dpv:hasRight` → `conv108:RightToWithdrawConsent` + `conv108:hasRightsAccessReference` | Existing base + New | Conv 108+ Art 9 |
| I11 | Machine-readable record of I1-I10, held by >=2 parties | `conv108:DualHeldRecordRequirement`; `ancr:Receipt` (alignment) | **New** (+ ANCR alignment) | TS 27560 + ANCR |
| I12 | Notice version reference + hash (notice as first-class object) | ANCR `notice_id` (stable family) + `notice_version_reference` (immutable, URI and/or hash) | **Reused (ANCR)**: mapped, not re-minted | ANCR / TS 27560 |
| I13 | Receipt identifier carried with a training contribution | ANCR `receipt_id` (base `record_id`, renamed) | **Reused (ANCR)**: mapped, not re-minted | ANCR extension |
| I14 | Issuing authority + jurisdiction-scoped registry identifier | `conv108:hasIssuingAuthority` + `conv108:hasRegistryIdentifier` | **New** | CIR / registry |
| I15 | Active-state / live validity (valid / invalid / suspended) | `conv108:hasActiveState` (enum: valid, invalid, suspended) | **New** | ITCoP dynamic transparency |
| I16 | Per-participant notice through the chain, bound to ISO/IEC 22989 AI-lifecycle roles | `conv108:ChainOfNotice`, `conv108:hasNoticeParticipant` (typed by `conv108:hasLifecycleRole` → 22989 role), `conv108:hasParticipantScope` | **New** | Chain-of-notice; ISO/IEC 22989 roles |

### 7.1 The additions the EU AI Act does not require (I11-I16)

These are the axis of maximum difference. The companion AI-required information analysis is explicit that Article 53 does **not** require them; that is precisely the gap this extension fills. They are marked here as **design-layer additions**, not adopted standard text.

- **I11 `conv108:DualHeldRecordRequirement`**: the record of I1-I10 is machine-readable and **held by >=2 parties**, so the affected person can produce it, not only the provider. Custody is the difference between disclosure-oriented and receipt-oriented transparency.
- **I12: ANCR `notice_id` plus `notice_version_reference`**: the notice becomes a **first-class object** with a stable family identifier and an immutable version reference, so "what was presented at time T" has an answer independent of the presenting party's goodwill or retention practice. Resolved: reuse the ANCR field names directly, do not mint a `conv108:` duplicate. The ANCR extension already defines `notice_version_reference` as an *immutable reference to the disclosed notice version (URI and/or hash reference)* bound to the exact notice version in effect at disclosure; that is exactly the version-plus-hash binding I12 needs. Mapping: this extension's "notice version reference plus hash" **is** ANCR `notice_version_reference` (carrying the immutable/hash binding), with ANCR `notice_id` supplying the stable notice-family identifier. No `conv108:hasNoticeVersionHash` term is introduced.
- **I13: ANCR `receipt_id`**: a receipt id **carried with a training contribution**, converting a consent claim into an artefact validatable before training and revisitable on withdrawal. Resolved: reuse ANCR `receipt_id`, do not mint a `conv108:` duplicate. In the ANCR extension `receipt_id` is the base ISO/IEC TS 27560 `record_id` field renamed for semantic clarity (receipt-instance tracking). Mapping: this extension's "receipt identifier" **is** ANCR `receipt_id` (base `record_id`). No `conv108:hasReceiptIdentifier` term is introduced.

**ANCR field mapping (I12, I13): reuse, not duplication.** I12 and I13 are carried by existing ANCR field names rather than fresh `conv108:` properties, and this extension only provides the mapping:

| This extension's need | ANCR field reused | ANCR definition (source) | I# |
|---|---|---|---|
| Stable notice-family identifier | `notice_id` | Stable notice family identifier, stable across notice versions | I12 |
| Immutable notice version reference + hash | `notice_version_reference` | Immutable reference to the disclosed notice version (URI and/or hash reference), bound to the exact version in effect at disclosure | I12 |
| Receipt identifier for a contribution | `receipt_id` | Base TS 27560 `record_id` renamed for receipt-instance tracking | I13 |

The retired `conv108:hasNoticeVersionHash` and `conv108:hasReceiptIdentifier` proposals are removed from the term set; see section 6.
- **I14 `conv108:hasRegistryIdentifier`**: a **jurisdiction-scoped** identifier issued after registry verification, so a receipt issued under one authority can be evaluated against the authority claimed in another (cross-jurisdiction by construction).
- **I15 `conv108:hasActiveState`**: **live validity** (valid / invalid / suspended) evaluable in real time, because a receipt issued last month cannot represent a risk posture that changed last week. This is the dynamic-transparency requirement AI contexts add.
- **I16 `conv108:ChainOfNotice`**: **notice per participant** through the AI lifecycle, each notice bound to the participant that issued it and to the notice version it issued, and **tested by the next participant** before that participant relies on it. This is the novel claim; it has no analogue in the AI Act template, which issues a single end-of-chain summary. Resolved: bind the chain participants to ISO/IEC 22989 AI-lifecycle roles rather than keeping them abstract. Each `conv108:hasNoticeParticipant` is typed by `conv108:hasLifecycleRole` naming the 22989 stakeholder / lifecycle role it acts in, so "who issued this notice, in which lifecycle role, at which version" is answerable from the record.

**I16 chain-of-notice: ISO/IEC 22989 role binding.** Chain participants map to the ISO/IEC 22989:2022 AI stakeholder / lifecycle roles as follows. Each role's notice is bound to the **party** acting in that role and to the notice **version** it issued; each downstream role **tests** the upstream notice before relying on it.

| Chain stage | ISO/IEC 22989 role | Notice binding | Tested by |
|---|---|---|---|
| Design | AI provider acting as **AI designer** (sub-role of AI producer) | Notice bound to designer party + notice version | AI developer |
| Develop | AI provider acting as **AI developer** (sub-role of AI producer) | Notice bound to developer party + notice version | AI producer / trainer |
| Train / produce | **AI producer** (training / model production) | Notice bound to producer party + notice version, incl. training as Art 5.4 secondary purpose (I3) | AI operator / deployer |
| Deploy / operate | **AI operator** (deployer; toward the **AI customer / AI user**) | Notice bound to operator party + notice version | AI customer / AI subject (relying party) |

The 22989 role labels are used as **alignment references** to name the participant's lifecycle role, not as adopted `conv108:` terms; `conv108:hasLifecycleRole` carries the role value. Where 22989 collapses several of these under "AI provider / AI producer", the chain preserves the finer stage (design vs develop vs train) so each notice-issuance point stays individually testable. If a deployment does not distinguish designer from developer, the stages may be merged, but the merge SHALL be explicit in the record rather than silently backfilled (see AC-SEQ-2).

---

## 8. Evidence-first acceptance criteria

From the README's five gap areas. Each is a **testable** condition on a record or a receipt, not an assertion. A record either passes or it does not; these are checkable **before** the flow proceeds. Anchored to the I-elements and Convention 108+ articles they evidence.

> **Scope of this section (open, see section 11.2 item 2).** This section is the **summary** acceptance-criteria set for this spec. The **full conformance tests** belong in `dpv-27560-conformance-tests.md`, which should reference them by their IDs (AC-SEQ-*, AC-BIND-*, AC-RCPT-*, AC-RECIP-*, AC-ID-*).

### 8.1 Sequence integrity
- **AC-SEQ-1:** The CIR / accountable-party record is resolvable at a timestamp **before** the first collection event (`conv108:TransparencyBeforeCollection`, `dpv:isBefore dpv:Collect`). Evidence: notice-event / receipt timestamp precedes first processing timestamp. (I1; Art 8)
- **AC-SEQ-2:** Where a chain of notice is claimed (I16), each participant is typed by its ISO/IEC 22989 lifecycle role (`conv108:hasLifecycleRole`), each notice is bound to the issuing party + notice version, and each participant's notice timestamp precedes the next participant's build/test event. Ordering is verifiable, the next role in the chain has tested the upstream notice, and no gap or role merge is silently backfilled (any stage merge is explicit in the record). (I16; ISO/IEC 22989 roles)

### 8.2 Notice binding
- **AC-BIND-1:** The record carries a notice version reference (ANCR `notice_version_reference`, URI and/or hash) bound to the stable notice family (ANCR `notice_id`) and resolving to the notice text in force at the moment recorded. (I12; ANCR / TS 27560)
- **AC-BIND-2:** The legal basis per purpose (`dpv:hasLegalBasis` → `conv108:*`) is bound to the version-hashed notice, so "what basis was relied on for which purpose at time T" is answerable from the record alone. (I2, I3; Art 5, 5.4)

### 8.3 Receipt availability
- **AC-RCPT-1:** A receipt exists and is **held by the individual** (or an agent for them), not only the controller: the dual-held condition. (I11; `conv108:DualHeldRecordRequirement`)
- **AC-RCPT-2:** The receipt carries a receipt identifier (ANCR `receipt_id`, base TS 27560 `record_id`) that can be carried with a training contribution and re-resolved on withdrawal. (I13)

### 8.4 Recipient transparency
- **AC-RECIP-1:** Processing and destination locations (`dpv:hasLocation`) and, for transborder flows, the Art 14 safeguard (`conv108:hasTransborderSafeguard`) are resolvable **in advance** of the transfer. (I8; Art 14, `conv108:TransborderTransparency`)
- **AC-RECIP-2:** Automated-decision / inference scope (`conv108:AutomatedProcessingTransparency`) is disclosed before processing, making the Art 9.1.c right meaningful. (I9; Art 9.1.c)

### 8.5 Identifier governance
- **AC-ID-1:** The controller identifier resolves to an issuing authority (`conv108:hasIssuingAuthority`) and, where verified, a jurisdiction-scoped registry identifier (`conv108:hasRegistryIdentifier`). A self-asserted CIR is distinguishable from a registry-verified one. (I14; Art 8 / registry)
- **AC-ID-2:** The record's active state (`conv108:hasActiveState`) is evaluable in real time as valid / invalid / suspended; an expired or suspended state is detectable at the point of reliance. (I15; ITCoP dynamic transparency)

---

## 9. Assurance layer: class-bound assessment (TPI v1 controller, TPI v2 instrument, TPI v3 AI system) over the record

This spec defines the **record and vocabulary**: the DPV-style structure an instrument, a controller, or an AI system uses to carry the AI-required information set (I1-I16) with each element anchored to a Convention 108+ article. It does **not** define how well a given object performs against that structure. That is the job of a distinct **assessment method** applied over the record. The record (I1-I16) is **version-agnostic**: it does not change with the assessment. What changes is **which assessment class** is applied, and that is fixed by **what object is being assessed**:

- a **controller** (a live entity that processes personal data) is assessed by **TPI v1**;
- a **governance instrument** (a standard / regulation / mechanism, including this extension as an instrument) is assessed by **TPI v2**;
- an **AI system** (a lifecycle of designer, developer, trainer, deployer) is assessed by **TPI v3**.

TPI v2 assesses this extension **as a governance instrument**: how much regulatory / transparency capacity the instrument (or a controller relying on it) delivers against I1-I16, baselined to Convention 108+ Art 8.2. TPI v3 assesses **an AI system's conformance to the I1-I16 record across its lifecycle**: whether each stage (designer, developer, trainer, deployer) actually produced, bound, and tested the record the extension requires. The two are additive, not alternatives: an AI system is built on instruments assessed by v2, and both resolve to controllers assessed by v1.

**The division of labour (keep testable).**

- **This extension = the record / vocabulary.** What must be carried (I1-I16), how it is expressed (`conv108:` classes, DPV reuse), and the evidence-first acceptance criteria a record either passes or fails (section 8). This layer is version-agnostic and is defined in sections 3 through 8; it does not gain a v3 dimension.
- **TPI v2 = the assessment method over the instrument.** A governance-instrument-level audit that scores how much regulatory / transparency capacity an instrument (assessed by v2) delivers against the I-elements. A controller relying on that instrument is itself assessed by **v1**, never by v2: the controller and the instrument are different objects, so a controller is assessed by v1 and the instrument it relies on is assessed by v2.
- **TPI v3 = the assessment method over the AI system.** An AI-system-level audit that scores whether an AI system's lifecycle (designer, developer, trainer, deployer) conforms to the I1-I16 record end to end, testing what v1 (controller-level) and v2 (instrument-level) structurally cannot see: the chain running across lifecycle stages.

The three are **joined at the CIR / assessment record**: the CIR (section 5) resolves the accountable party and the authority conditions; each assessment record is authored *over* the same I-elements the CIR and receipts carry, so a score is always traceable back to the specific I-elements and Convention 108+ articles it assessed. The vocabulary makes the facts machine-readable; the class-bound assessment makes the capacity behind those facts assessable.

### 9.1 TPI v2 method (alignment reference, in development)

TPI v2 is a **0PN / ANCR in-development method** (`method_version: v2.0`, baseline **Convention 108+ Art 8.2**; source: 0PN Bill C-27 Report and Rating, Lizar and Agassini 2024). It is an **alignment reference, not adopted ISO text**, and it is **plan-validated, not yet built** into the reference implementation. It is cited here so the assurance layer over this record is on record, not to claim a finished instrument.

TPI v2 is **analytical expert judgment, not an automated score.** The method supplies the structure, the baseline, and the indicator library; a human assessor authors the audit. A crawler does not produce a v2 score.

Two layers:

- **Layer A: TPI headline scorecard (4 indicators, each +1 / 0 / -1).** TPI-1 Controller Identification Timing; TPI-2 Controller Identification Completeness; TPI-3 Rights Access Mechanisms; TPI-4 Cross-Border Transfer Transparency. These map directly onto I-elements this spec carries: TPI-1 over I1 (`conv108:TransparencyBeforeCollection`); TPI-2 over I11, I14 (`conv108:DualHeldRecordRequirement`, `conv108:hasRegistryIdentifier`); TPI-3 over I10 (`conv108:hasRightsAccessReference`); TPI-4 over I8, I14 (`conv108:hasTransborderSafeguard`, jurisdiction-scoped identifier).
- **Layer C: Digital Privacy Governance Trust (10 questions, aggregated as a percentage).** Applies where a governance dimension is present (a law or regulation gets Layer A + Layer C; a standard or mechanism such as this extension gets Layer A primarily, Layer C where a governance dimension applies).

### 9.1a TPI v3: AI-system class (0PN / ANCR in-development, PROPOSED)

**Status flags (read first).** TPI v3 is a **0PN / ANCR in-development** assessment class. It is **PROPOSED**, **undefined elsewhere** (no analogue in the AI Act conformity framework, in DPV, or in adopted ISO text), and **expert-authored, not auto-scored** (like v2, and unlike the v1 automated probe, a v3 score is analytical expert judgment authored over the record, not produced by a crawler). It is on record here so the AI-system assurance class is captured; it is not a finished instrument. Resolved: the Class-3 AI-system assessment is TPI v3, additive to v1 controllers and v2 instruments.

**What v3 assesses.** TPI v1 assesses a controller at a single point (its CIR / live posture). TPI v2 assesses a governance instrument at a single point (its capacity against I1-I16). Neither can see the property that only exists **across an AI system's lifecycle**: whether the I1-I16 record was produced, bound, and tested at each stage as the system moved designer to developer to trainer to deployer. TPI v3 is the assessment class scoped to that object, the AI system as a lifecycle, and its distinguishing indicators are exactly the I-elements v1 and v2 structurally cannot cover:

| v3 indicator | I-element(s) | What only v3 can test | Anchor |
|---|---|---|---|
| Chain-of-notice integrity | I16 | Each lifecycle stage's notice is bound to its ISO/IEC 22989 role and **tested by the next stage** before that stage relies on it; a single end-of-chain summary fails this. | ISO/IEC 22989 roles; Conv 108+ Art 8 |
| Training-data provenance + secondary-purpose basis | I5, I3 | Training data provenance is declared **and** model training carries an explicit Art 5.4 compatible-secondary-purpose basis, not an inherited assumption. | Conv 108+ Art 5.4; AI Act 53(1)(d) |
| Live model-state at point of reliance | I15 | The model's active-state (valid / invalid / suspended) is evaluable **at the moment a downstream stage or a relying party relies on it**, not only at issuance. | ITCoP dynamic transparency |
| Chain-scoped cross-border per lifecycle stage | I8 | The transborder safeguard is resolved **per lifecycle stage** (each stage may sit in a different jurisdiction), not once for the whole system. | Conv 108+ Art 14 |
| Dual-held custody across the chain | I11 | The record is held by at least two parties **at each hand-off** through the chain, so custody survives every lifecycle transition, not only at the endpoint. | TS 27560 + ANCR |

These five are the v3-distinguishing set: each is a property of the **chain across stages**, which is invisible to a controller-point assessment (v1) or an instrument-point assessment (v2). v3 does not replace v1 or v2; an AI system is composed of controllers (each v1-assessable) relying on instruments (each v2-assessable), and v3 is the additional class that scores the lifecycle chain those parts form.

### 9.2 TPI v1 vs TPI v2 vs TPI v3 (distinction on record)

To keep the assurance vocabulary unambiguous:

| | TPI v1 | TPI v2 | TPI v3 |
|---|---|---|---|
| Assesses | a **controller** (a live entity that processes personal data, keyed by domain) | a **governance instrument** (a standard / regulation / mechanism that governs controllers, keyed by instrument id) | an **AI system** (a designer to developer to trainer to deployer lifecycle, keyed by system id) |
| Method | automated 6-indicator live probe (plus v1.5 human enrichment, v1.6 legal-adequacy against the 23 ANCR requirements) | analytical expert judgment: Layer A (4 indicators) + Layer C (governance-trust %) | analytical expert judgment over the lifecycle chain (chain-of-notice, provenance + Art 5.4, live model-state, chain-scoped cross-border, dual-held custody) |
| Level | controller / CIR layer | governance-instrument layer | AI-system / lifecycle layer |
| Over this record | scores a controller's transparency posture | scores the instrument (or its reliance chain) against I1-I16 | scores an AI system's conformance to the I1-I16 record across its lifecycle (I16, I5/I3, I15, I8, I11 as chain properties) |
| Status | in use | 0PN / ANCR in-development (alignment reference) | 0PN / ANCR in-development, PROPOSED, undefined elsewhere, expert-authored |

The three assessments are **class-bound to what is being assessed**: a controller by v1, this extension as a governance instrument by v2, an AI system by v3. The record (I1-I16) is version-agnostic across all three; only the assessment class changes with the object.

### 9.3 Class taxonomy: object to version binding

The assessment class is fixed by the **object** under assessment. The record (I1-I16) is the same in every case; only the assessment differs.

| Class | Object assessed | Assessment version | Keyed by | What it can see that lower classes cannot |
|---|---|---|---|---|
| Class 1 | Controller (live entity processing personal data) | **TPI v1.x** | domain | the controller's live transparency posture at its CIR |
| Class 2 | Governance instrument (standard / regulation / mechanism, incl. this extension) | **TPI v2** | instrument id | the regulatory / transparency capacity an instrument delivers against I1-I16 |
| Class 3 | AI system (designer to developer to trainer to deployer lifecycle) | **TPI v3** | system id | the chain properties (I16, I5/I3, I15, I8, I11) that exist only across lifecycle stages |

**Version-agnostic record, class-bound assessment.** The I1-I16 record (sections 3 through 7) does not change with the class: the same vocabulary and the same evidence-first acceptance criteria (section 8) apply whether the object being assessed is a controller, an instrument, or an AI system. Only the **assessment** is class-bound. A record is never "a v1 record" or "a v3 record"; it is one version-agnostic record, assessed by whichever class matches the object.

---

## 10. Honesty flags

Marking design-layer additions vs adopted standard text, so maturity is not overclaimed.

- **This is a DRAFT.** It has not been circulated, balloted, or accepted.
- **Not adopted standard text.** All `conv108:` terms in sections 3, 4, 5, 6, and 7 are **proposed design-layer additions** authored for this extension. They are not Convention 108+ text, not DPV/DPVCG-published terms, and not ISO-adopted. Convention 108+ article numbers are cited as **anchors** (what the modelling handle points at), not as endorsements of the term by the treaty.
- **Alignment references only.** ISO/IEC TS 27560, ISO/IEC 29184, ISO/IEC 29100, ISO/IEC 27091, ISO/IEC 22989, and the ANCR extension are named as **alignment references** and an implementation-pattern concept. Nothing here is an ISO-adopted profile. The `ancr:` prefix denotes the ANCR extension as an alignment target, not a resolved published namespace. The ISO/IEC 22989 AI-lifecycle role labels used in the I16 chain-of-notice binding (section 7.1) are cited as alignment references to name a participant's lifecycle role; they are carried as the value of `conv108:hasLifecycleRole` and are not adopted `conv108:` terms.
- **TPI assurance layer (section 9) is class-bound and, for v2 and v3, a 0PN / ANCR in-development method, not adopted standard text.** The assessment class is fixed by the object: **v1** over a controller, **v2** over a governance instrument (this extension), **v3** over an AI system. The TPI v2 Regulatory Capacity Audit and the TPI v3 AI-system assessment are cited as **alignment references** for the assurance layer over this record; both are plan-validated, not yet built into the reference implementation, and are analytical expert judgment rather than automated scores. **TPI v3 (section 9.1a) is PROPOSED, undefined elsewhere, and the least mature of the three:** it is on record so the AI-system assurance class is captured, not because it is a finished instrument. Convention 108+ Art 8.2 is cited as v2's **baseline anchor**, not as an endorsement of the method by the treaty. This spec defines the record and vocabulary (version-agnostic); the TPI classes define the assessment methods over it, and the record and the assessments remain separable.
- **DPV terms are reused, not owned.** All `dpv:`, `pd:`, `loc:`, `tech:`, `dct:`, `dcat:` terms are existing DPV/W3C terms reused per their published definitions. Section 6 and section 7 mark existing vs new explicitly; do not read a `dpv:`-prefixed term as authored here.
- **No new interpretation of Convention 108+ is claimed** (README scope rule). Where an article is cited, the extension asserts only the modelling structure and the evidence criterion, never a legal reading the article does not already carry.
- **I5, I6 anchor to the EU AI Act / Directive 2019/790**, not to Convention 108+. They are included because the AI-required information set spans instruments; they are not presented as treaty-derived.
- **Namespace URI is a proposal.** `https://w3id.org/dpv/legal/int/conv108plus#` is proposed by analogy to existing DPV legal namespaces; it is not a registered or resolvable w3id path yet. The `conv108plus` path segment is the URI-safe rendering of the "conv108+" choice; the literal form is open to change.
- **The AI profile (I11-I16) is the novel contribution and the least mature.** These are exactly the terms with no adopted-standard backing. They are the point of the extension and the part most in need of review.

---

## 11. Review status

### 11.1 Resolved decisions

1. **Namespace and prefix.** The namespace IRI is `https://w3id.org/dpv/legal/int/conv108plus#` (a URI-safe rendering of "conv108+"), and the prefix stays short as `conv108` (sections 2, 6).
2. **Art 5.4 as a fresh class.** `conv108:CompatibleSecondaryPurposeBasis` is minted under `conv108:LawfulProcessingBasis` only, not as a subclass of any existing DPV secondary-use term, because the Art 5.4 compatibility test is treaty-specific (sections 3, 6).
3. **I16 chain-of-notice roles.** Chain participants bind to ISO/IEC 22989 AI-lifecycle roles (AI designer, AI developer, AI producer / trainer, AI operator / deployer), each notice bound to party plus version and tested by the next participant (section 7.1).
4. **I12 / I13 ANCR field reuse.** I12 and I13 reuse existing ANCR field names rather than minting `conv108:` duplicates: I12 maps to ANCR `notice_id` plus `notice_version_reference`; I13 maps to ANCR `receipt_id` (base `record_id`). Mapping in section 7.1; retired terms noted in section 6.
5. **Assurance is class-bound (v1 / v2 / v3), not "Type 3."** The assessment method is fixed by the object under assessment, not stacked as a conformity-assessment tier on a single object: TPI v1 assesses a controller (automated 6-indicator probe); TPI v2 assesses a governance instrument, including this extension (Layer A 4 indicators plus Layer C governance-trust, baseline Convention 108+ Art 8.2, expert-authored; section 9); TPI v3 assesses an AI system across its lifecycle (chain-of-notice I16, provenance plus Art 5.4 I5/I3, live model-state I15, chain-scoped cross-border I8, dual-held custody I11; sections 9.1a, 9.3), and is a 0PN / ANCR in-development, PROPOSED class, undefined elsewhere, expert-authored. The three are additive, not alternatives. The record (I1-I16) is version-agnostic; only the assessment is class-bound (class taxonomy in section 9.3). The evidence criteria in section 8 remain the record-level pass/fail conditions common to all three classes. All three TPI methods are 0PN / ANCR alignment references, not adopted ISO text.

### 11.2 Open for review

These two items are open editorial questions for the working group.

1. **Active-state enum (I15): fixed or extensible?** Should the active-state value set be the fixed three-value set `valid | invalid | suspended`, or an extensible, registered value list? Recommended default: the fixed set `valid | invalid | suspended`, taken from the real-time validity model in the Operational Transparency framing (the three states a receipt can be evaluated as at the point of reliance; section 4.2 / section 8.5 AC-ID-2). Question for the WG: adopt the fixed three-value set unless a fourth state (for example `expired` distinct from `invalid`, or `revoked` distinct from `suspended`) is needed, in which case make the enum extensible with a registered value list.
2. **Acceptance-criteria location.** Should the evidence-first acceptance criteria (section 8) live here or move to `dpv-27560-conformance-tests.md` and be referenced by ID? Interim position: keep the summary acceptance criteria in section 8 of this spec, and place the full conformance tests in `dpv-27560-conformance-tests.md`, which references these ACs by ID (AC-SEQ-*, AC-BIND-*, AC-RCPT-*, AC-RECIP-*, AC-ID-*). Final split open for WG review.
