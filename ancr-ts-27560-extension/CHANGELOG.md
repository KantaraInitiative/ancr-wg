# Changelog

All notable changes to the documents in `ancr-ts-27560-extension/` are recorded here.

This changelog covers:

- `ancr-ts-27560 Notice Record Extension.md`, the ANCR extension for ISO/IEC TS 27560:2023
- `ancr-dpv/ancr-dpv-extension-spec.md`, the ANCR DPV Model Extension
- `ancr-dpv/README.md`

Version identifiers are document revisions. The receipt schema identifier is versioned separately and is stated in clause 7.3.4 of the extension.

## [Extension v1.0, DPV companion v0.3] - draft for ANCR Working Group approval

### Summary

Working group approval draft, 2026-09-04. Continues the lineage of the version circulated to ISO/IEC JTC 1/SC 27/WG 5 as N 5211 (2026-07-16). No schema change: the receipt schema remains `ancr-notice-receipt-2.0`. Closes seven of the thirteen open items carried into external review, and disposes of the remainder below.

### Added

- Annex F, clause level crosswalk to ISO/IEC PWI 26689 as registered by SC 27 Resolution 2026/32. Closes open item 11.
- Annex C, normative profiling rule for jurisdictions whose lawful basis enumeration differs from the table, referenced from the notice version in the same manner as the profiling of 7.2.2. Closes open item 10.
- 7.2.4, hash input rule: notice_hash is computed over the exact octet stream retrievable at notice_url, one NVO per representation. Closes open item 4.
- 3.26 full receipt and 3.27 reference receipt, defining the artefacts named in clause 1, with cross references added to the clause 1 bullets. Closes open item 6.
- 2.2, informative citations for the ANCR TPI Conformity Specification v0.9 and for the SC 27/WG 5 work items named in the Foreword, including ISO/IEC PWI 26689. Closes open item 9 and the citation half of open item 13.
- Clause 5, assessment statement: criteria are assessed by inspection of the named artefact, C5 and C8 additionally by the procedures in 7.2.4 and 7.2.5, Annex E for deployed implementations. Addresses open item 2 at assessment level.
- 7.2, composition statement for the Notice Record content; the consolidated field specification table is deferred. Addresses open item 7 at composition level.
- Foreword, document status paragraph: ANCR Working Group approval, Kantara Recommendation track, liaison circulation in continuity with WG 5 N 5211.

### Changed

- Introduction, first two paragraphs rewritten: the receipt analogy opens, the one way evidence asymmetry is stated, and the missing artefact is named as the identification and tracking of the controller, not the creation of identifiers about individuals.
- E.1, the ANCR TPI-R variant is the applicable assessment profile for this extension; the base composite remains usable without artefact conformance. Closes the decision half of open item 13, for ratification at v1.0 approval.
- Revision line carries the full lineage, commit hash references are consolidated as the v0.4 baseline, and the DPV companion is cited by resolvable URL.

### Open items after v1.0

1. JSON Schema for the receipt, the CIR, the event log entry, and the Authorization State Object. Deferred to a companion artefact.
2. Conformance test procedures for C1 to C8. Assessment is by inspection, with normative procedures for C5 and C8 only.
3. LICENSE and IPR file in this directory. Repository action; the IPR position is stated in the Foreword.
5. Integrity mechanism for an anonymous receipt in place of the per principal HMAC of ISO/IEC TS 27560:2023 Annex E.
8. ISO/IEC 29184 normative reliance versus informative citation. Position stated in the 2.2 NOTE, unchanged.
12. A field recording which consent construction is in use. Proposed for working group decision at v1.0 approval; adding it is a minor schema version increment under 7.3.4.

## [Extension v0.5, DPV companion v0.3] - external review draft

### Summary

Major revision of the extension, reconciled against the file committed at `a09559d5`, and a matching revision of the DPV companion. Two blocking decisions are settled, four changes break implementations built on the committed file, and a working group comment pass is applied.

### Breaking changes, receipt schema `ancr-notice-receipt-2.0`

1. `controller_identity_record_id` is renamed to `controller_identification_record_id`. The old name is deprecated, should be accepted on input for one revision cycle, and shall not be emitted. See 7.1.1.
2. Each notice version shall be represented by a Notice Version Object carrying `notice_hash` and `published_at`, with a normative verification procedure. See 3.24 and 7.2.4. Tested by criterion C5 and mandatory requirement 3.
3. The flat rule that no lawful basis is inferred from a receipt is replaced by a scoped default. See 7.2.2.
4. Where authorization state is relied upon, it shall be carried by an Authorization State Object. See 3.25 and 7.2.5. Tested by criterion C8 and mandatory requirement 11.

A relying party that encounters a receipt with an absent `schema_version`, or a major component below 2, interprets the record against the file published at `a09559d5` and does not apply the 7.2.2 default to it.

### Decisions settled

- **Online consent is the default interpretive context for digital identification.** Where the notice is an online notice in a digital identification context, the individual initiates the interaction in order to discover, and the interaction is a two factor online notice returning a bilateral Anchored Notice Receipt, the disclosure event defaults to online consent unless another basis is asserted in the receipt header. The basis for the default is the discovery act, with the physical sign as the established analogue.
- **Offline consent presented through an online interface is outside the default.** Where identity and location are assumed rather than recorded, no default applies, the basis shall be asserted explicitly, a distinct authorization record is required, and the construction is captured in a controller held record of processing activities that is private and not accessible by default. Offline and online notice records and consent records are named distinctly and shall not be reported as equivalent artefacts.
- **Identification, not identity.** The Controller Identification Record anchors identification carried out by a controller and does not describe the identity of an individual.

### Added

- Clause 4, abbreviated terms, including TPI-R, URI, and URL.
- Clause 3.20 online consent, alongside the imported ISO/IEC TS 27560:2023 definition of consent at 3.19. Consent is not redefined.
- Clause 3.24 and 7.2.4, the Notice Version Object, with `notice_url`, `notice_version_id`, `notice_hash`, `published_at`, and a verification procedure.
- Clause 3.25 and 7.2.5, the Authorization State Object, with a per purpose state vocabulary, a record validity vocabulary, append only state changes, and a reconstruction procedure.
- Clause 5, an explicit statement of the conformance relationship to ISO/IEC TS 27560:2023 in both directions.
- Clause 7.3.4, the `schema_version` identifier and the major, minor, patch version rule.
- Criterion C8, authorization state, and mandatory requirements 11 and 12.
- Annex C, an `unresolved` lawful basis value, required by 7.2.2 and previously absent from the vocabulary.
- Normative references to ISO 3166-1 and to the ISO 8601 series, both relied upon by 7.3.2.

### Changed

- Verbal forms are written in lower case, as in the ISO/IEC Directives, Part 2. Upper case RFC 2119 keywords are removed. Meaning is unchanged.
- `presented_at` is recorded using the ISO 8601 series format in the UTC time zone, replacing "with sufficient precision for dispute resolution".
- `recipient_jurisdictions` and `transfer_mechanism` are Conditional rather than optional, matching the constraint that requires them for cross border transfer or disclosure.
- The `notice_type` value `risk disclosure` becomes the single token `risk_disclosure`.
- Clause 3.5 states issuance and material change as the minimum event types, with optional hooks for withdrawal and objection, matching 7.4.
- Clause 3.3, 3.4, and 7.3 are reconciled: Notice Receipt is the artefact, Anchored Notice Receipt is a classification of it.
- Exposure values are defined once in 7.3.2 as Public, Bilateral, and Restricted.
- CRDI is used throughout. The committed file used both CDRI and CRDI.
- 7.3.3 precedes 7.3.4 in document order.

### DPV companion, v0.3

- Retitled to ANCR DPV Model Extension, with a Convention 108+ legal model and an AI transparency profile.
- Expresses the Authorization State Object specified in extension 7.2.5 rather than minting an independent active state property, so one state model applies across both documents.
- Integrity binding resolves through the Notice Version Object, and AC-BIND-1 becomes a hash comparison test against `notice_hash` and `published_at`.
- Verbal forms are written in lower case.
- Restores the section heading structure, separators, and tables lost in the v0.2 commit.
- Namespace moved out of the W3C DPVCG IRI space to `https://kantarainitiative.github.io/ancr-wg/ns/conv108plus#`, with the migration destination recorded.
- Acceptance criteria added for the items that previously had none.
- `ancr-dpv/README.md` corrected: it named a file that does not exist, stated the wrong status, and omitted two criteria.

### Known open items

Carried into external review and listed in the extension review notes.

1. No JSON Schema for the receipt, the CIR, the event log entry, or the Authorization State Object.
2. No conformance test procedure for C1 to C8.
3. No LICENSE or IPR file in this directory. The IPR position is stated in the Foreword only.
4. No canonicalization rule for computing `notice_hash`, so two conforming implementations can derive different version references for the same notice.
5. No integrity mechanism for an anonymous receipt in place of the per principal HMAC in ISO/IEC TS 27560:2023 Annex E.
6. `full receipt` and `reference receipt` are named in clause 1 but defined nowhere, and no field set is stated for either.
7. The Notice Record has no field specification table, while the CIR and the receipt do.
8. ISO/IEC 29184 is relied upon normatively by 6.1 and 7.6 while cited informatively, because free and open access would be required to list it as normative.
9. The Foreword cites ISO/IEC TS 27568, ISO/IEC FDIS 27091, and ISO/IEC WD 27566-2, none of which appear in clause 2.
10. No jurisdiction profiling rule for lawful basis enumerations that differ from Annex C.
11. No clause level crosswalk to ISO/IEC PWI 26689.
12. No field records which consent construction is in use, so the naming rule in 7.2.2 is normative but not machine testable.
13. The canonical TPI-R variant for this extension is an open working group decision, and the TPI-R methodology has no citable reference in clause 2.

## [Extension, committed file at `a09559d5`] - superseded

The previously committed state of `ancr-ts-27560 Notice Record Extension.md`. It inferred no lawful basis from a receipt in any context, retained `controller_identity_record_id` with a deferral note, stated no schema version value, wrote verbal forms in upper case, and carried no integrity hash or publication time for a notice version.
