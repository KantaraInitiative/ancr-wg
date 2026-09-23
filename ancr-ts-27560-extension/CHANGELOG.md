# Changelog

All notable changes to the documents in `ancr-ts-27560-extension/` are recorded here.

This changelog covers:

- `ancr-ts-27560 Notice Record Extension.md`, the ANCR extension for ISO/IEC TS 27560:2023
- `ancr-dpv/ancr-dpv-extension-spec.md`, the ANCR DPV Model Extension
- `ancr-dpv/README.md`

Version identifiers are document revisions. The receipt schema identifier is versioned separately and is stated in clause 7.3.4 of the extension.

## [Unreleased] - DPV companion v0.4 draft

### Added

- Clause 9, assessment classes over the record (informative): TPI v1 for a controller, TPI v2 for a governance instrument, TPI v3 for a dynamic data control system, with the class fixed by the object under assessment. The indicators and the -3 to +1 scale are those of the ANCR TPI Conformity Specification as applied in Annex E of the extension, mapped to the I elements. TPI v2 carries Layer A and Layer C, baselined to Convention 108+ Article 8.2. TPI v3 is marked proposed, with five indicators for properties that exist only across the lifecycle stages of 7.3.
- Annex A, alignment with ISO/IEC FDIS 27091 operational transparency (informative): each subclause of 27091 Annex B related to this document and to the extension by reference only. No FDIS text is reproduced, and subclause numbers are to be checked against the published standard.
- Clause 11, reference to the ANCR TPI Conformity Specification.

### Changed

- Attribution and publication status renumbered 10, references renumbered 11. The statement on ISO/IEC 27091 now records that its text is not quoted and that Annex A relates it by reference.
- Scope list in clause 1 extended to clause 9 and Annex A.
- `ancr-dpv/README.md` updated to v0.4; "legal model layer" reads "legal model".

## [Unreleased] - v1.0 review amendments, PR #34

### Summary

Amendments made during Working Group review of the v1.0 Release Candidate. Separates the record held by the individual from the record held by the controller, defines the offline notice and its linkage to the online notice, and defines the Annex D Stage 3 artefact. Restores the v0.4 baseline name of the controller record. The receipt schema identifier remains `ancr-notice-receipt-2.0`, which is not yet approved; its controller record field reverts to the v0.4 baseline name, so the rename is removed from the list of breaking changes rather than added to it.

### Added

- 3.28 micro credential, defining the Stage 3 artefact of Annex D.3, with notes separating it from a digital identification credential in the sense of 3.15.
- 3.29 offline notice, notice presented outside an online environment, including a physical sign or printed material.
- 3.30 consent event record, the record of a consent event held by the PII controller in its record of processing activities, bound to the notice version and to the Anchored Notice Receipt. Every other lawful basis is recorded in the same way through 7.4.4.
- 7.2.6 Offline notice linkage: an offline notice carries a resolvable reference to the Controller Identity Record and to the Notice Version Object of the online notice that states its terms; a receipt generated from it binds to that online notice version.
- Introduction, sentence stating that an offline notice is receipted through the online notice it links to.
- 3.31 consent construction, the manner in which a consent authorization is informed and constructed, distinguished by whether the notice relied upon is presented in the context or recorded as a notice version, and by whether identification and location are inherent to the context (in person), recorded through the notice artefacts (online), or assumed. The assumed case covers an offline construction presented through an online interface and remote consent by a means that is not online, such as telephone or post. A note distinguishes it from consent type in ISO/IEC TS 27560:2023, 3.4. The term was used in 3.19 and 7.2.2 without a definition.
- 7.4.4, lawful_basis added to the processing event minimum fields, using the Annex C vocabulary.
- 3.30, Note 3 relating the consent event record to the Authorization State Object: the record carries the event, the Authorization State Object carries the resulting state, and the change is logged as authorization_state_changed.
- Introduction, NOTE after the co-regulated digital identification paragraph: once both rule sets are expressed as records, they can be made operational for personal data control through consent based authorization, carried by the bilateral Authorization State Object, with the individual held record structured by profile B2. Responds to a review comment on PR #34.
- Annex G, dependencies on ISO/IEC 29184:2020 (informative): the clauses of ISO/IEC 29184:2020 on which this document relies, with the clause of this document that relies on each and what it adds. Clause numbers and titles only.
- Annex H, Blinding Identity Taxonomy profile for notice evidence (informative): a field level profile of the Blinding Identity Taxonomy 1.0 for the Anchored Notice Receipt, Notice Event Log entries and the Authorization State Object, so that anonymity by default can be assessed by inspection. 3.14 Note 3 and a NOTE in 7.3.1 refer to it. The Blinding Identity Taxonomy 1.0 and ISO/IEC 20889:2018 added to 2.2.
- 3.32 notice artefact, defining the collective term used throughout the document: any of the records specified in clause 7.
- 7.2.7 Notice Record field specification table (normative), in the form of the CIR and Notice Receipt tables, carrying the fields already required of a Notice Record by 5.1, 7.2.1, 7.2.2 and 7.5. Two field names are new: public_rule_reference, for criterion C4, and profiling_rule_reference, for the profiling rule of 7.2.2 and Annex C. 7.2 points to it in place of the deferral, A.3 maps retention_period to it as optional, and E.2 TPI-2 cites it. Closes open item 7.

### Changed

- 3.22 consent record restored to the wording of ISO/IEC TS 27560:2023, 3.3, with a SOURCE line. The previous text, "Controller retained evidence of consent", redefined the imported term while stating that it did not. In this document the consent record is the record held by the individual, and the controller held counterpart is the consent event record, 3.30.
- 7.2.2, naming rule: the distinction is between a consent record, held by the individual and bilateral, and a consent event record, held privately by the controller. The terms offline consent record and online consent record are withdrawn. An offline notice is stated to be public and receipted through its link to an online notice.
- 7.2.2, offline consent construction: where the lawful basis is consent, the controller held authorization record is a consent event record, 3.30.
- Annex C, consent row aligned with 7.2.2.
- Controller Identification Record renamed Controller Identity Record, abbreviation CIR unchanged, throughout the extension and the DPV companion. The field reverts to its v0.4 baseline name, controller_identity_record_id; controller_identification_record_id, used in v0.5 and the v1.0 Release Candidate, is deprecated, accepted on input for one revision cycle, and not emitted. Reason: the record states the identity of the controller, while identification in 3.11 is carried out by a controller on an individual, and the baseline name is the one used by deployed implementations.
- 7.1.1 NOTE rewritten to state the reverted name and the deprecation.
- 7.3.4, the list of changes that break a v0.4 baseline implementation is reduced from four to three.
- 3.1, notes added: the record states the identity of the controller and corresponds to the party identification section of ISO/IEC TS 27560:2023, 6.3.6; it is not identity in the sense of 3.12 nor identification in the sense of 3.11.
- 3.12, note added confining the entry to the identity of the individual.
- Introduction, sentence added stating that the identity of a controller is public and is recorded in the Controller Identity Record.
- References to ISO/IEC PWI 26689 in the Foreword, 2.2, B.3 and Annex F replaced by the registered title of the preliminary work item and its registering resolution, SC 27 Resolution 2026/32. A preliminary work item number is a temporary designation; the title and resolution remain stable as the work item progresses. Annex F retitled, and its table headings read Registered scope element and Registered justification gap. The SC 44/WG 1 work item was already cited in this form.
- ISO/IEC 29184 moved from 2.1 Normative references to 2.2 Other references, dated 2020, with a NOTE stating that no conformance criterion in clause 5 and no mandatory requirement in clause 8 depends on it, so that the extension remains free and open to access. The NOTE records that availability of ISO/IEC 29184:2020 at no cost would allow it to be used as a public transparency standard and to be listed as a normative reference. 6.1 and 7.6 refer to Annex G, and Annex F, F.1 row 1, points to the 2.2 NOTE and Annex G in place of the NOTE removed in the previous revision. Closes open item 8.
- 3.3 and 3.7: the genus of each definition changed from artefact to record. 7.2.2: "compliance artefact", "authorization artefact" and "transparency artefact … permission artefact" replaced by the specific terms, and the lead-in "Offline and online artefacts are named distinctly" corrected to "Consent records and consent event records are named distinctly", matching the rule it introduces.
- Editorial: bold removed from running text, paragraph lead-ins and list item labels throughout. Headings are unchanged. The same applies to the DPV companion below its title block.
- Editorial: revision history moved out of the body text. Draft names and commit hashes removed from 2.3 NOTE 1, the 7.1.1 NOTE, 7.2.2, 7.3.4 and B.3; "Decision record", "Rationale" and "Lineage note" labels removed, the last becoming a NOTE; self-describing sentences in 7.2.2, 7.2.6, 7.3.4 and A.0 stated directly; Introduction paragraphs open with their subject; "pathways" replaced by "routes" in Annex C. One requirement changed, in 7.3.4: a receipt without a schema version, or with a major component below 2, is not treated as conforming to this document, in place of a reference to the v0.4 file by commit.
- Provisions moved out of NOTEs into the body text: the deprecated field name in 7.1.1, the initiation mode recommendation in 7.2.2, and assurance tiering in 7.4.3. The "Co-regulation note" labels in 7.4.3 and Annex C removed, including "(normative)" on a note. "Note 1 to entry" in 7.4.4 corrected to NOTE. Clause 8 opens with the statement that a conforming implementation shall satisfy each requirement. In 7.2.2, "conformance should additionally require an authorization record" reads "an implementation should maintain an authorization record". Informative Annex D uses "can" and the indicative in place of "should".
- Editorial: restated passages removed from the Introduction, 6.1, 6.2, 7.2.2, 7.2.4, 7.2.5, 7.5, B.3, E.1 and the F NOTE; paragraph lead-in labels removed in 7.2.1 and 7.2.2; "notice and evidence layer" in 3.14 and 7.3.1 reads "notice artefacts, 3.32"; the unused abbreviations CRDI and MVCR removed; "PII Principal" and "PII Controller" in lower case; -ize spelling throughout; the 2.2 NOTE no longer carries the sentence on availability of ISO/IEC 29184:2020 at no cost.
- E.4: TPI-R attributed to the Kantara Initiative ANCR Working Group.
- Header: Reviewer line added; contributors listed on their own line; the memorial to Timothy Edward Lloyd carries his dates and refers to this document and to Annex E.

### Open items added

14. A constraint vocabulary for the Stage 3 micro credential, Annex D.3, and for purpose level conditions on the Authorization State Object, 7.2.5. A candidate vocabulary is to be contributed to the Working Group under the Kantara IPR Policy.
15. Receipt signing and witnessed timestamps. Receipts, Notice Version Objects and Notice Event Log entries are unsigned, carry self-asserted times, and are hosted by the controller, so a controller can replace a notice and its hash under the same version identifier. Candidate: a content-addressed notice_version_reference with the hash carried inline, the Anchored Notice Receipt signed with a key published in the CIR, and published_at and each Notice Version Object witnessed in an external append-only log.
16. Canonical hash representation. The exact octet rule in 7.2.4 fails on dynamically rendered pages, and a per-visitor octet stream gives each visitor a distinct notice_hash that works as a tracker. Candidate: hash a machine readable representation served as a static resource, state whether the hash is over encoded or decoded bytes, and bound Notice Version Object retention.
17. initiation_mode. The default in 7.2.2 depends on principal initiation, which no field records, so it cannot be assessed by inspection under clause 5. Add the field, or remove the default.
18. Authorization State Object chain key. Step 1 of the reconstruction procedure in 7.2.5 retrieves instances by notice_id, which returns the state of every individual under that notice, and no rule resolves two instances superseding the same parent. Candidate: a chain key carried in the individual's receipt, with supersedes authoritative and a fixed precedence rule.
19. CIR binding. controller_identity_record_id may be a string, nothing binds the CIR to domain control or registration, and loss of the resolver leaves receipts unverifiable. A substituted code on an offline notice passes 7.2.4, because the substituted hash matches the substituted content. Candidate: URI form required, an assurance status field, the CIR served from the named origin with an archive mirror, and authorized origins and premises listed in the CIR.
20. 7.4.4 under B.1. Mandatory requirement 10 and 7.4.4 make controller processing records mandatory, while clause 1 places complete records of processing activity out of scope. Move 7.4.4 under profile B1, conditional on a B1 claim.
21. ISO/IEC Directives, Part 2 cleanup: clause 2 limited to normative references, with 2.2 moved to a Bibliography and 2.3 relocated; the standard clause 3 opening paragraph; term entries without capitals or final full stops; numbered NOTEs where a subclause carries more than one; annexes separated into normative and informative and ordered normative first; shall statements outside clause 8 brought within the conformance clause.

## [Extension v1.0 Release Candidate, DPV companion v0.3] - Release 1, for ANCR Working Group candidate review and approval

### Summary

Release 1, released 7 September 2026, as the v1.0 Release Candidate put to the Working Group for candidate review and approval. Continues the lineage of the version circulated to ISO/IEC JTC 1/SC 27/WG 5 as N 5211 (2026-07-16). No schema change: the receipt schema remains `ancr-notice-receipt-2.0`. Closes seven of the thirteen open items carried into external review, and disposes of the remainder below.

### Added

- Annex F, clause level crosswalk to ISO/IEC PWI 26689 as registered by SC 27 Resolution 2026/32. Closes open item 11.
- Annex B.3, entry for the ISO/IEC preliminary work item on an internet transparency code of practice profile, established for ISO/IEC JTC 1/SC 44/WG 1 by resolution of the fifth SC 44 plenary, 3 September 2026, recording where that work item and this document meet and restating the SC 27/WG 5 boundary carried in the resolution.
- Foreword, sentence offering this document as an implementation reference for the SC 44/WG 1 work item, cross referenced to Annex B.3.
- Annex C, normative profiling rule for jurisdictions whose lawful basis enumeration differs from the table, referenced from the notice version in the same manner as the profiling of 7.2.2. Closes open item 10.
- 7.2.4, hash input rule: notice_hash is computed over the exact octet stream retrievable at notice_url, one NVO per representation. Closes open item 4.
- 3.26 full receipt and 3.27 reference receipt, defining the artefacts named in clause 1, with cross references added to the clause 1 bullets. Closes open item 6.
- 2.2, informative citations for the ANCR TPI Conformity Specification v0.9 and for the SC 27/WG 5 work items named in the Foreword, including ISO/IEC PWI 26689. Closes open item 9 and the citation half of open item 13.
- Clause 5, assessment statement: criteria are assessed by inspection of the named artefact, C5 and C8 additionally by the procedures in 7.2.4 and 7.2.5, Annex E for deployed implementations. Addresses open item 2 at assessment level.
- 7.2, composition statement for the Notice Record content; the consolidated field specification table is deferred. Addresses open item 7 at composition level.
- Foreword, document status paragraph: ANCR Working Group approval, Kantara Recommendation track, liaison circulation in continuity with WG 5 N 5211.

### Changed

- Profile B2 renamed from personal processing record structure to personal data control record structure, in clause 5, Annex B.2 and Annex F.2.
- Three passages moved from clause 7.2.2 to the Introduction and rewritten to state the mechanism rather than the outcome: detectability of a receipt already held, the reference joining a code of practice to a disclosure, and the version evidence available to either party across borders. Clause 7.2.2 now carries provisions only.
- Editorial, co-regulation evidence set reads co-regulatory evidence set in 6.2; the decision record in 7.2.2 carries its supersession statement as a parenthetical note.
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
