# ANCR Extension for ISO/IEC TS 27560:2023

Anchored Notice and Consent Receipts for operational transparency. A notice receipt profile and extension of ISO/IEC TS 27560:2023.

**Release:** Release 1, 23 September 2026.
**Revision:** v1.0 Release Candidate, put to the ANCR Working Group for candidate review and approval.
**Editor:** Mark Lizar.
**Reviewers:** Sal D'Agostino.
**Contributors:** Gigliolla Agassini, Sal D'Agostino, Paul Knowles, Daniel Schleifer, Tim Lloyd, Michele Drgon.

In memory of Timothy Edward Lloyd, 27 January 1965 to 25 August 2026

Tim Lloyd was a member of the Anchored Notice and Consent Receipt Working Group and a contributor to the Transparency Performance Indicators Recommendation, to which Annex E of this document refers. He was a natural and passionate facilitator, and took part in the discussions that shaped the four indicators and the idea behind them: that a person is entitled to know who is identifying them before it happens, and that this can be measured. Tim passed away during the preparation of this document. The Working Group dedicates it to him, with gratitude for his contribution and for his company in the work. The ANCR Working Group

## Foreword

This document specifies a notice receipt information structure that profiles and extends ISO/IEC TS 27560:2023, consent record information structure. It is published by the Kantara Initiative and the Anchored Notice and Consent Receipt (ANCR) Working Group as a companion specification. It is intended to be cited as prior art and as an implementation reference for SC 27/WG 5 work that depends on machine readable notice and consent records, including contributions to ISO/IEC 27560, ISO/IEC TS 27568, ISO/IEC FDIS 27091 Annex B.4, and ISO/IEC WD 27566-2 Annex F. A crosswalk to the registered scope of the SC 27/WG 5 preliminary work item *Gap analysis for standards on privacy notices and consent and ways to address potential gaps*, registered by SC 27 Resolution 2026/32, is provided in Annex F of this document. It is further offered as an implementation reference for the ISO/IEC JTC 1/SC 44/WG 1 preliminary work item *Internet Transparency Code of Practice Profile through privacy by design*, established by resolution of the fifth ISO/IEC JTC 1/SC 44 plenary, 3 September 2026, which aligns that work item to ISO/IEC 29100, ISO/IEC 29184 and ISO/IEC TS 27560:2023.

Document status. This v1.0 Release Candidate is Release 1 of this specification and is presented for candidate review and approval by the ANCR Working Group and, upon approval, for progression toward a Kantara Initiative Recommendation in accordance with Kantara operating procedures. The Working Group approved version is intended for circulation to ISO/IEC JTC 1/SC 27/WG 5 as a liaison contribution to the work items named above, in continuity with WG 5 N 5211.

IPR note. This ANCR record specification is required to be open. It is published under the Kantara Initiative patent and copyright terms: reciprocal royalty free, with opt out to reasonable and non discriminatory (RAND) licensing. Kantara is chartered to contribute the completed consent receipt work to ISO/IEC SC 27/WG 5.

## Introduction

A receipt is the ordinary evidence of an exchange: it records who was involved, what took place, and the time and place, and each party keeps a copy that can be referenced after the fact. In digital identification, the individual is identified through identifiers presented, collected, linked, and inferred, while the controllers and processors doing the identifying are not identified to the individual in any record the individual holds. The individual has no durable evidence of who was accountable, what notice applied, or what was disclosed at the time. A notice receipt records the identification of the controller and the notice it published, so that the claims carried over an individual's identifiers can be verified without creating any new identifier about the individual.

A notice receipt is generated wherever notice occurs: at a physical sign, an access point, a device, or an online notification or statement. An offline notice, such as a physical sign, is linked to the Controller Identity Record and to the online notice that states its terms, and the receipt binds to that online notice version, see 7.2.6. The disclosure event exists whether or not the individual interacts with the notice, and evidence of the event can be generated either way. The receipt can be issued by the controller in the course of presenting the notice, or generated independently by the individual: working from the notice itself, the individual accesses, or creates, the Controller Identity Record and produces proof of notice disclosure anchored to it. By default the receipt identifies the controller. It requires no identification of the person who generates it, and it is portable, exchangeable between devices and across borders.

This profile is specified for co-regulated identification, 3.10. Co-regulation means one public policy with two rule sets operating on the same identifier at the same time: the controller's own rules, expressed in service terms, technical design, and internal policy; and the public rules, expressed in treaty, law, and standards. Under self regulation alone the identifier is privately defined, and state regulation alone produces no artefacts that can be inspected at the time of interaction. This profile supplies the record structure through which the public rule set can be read by machine and inspected.

NOTE: Once both rule sets are expressed as records, they can be made operational for personal data control through consent based authorization. The authorization is carried by an Authorization State Object, 3.25, which is bilateral, so the individual can inspect and exercise the authorization state under both the controller's rules and the public rules. The individual's own record of that control is structured by profile B2, see Annex B.2.

Identity is self expression and self identification, managed by the individual. The identity of a controller is public, and this profile records it in the Controller Identity Record. Identification is the technical and organizational process a controller uses to discover, link, or assert claims about a person. The two are governed differently: consent is a human expression managed by humans, while permissions are managed by organizations and systems. Where the two are conflated, an interface permission is presented as consent. This profile keeps them separate by requiring controller identification, and the notice bound to it, before any demand for personal identification.

A notice receipt makes notice already given detectable. It carries the immutable reference to the notice version it was issued against, and that reference resolves to the version object holding the integrity hash and the publication time. A controller presenting notice can establish whether a receipt is already held for the version in effect, and an individual can establish the same thing without asking the controller. Where a receipt is held for the version in effect, a repeated prompt indicates that the notice has changed.

Physical signs, privacy policy pages, and published codes of conduct state what a controller undertakes. They do not carry the version in effect at a particular disclosure, or an artefact joining the two. The Notice Record states the applicable public rule set, and the Controller Identity Record carries that reference in resolvable form, so an undertaking published under a code and a disclosure made under it are joined by an identifier. A code extends the record by context and by jurisdiction without the record structure changing.

Transfer mechanisms bind an exporter and an importer to terms. An individual relying on those terms can obtain a copy of the promise, but not a record of the event: what was disclosed, when, and under which version of the notice. Binding each receipt to an immutable notice version reference, and recording issuance and material change in the Notice Event Log, means the version in effect at a stated time can be established from the record by either party independently.

Relationship to related instruments (informative).

```text
ISO/IEC 29100 Privacy framework
  ↓
ISO/IEC 29184 Online privacy notices and consent
  ↓
ISO/IEC TS 27560:2023 Consent record information structure
  ↓
This profile: Notice Record + Notice Receipt + Notice Event Log
  ↓
Applicable code of conduct, code of practice, privacy policy, or law (jurisdiction specific)
```

## 1 Scope

This profile extends ISO/IEC TS 27560:2023, the technical specification that adopted the Minimum Viable Consent Receipt specification titled Consent Receipt v1.1. This profile specifies a machine readable online Notice and Consent Record and a corresponding Notice Receipt that together provide durable evidence of notice disclosure.

This profile specifies the record structure through which identification is co-regulated. Controller identification shall precede any demand for personal identification, and the artefacts specified in clause 7 shall be inspectable independently of any personal identifier. Where an implementation demands personal identification before a resolvable Controller Identity Record (CIR) and its bound online notice version are available, that implementation does not conform to this profile.

The profile supports layered and sequenced notices, notifications, and disclosures. Its requirements are lawful basis agnostic. Where the lawful basis is consent, the corresponding authorization can be represented as a specialization of the TS 27560:2023 consent receipt.

The base extension defines a minimum interoperable set of notice artefacts for operational online notice transparency and contextual integrity:

- Controller Identity Record (CIR)
- Notice Record
- Notice Receipt, including the Anchored Notice Receipt classification
- Notice Event Log
- Reference integrity and version binding, through notice_id and notice_version_reference

Interaction with an online Notice Record results in a Notice Receipt, which is either:

- a full receipt, containing the required record fields, see 3.26, or
- a reference receipt, containing the minimum fields plus stable references and a rights payload, see 3.27.

NOTE: Notice, notification, disclosure, and statement sequences differ according to context.

1. In person, peer to peer, using a device, where notice and identity are physically verifiable.
2. Remote, not in person, where identity is not physically verifiable and controller identification is therefore required.

Out of scope for the base extension, and addressed by optional annexes or companion specifications:

- Authorization exchange protocol mechanics beyond the Anchored Notice Receipt
- Tokens, credentials, and wallet portability mechanisms
- Complete records of processing activity requirements
- Cross border security requirements beyond baseline notice disclosure
- AI lifecycle governance requirements beyond baseline notice disclosure

## 2 References

### 2.1 Normative references

- ISO/IEC TS 27560:2023, Privacy technologies: consent record information structure
- ISO/IEC 29100, Information technology: security techniques: privacy framework
- ISO 3166-1, Codes for the representation of names of countries and their subdivisions, Part 1: Country codes
- ISO 8601 (all parts), Date and time, representations for information interchange

### 2.2 Other references (informative)
- ISO/IEC 29184:2020, Information technology: Online privacy notices and consent
- Blinding Identity Taxonomy 1.0, Kantara Initiative Information Sharing Interoperability Work Group, Kantara Initiative Report, 15 June 2020
- ISO/IEC 20889:2018, Privacy enhancing data de-identification terminology and classification of techniques
- W3C Data Privacy Vocabularies and Controls Community Group, Consent Records and Receipts as per ISO/IEC TS 27560:2023 using DPV, https://w3id.org/dpv/guides/consent-27560
- ANCR DPV Model Extension, Convention 108+ legal model with an AI transparency profile, external review draft v0.3, Kantara Initiative ANCR Working Group, available at https://github.com/KantaraInitiative/ancr-wg/tree/main/ancr-ts-27560-extension/ancr-dpv. This companion document expresses the artefacts specified here in DPV terms and anchors them to the modernised Convention 108, see Annex B.3.
- ANCR TPI Conformity Specification, v0.9, Kantara Initiative ANCR Working Group, available at https://github.com/KantaraInitiative/ancr-wg/tree/main/TPI. Methodology for the TPI-R assessment applied in Annex E.
- The SC 27/WG 5 work items to which this document is contributed, cited in the Foreword and tracked in B.3: ISO/IEC 27560 (revision, structure of PII processing records), ISO/IEC WD TS 27568 (digital twins), ISO/IEC FDIS 27091 (AI privacy protection), ISO/IEC WD 27566-2 (age assurance, Part 2), and the preliminary work item *Gap analysis for standards on privacy notices and consent and ways to address potential gaps*, registered by SC 27 Resolution 2026/32, see Annex F. These work items are under development, and their stages are as at the date of this document.

NOTE: ISO/IEC 29184:2020 is cited informatively. No conformance criterion in clause 5 and no mandatory requirement in clause 8 depends on it. The clauses of ISO/IEC 29184:2020 on which this document relies, and what this document adds to each, are set out in Annex G.

### 2.3 Verbal forms for the expression of provisions

The verbal forms used in this document are those defined in the ISO/IEC Directives, Part 2. A requirement is expressed by "shall" and "shall not". A recommendation is expressed by "should" and "should not". Permission is expressed by "may". Possibility and capability are expressed by "can".

NOTE 1: The verbal forms are written in lower case, as they are in the ISO/IEC Directives, Part 2. Upper case forms following the RFC 2119 convention carry the same meaning.

NOTE 2: This document does not use "must" to express a requirement. Where "must" appears in explanatory text it carries no normative weight.

## 3 Terms and definitions

Terms and definitions given in ISO/IEC TS 27560:2023 and ISO/IEC 29100 apply, together with the following.

### 3.1 Controller Identity Record

Publicly accessible controller accountability record, used as the anchor for notice and receipt generation.

Note 1 to entry: The record states the identity of the controller, comprising its name, address, jurisdiction, public identifier and access points. It corresponds to the party identification section of ISO/IEC TS 27560:2023, 6.3.6, see Annex A.

Note 2 to entry: The identity recorded is that of the controller. It is not identity in the sense of 3.12, and it is not a record of identification in the sense of 3.11.

### 3.2 Notice Record

Versioned, controller maintained record of notice content.

### 3.3 Notice Receipt

Bilateral record evidencing that a specific notice version was disclosed or presented to an individual at a stated time.

### 3.4 Anchored Notice Receipt

Classification of Notice Receipt applied to the first Notice Receipt issued for a given notice version disclosure event.

Note 1 to entry: Where the lawful basis is consent, the Anchored Notice Receipt carries the proof of notice disclosure on which valid consent depends, and subsequent authorization receipts link back to it.

Note 2 to entry: The classification is carried by the anchored_notice_receipt field and the anchored_notice_receipt_id linkage field, see 7.3.

### 3.5 Notice Event Log

Append only record of lifecycle events relating to notices and receipts, including, at minimum, issuance and material change, with optional hooks for withdrawal and objection events.

Note 1 to entry: The minimum event types are stated in 7.4.1, and the hooks for withdrawal, objection, and rights exercise are recommended in 7.4.3.

### 3.6 notice_version_reference

Immutable reference to the notice version in effect at the time of disclosure.

Note 1 to entry: The reference resolves to a Notice Version Object, 3.24, which carries the integrity hash and the publication time of that version, see 7.2.4.

### 3.7 transparency statement

Versioned disclosure record expressing the standing terms of notice, including controller identification, processing context, and rights mechanisms, suitable for audit and stable referencing.

Note 1 to entry: In this profile the transparency statement is realized as the Notice Record, see 7.2.

### 3.8 transparency notification

Event bound message signalling that a transparency relevant event has occurred, for example issuance, material change, or a rights lifecycle event.

Note 1 to entry: In this profile the transparency notification is realized as a Notice Event Log entry, optionally accompanied by a receipt carrying notice_type = notification, see 7.4.

### 3.9 reciprocal and proportionate transparency

Disclosure property in which the processing capabilities of the technology in use, and the practical rights controls available to the individual, are stated so that what the technology can do is matched by what the individual can see and control.

### 3.10 co-regulated identification

Use of digital identification mechanisms under two concurrent rule sets, the controller's own rules and the applicable public rules of treaty, law, and standards, implemented so that the public rules are expressed as inspectable record structure and are verifiable before identification occurs.

Note 1 to entry: Co-regulated identification does not restrict which identification technology is used. It constrains the sequence and the evidence: accountable controller identification, machine readable notice, and a durable receipt precede personal identification.

Note 2 to entry: Conformance is assessed through the artefacts in clause 7.

### 3.11 identification

Technical and organizational process by which a controller recognises, links, or asserts claims about an individual, including the assignment or inference of identifiers.

### 3.12 identity

Self expression and self identification managed by the individual, including the individual's own choice of which identifiers to bind to a given Controller Identity Record.

Note 1 to entry: This entry defines the identity of the individual. The identity of the controller is recorded in the Controller Identity Record, 3.1.

### 3.13 minimum notice disclosure

Smallest set of disclosures that is present, resolvable, and inspectable before identification or processing begins, comprising the Controller Identity Record, the notice version in effect, the asserted lawful basis, the scope of disclosure, and the privacy access point.

Note 1 to entry: The requirement to make this set available is stated in 7.2.3 and tested by criterion C2 in 5.1.

### 3.14 anonymity by default

Property whereby notice disclosure and the resulting evidence artefacts are generable, retrievable, and verifiable without identification of the individual, and without an account_id or a pii_principal_id.

Note 1 to entry: Anonymity by default applies to the notice artefacts, 3.32. It does not restrict identification required by the lawful basis for the processing itself.

Note 2 to entry: Retrieval of a Controller Identity Record is not an identification event, see 7.1.

Note 3 to entry: Annex H gives a field level profile, drawn from the Blinding Identity Taxonomy, against which the absence of identifying data in the evidence artefacts can be inspected.

### 3.15 non-exclusion

Property whereby the minimum notice disclosure and the routes to recourse are reachable through at least one privacy_access_point modality that does not require the individual to hold, present, or authenticate a digital identification credential.

Note 1 to entry: Non-exclusion addresses accessibility needs, low or absent connectivity, delegated and assisted interaction, and in person contexts where notice and identity are physically verifiable.

### 3.16 notice

Disclosure made before processing, authorization, identification, or consent.

### 3.17 online notice

Notice presented, published, or made inspectable in an online environment.

### 3.18 digital transparency

Online notice made machine readable, versioned, inspectable, evidenced, and receipted.

### 3.19 consent

Freely given, specific and informed agreement of the PII principal to the processing of their PII.

[SOURCE: ISO/IEC TS 27560:2023, 3.1]

Note 1 to entry: This document does not redefine consent. The term is imported unchanged from ISO/IEC TS 27560:2023. In operational terms this document describes consent as human managed legal authorization given after sufficient notice and meaningful choice, realized through the artefacts in clause 7. The term this document adds is online consent, 3.20.

Note 2 to entry: Where consent is the lawful basis, consent references the prior notice disclosure event on which it depends, as specified in 7.6.

Note 3 to entry: A construction in which offline consent, where the identity and the location of the individual are assumed rather than recorded, is presented through an online interface is not online consent as defined in 3.20. Such a construction is governed by the applicable data protection regulation, see 7.2.2.

### 3.20 online consent

Consent expressed online, where notice, choice, action, and the resulting evidence are represented by machine readable records of the interaction.

Note 1 to entry: Online consent is the mechanism through which the individual controls processing of their own data online. Identity and location are recorded through the notice artefacts rather than assumed.

Note 2 to entry: Online consent is the default interpretive context for digital identification, see 7.2.2.

### 3.21 permission

Technical allow or deny control.

Note 1 to entry: An interface permission presented as consent is not consent in the sense of 3.19.

### 3.22 consent record

information record describing a personally identifiable information (PII) principal's consent for processing of their PII, and the time and manner of a PII principal's acceptance of their PII processing notice

[SOURCE: ISO/IEC TS 27560:2023, 3.3]

Note 1 to entry: In this document the consent record is the record held by the individual, consistent with the provision of a record of the consent to the PII principal stated in the scope of ISO/IEC TS 27560:2023. It is bilateral and linked to the Anchored Notice Receipt on which the consent depends.

Note 2 to entry: The record of the same consent held by the controller is the consent event record, 3.30. The two are distinct artefacts and are named distinctly, as required by 7.2.2.

### 3.23 two factor online notice

Notice event in which presentation controls and evidence receipt generation are both present.

Note 1 to entry: The two factors are counted within one notice event. Two factor online notice is not an assurance level. It does not denote a repeated notice, a round in a notification sequence, or a second presentation of the notice, which is the pattern commonly described as prompt fatigue. It denotes proof of the same notice event.

Note 2 to entry: The pre-authorization disclosure baseline in this document is expressed by minimum notice disclosure, 3.13, and anonymity by default, 3.14. Adjacent usage of factor labels is described in the NOTE in 6.1.

### 3.24 Notice Version Object

Structured object representing one version of a Notice Record, comprising the location at which the version is retrievable, the version identifier, the integrity hash of the notice content as published, and the time of publication.

Note 1 to entry: The Notice Version Object is the object that notice_version_reference resolves to. Its field set and the verification procedure applied to it are specified in 7.2.4.

Note 2 to entry: The object carries the integrity claim. Without a published hash and a publication time, a version reference is indistinguishable from a pointer to a mutable resource.

### 3.25 Authorization State Object

Structured object representing the authorization state relied upon for a processing context at a stated time, comprising the state of authorization for each disclosed purpose and the validity state of the record that carries it.

Note 1 to entry: One object carries both states. Per purpose authorization state and record validity are properties of the same object, and an implementation does not maintain them as two objects, see 7.2.5.

Note 2 to entry: The object applies under any lawful basis. Where the lawful basis is consent, it carries the consent authorization state, and it is the object referred to in 7.2.2 as dynamic active state based authorization.

Note 3 to entry: The field set, the state vocabularies, and the reconstruction procedure are specified in 7.2.5.

### 3.26 full receipt

Notice Receipt that carries inline the fields of 7.3.2 marked mandatory, together with the conditional fields that apply to the disclosure event.

Note 1 to entry: A full receipt repeats content that a reference receipt carries by reference. See clause 1 and Annex A.3.

### 3.27 reference receipt

Notice Receipt that carries the fields of 7.3.2 marked mandatory, together with resolvable references to the Controller Identity Record and to the applicable Notice Version Object, and the applicable Annex C rights and obligations row reference.

Note 1 to entry: The referenced content is not repeated in the receipt. Where resolution is not available to the relying party, notice_version_reference carries notice_version_id and notice_hash directly, see 7.2.4.

### 3.28 micro credential

Credential or signed assertion, derived from an authorization receipt that links to an Anchored Notice Receipt, that carries the binding identifiers of that Anchored Notice Receipt and is used by a relying party to enforce the authorization in a protocol without resharing the content of the receipt.

Note 1 to entry: The binding identifiers are controller_identity_record_id, notice_version_reference and receipt_id, see Annex D.3.

Note 2 to entry: A micro credential is not a digital identification credential in the sense of 3.15. It asserts an authorization state, not a claim about the individual, and it is not required of the individual to reach the minimum notice disclosure.

Note 3 to entry: A micro credential is invalidated or superseded when the notice version or the authorization state from which it is derived changes, see Annex D.5.

### 3.29 offline notice

Notice presented outside an online environment, including a physical sign or printed material.

Note 1 to entry: An offline notice is linked to the Controller Identity Record and to an online notice, 3.17, that states its terms, so that a Notice Receipt can be generated and verified for it, see 7.2.6.

### 3.30 consent event record

Record held by the PII controller, within its record of processing activities, of an event in which consent is given, refused, modified or withdrawn, bound to the notice version and to the Anchored Notice Receipt on which the consent depends.

Note 1 to entry: Where the lawful basis is not consent, the corresponding controller held record is a processing event record under that basis, see 7.4.4. Every lawful basis is recorded in the same way.

Note 2 to entry: The consent event record is the controller side counterpart of the consent record, 3.22, and is structured by profile B1, see Annex B.1.

Note 3 to entry: A consent event record records the event. The authorization state that results from it is carried by an Authorization State Object, 3.25, whose change is logged in the Notice Event Log as authorization_state_changed, see 7.2.5.

### 3.31 consent construction

Manner in which a consent authorization is informed and constructed, distinguished by whether the notice relied upon is presented in the context or recorded as a notice version, and by whether the identification and the location of the individual are inherent to the context, recorded through the notice artefacts, or assumed.

Note 1 to entry: In person, identification and location come with the context: the individual is present, and notice and identity are physically verifiable, see the NOTE in clause 1. They are not recorded because the context supplies them. An in person interaction that uses a device can also record them.

Note 2 to entry: Where identification and location are neither inherent to the context nor recorded, they are assumed. This is the case where an offline construction is presented through an online interface, and where consent is given remotely by a means that is not online, such as by telephone or by post. An assumed construction is not online consent, 3.20, see 3.19, Note 3, and 7.2.2.

Note 3 to entry: Online consent, 3.20, is the construction in which the notice is recorded as a notice version, see 7.2.4, and identification and location are recorded through the notice artefacts. An offline notice, 3.29, presents the notice in the context and links it to a recorded notice version, see 7.2.6.

Note 4 to entry: Consent construction is distinct from consent type, ISO/IEC TS 27560:2023, 3.4, which describes the way in which consent is expressed by the PII principal. Consent type states how consent is expressed; consent construction states how the conditions for relying on it are supplied. The term does not refer to the interpretation of a consent or to consent deemed to have been given.

Note 5 to entry: The construction in use, not the presence of a receipt, determines how a disclosure event is interpreted, see 7.2.2.

### 3.32 notice artefact

Any of the records specified in clause 7, namely the Controller Identity Record, the Notice Record, the Notice Version Object, the Notice Receipt, a Notice Event Log entry and the Authorization State Object.

### 3.33 resolution path

means by which a Controller Identity Record is made resolvable to a party inspecting it, whether served by the controller directly or through a registry operator

### 3.34 registry operator

party that operates a registry, directory or equivalent service through which Controller Identity Records, Notice Records or receipts relating to other parties are resolved

Note 1 to entry: A registry operator is a PII controller for PII it processes for its own purposes in operating the service, and can act as a PII processor where it serves records on the instruction of the controller to which they relate. In either capacity it holds a Controller Identity Record, 3.1. This document specifies no separate artefact for it.

Note 2 to entry: Issuing a listing, being accountable for the service, and running the serving infrastructure can be held by one party or by several. Where they are held by several, each is identified under B.5.1.

### 3.35 operator intervention

alteration, suspension, withdrawal or re-registration of a record by a registry operator, other than at the instruction of the controller to which the record relates

### 3.36 online notice notary

party, other than the controller, that witnesses the publication of a notice version, or the issuance of a Notice Receipt or a Notice Event Log entry, and issues a proof over its hash and the time of witnessing, without access to the content witnessed or to the identity of the individual

Note 1 to entry: The proof issued is the notary proof verified in 7.2.4, step 4.

Note 2 to entry: An online notice notary is a PII controller for PII it processes for its own purposes in operating the service, and holds a Controller Identity Record, 3.1.

## 4 Abbreviated terms

| Abbreviation | Expansion |
| --- | --- |
| ANCR | Anchored Notice and Consent Receipt |
| ASO | Authorization State Object |
| CIR | Controller Identity Record |
| NVO | Notice Version Object |
| PII | Personally identifiable information |
| RoPA | Record of processing activities |
| TPI-R | Transparency Performance Indicator Report |
| TS | Technical specification, used here for ISO/IEC TS 27560:2023 |
| URI | Uniform resource identifier |
| URL | Uniform resource locator |
| 2FN | Two factor online notice |

## 5 Conformance

An implementation conforms to the base extension if it satisfies every mandatory requirement in clause 8. An implementation may additionally claim conformance to the optional profiles defined in Annex B, that is profile B1, PII processing record structure, profile B2, personal data control record structure, and profile B5, registry operator and online notice notary accountability.

Relationship to conformance with ISO/IEC TS 27560:2023. This document is an extension of ISO/IEC TS 27560:2023 and is not a stand alone specification. An implementation that conforms to this document conforms to ISO/IEC TS 27560:2023 for the record content it carries, subject to the single declared deviation in A.0, which relaxes the requirement for pii_principal_id. A controller that requires conformance to ISO/IEC TS 27560:2023 without that deviation shall populate a principal identifier in the controller held record as described in A.0, while keeping the individual side Anchored Notice Receipt free of it.

Conformance to ISO/IEC TS 27560:2023 alone does not constitute conformance to this document, because clause 7 specifies artefacts that the technical specification does not: the Controller Identity Record, the Notice Version Object, the Authorization State Object, and the Notice Event Log.

Assessment of the criteria in 5.1 is by inspection of the artefact each criterion names. C5 and C8 are additionally testable by the normative procedures in 7.2.4 and 7.2.5. Annex E provides the assessment profile for deployed implementations.

### 5.1 Co-regulation conformance criteria

An implementation claiming conformance to co-regulated identification shall satisfy all of the following.

- C1 Sequence. A resolvable Controller Identity Record is available before any demand for personal identification.
- C2 Minimum notice disclosure. The elements described in 3.13 are resolvable at the time of the disclosure event.
- C3 Anonymity by default. The Anchored Notice Receipt is generable and verifiable without an account_id or a pii_principal_id.
- C4 Public rule reference. The Notice Record states the applicable public rule set by reference to the code of conduct, code of practice, or legal instrument relied upon.
- C5 Evidence. A Notice Event Log entry exists for issuance and for each material change, and each receipt binds to an immutable notice_version_reference that resolves to a Notice Version Object whose notice_hash matches the notice content retrieved at the time of assessment, see 7.2.4.
- C6 Reciprocal and proportionate disclosure. The disclosure set in 7.2.1 is published and bound to the notice version in effect.
- C7 Non-exclusion. At least one privacy_access_point modality is operable without the individual holding, presenting, or authenticating a digital identification credential, and the minimum notice disclosure is retrievable through that modality.
- C8 Authorization state. Where authorization state is relied upon for the processing context, a single Authorization State Object exists as specified in 7.2.5, each state change is recorded in the Notice Event Log against the same notice_id and notice_version_reference, and the state applying at a stated past time is reconstructable from the record.

An implementation that satisfies C1 to C8 for a given notice version may assert co-regulated identification conformance for the processing context covered by that version. Conformance is asserted per notice version, not per organization.

## 6 Overview of notice artefacts and reference integrity

### 6.1 Two factor online notice and receipt evidence

This profile supports a two factor online notice pattern (2FN) for establishing durable evidence of notice disclosure and, where applicable, of consent.

- Factor 1, presentation controls. The notice is presented using ISO/IEC 29184 aligned presentation controls, for example layered presentation, timing, and interaction patterns, reusable across notice types, see Annex G.
- Factor 2, evidence receipt. A Notice Receipt is generated as durable evidence that a specific notice version was presented or available at a specific time. Where the lawful basis is consent, the receipt supports proof of informed consent by binding the authorization state to the disclosed notice version.

Implementations should treat 2FN as an interoperability pattern. The presentation controls establish a consistent experience and meaningful choice. The receipt provides verifiable, referenceable evidence for audit, later inquiry, and dispute resolution.

NOTE: The two factor online notice pattern originates in the Minimum Viable Consent Receipt, where 2FN denotes the mode in which the PII principal initiates the interaction: the individual approaches a physical sign, an access point, a device, or an online notice, the notice is presented, and a bilateral receipt is returned. The two factors are counted within a single notice event, see 3.23.

Initiation modes. A notice disclosure event is either principal initiated, where the individual seeks the notice in order to discover, or controller initiated, where the controller presents the notice in the course of offering or operating a service. Both modes produce the same artefact set specified in 6.2, and the requirements of this profile apply to both without variation. The initiation mode affects only the operational interpretation of the disclosure event, as specified in 7.2.2.

NOTE: Where this profile is read alongside work items that use one factor notice and two factor notice to denote rounds in a disclosure and authorization sequence, the two usages count different things. The equivalent here of a controller side pre-authorization disclosure minimum is the minimum notice disclosure in 3.13, together with the anonymity by default requirements in 3.14, 7.3.1, and criterion C3.

### 6.2 The notice artefact set

1. Controller Identity Record, the accountability anchor
2. Notice Record, the versioned notice content
3. Notice Receipt, including the Anchored Notice Receipt classification, the disclosure evidence
4. Notice Event Log, the lifecycle evidence

Together these four artefacts constitute the co-regulatory evidence set. Two factor online notice, 6.1, produces the set.

### 6.3 Reference integrity and version binding

A Notice Receipt shall reference:

- notice_id, the stable family identifier
- notice_version_reference, the immutable version reference

A material change to a notice, including a change to purposes, lawful basis, recipients or jurisdictions, retention, or rights mechanisms, shall:

- create a new notice version, represented by a new Notice Version Object with a new notice_hash and a new published_at, see 7.2.4, and
- create a corresponding Notice Event Log entry.

Historic notice versions shall be retained for as long as any processing or record depends on them.

## 7 Notice record specifications

### 7.1 Controller Identity Record

The CIR is the accountability anchor for co-regulated identification. The CIR shall be resolvable before any demand for personal identification, shall be retrievable without authentication, and shall not require the individual to identify in order to retrieve it. Retrieval of a CIR shall not be recorded as an identification event.

#### 7.1.1 CIR minimum field set

A CIR shall include at minimum:

- controller_identity_record_id
- controller_public_id_uri
- controller_name
- jurisdiction
- privacy_access_point, structured

A CIR should include:

- controller_address
- code_of_conduct, where applicable
- notice_event_log_url

A CIR may include:

- derogation_reference, for lawful withholding

The field name controller_identification_record_id is deprecated. Implementations shall emit controller_identity_record_id, and should accept controller_identification_record_id on input for one revision cycle.

NOTE: The record states the identity of the controller. Identification in the sense of 3.11 is carried out by a controller on an individual, and identity in the sense of 3.12 belongs to the individual; neither is what this record describes.

#### 7.1.2 CIR field specification table (normative)

| Field | Description | Required | Value type | Constraints | Exposure | TS 27560:2023 anchor |
| --- | --- | --- | --- | --- | --- | --- |
| controller_identity_record_id | Stable identifier for the CIR | Yes | URI or string identifier | The value shall be stable and suitable for reference by receipts and event log entries | Public | 6.3.6.2 party_id, controller party |
| controller_public_id_uri | Public resolvable controller identifier | Yes | URI | The value shall be resolvable or dereferenceable by intended relying parties | Public | 6.3.6.5 party_url, closest anchor |
| controller_name | Controller legal name | Yes | String | The value shall represent the accountable controller entity | Public | 6.3.6.7 party_name |
| jurisdiction | Applicable jurisdiction indicator or pointer | Yes | Code or string | The value shall be present, and may point to a code of conduct reference | Public | 6.3.4.17 jurisdiction, PII processing |
| privacy_access_point | Rights and contact access modalities | Yes | Array of objects | Each entry shall include type, value, and label | Public | 6.3.6.9 party_contact, closest anchor |
| notice_event_log_url | Pointer to the notice event log service or resource | No | URI | When present, should be publicly discoverable | Public | Extension field |
| controller_address | Controller address | No | String or structured address | No additional constraint | Public | 6.3.6.3 party_address, closest anchor |
| code_of_conduct | Pointer to the authoritative code of conduct or code of practice | No | URI | When present, should be versioned | Public | 6.3.4.21 codes_of_conduct, closest anchor |
| derogation_reference | Lawful withholding or derogation metadata | No | Object | When present, should include reference_uri, authority, and valid_until | Public or Restricted | Extension field |

#### 7.1.3 privacy_access_point

privacy_access_point shall support multiple modalities. Each modality entry shall include type, value, and label.

At least one modality shall be operable without the individual holding, presenting, or authenticating a digital identification credential, and shall provide access to the minimum notice disclosure described in 3.13. Where the controller's context includes in person, assisted, or offline interaction, the modality set should include a non digital or assisted channel. An implementation that provides recourse only through an authenticated digital channel does not satisfy non-exclusion, see 3.15 and criterion C7.

#### 7.1.4 derogation_reference

Where lawful derogations apply, derogation_reference should include reference_uri, authority, and valid_until.

### 7.2 Notice Record

A Notice Record shall be versioned and resolvable, so that a Notice Receipt can reference an immutable version.

The Notice Record is the machine readable transparency statement defined in 3.7. A notification about issuance or change is the transparency notification defined in 3.8, and is represented as a Notice Event Log entry, optionally accompanied by a receipt carrying notice_type = notification, referencing the relevant notice_version_reference.

The content of a Notice Record comprises the disclosure set specified in 7.2.1, represented as immutable versions through the Notice Version Object specified in 7.2.4, with issuance and change recorded in the Notice Event Log specified in 7.4. The fields of a Notice Record are specified in 7.2.7.

#### 7.2.1 Reciprocal and proportionate transparency disclosure set

For each Notice Record version relied upon by a receipt, the controller shall publish a technology and controls disclosure set that is:

- bound to the exact notice_version_reference in effect at the time of disclosure, and
- publicly retrievable, either inline in the Notice Record or by stable reference.

The disclosure set shall include at minimum:

- technology_in_use
- controls_available_primary
- associated_or_derivative_controls, where applicable
- secondary_purposes_of_use, where present
- limitations_or_derogations_on_controls, where applicable

The Notice Record shall include a stable pointer to the disclosure set using transparency_disclosure_reference, unless the full disclosure set is embedded inline in the Notice Record.

A change to the disclosure set that affects the technology classes in use, the availability, scope, or effect of practical rights controls, or the secondary purposes, shall be treated as a material change, and shall trigger a new notice version and a corresponding Notice Event Log entry, see 6.3 and 7.4.

The disclosure set is the measurable test of co-regulation. Where the capability of the technology in use exceeds the controls disclosed as available to the individual, the disclosure is not proportionate, and the identification is not co-regulated for that notice version. Implementations shall state limitations and derogations on controls explicitly, so that any shortfall is inspectable.

#### 7.2.2 Lawful basis interoperability

The Notice Receipt structure shall support every lawful basis available under applicable law. Each lawful basis carries distinct rights, obligations, and dispute triggers.

Implementations shall state the asserted lawful basis in the receipt header, and shall publish the applicable rights and obligations variant using the Annex C table structure.

The lawful_basis value records the basis asserted by the controller at the time the notice version was presented. It shall not be interpreted as evidence that the asserted basis was validly established.

Where the notice is an online notice presented in a digital identification context, the individual initiates the interaction in order to discover, and the interaction is a two factor online notice returning a bilateral Anchored Notice Receipt, the default interpretation of the disclosure event is online consent as defined in 3.20, unless another lawful basis is explicitly asserted in the receipt header.

The default provides for operational transparency, accommodating dynamic active state based consent authorization online, and multiple concurrent lawful bases. The authorization state is active: it can be given, altered, restricted, objected to, or withdrawn by the individual after the disclosure event, and each change shall be recorded against the same notice_id and notice_version_reference so that the state at any point in time is reconstructable. The object that carries that state is the Authorization State Object specified in 7.2.5. Where more than one lawful basis applies to the processing context covered by a notice version, each basis shall be stated and referenced to its Annex C row, and the default in this subclause applies only to the online consent component.

An individual who seeks out and reads a public notice does so in order to discover the terms of the interaction, and online consent is implied operationally in that act unless the individual is notified otherwise. The established analogue is the physical sign: absent a sign, approach and looking are ordinarily permitted, and the sign is the mechanism that notifies otherwise. The controller carries the burden of notification, and silence on the part of the controller is not the assertion of another basis.

Where the interaction presents an offline consent construction through an online interface, that is a construction in which the identity and the location of the individual are assumed rather than recorded, the default in this subclause shall not apply. In that case the lawful basis shall be asserted explicitly in the receipt header, and it shall be evidenced by an authorization record distinct from the Anchored Notice Receipt, captured in a PII controller held record of processing activities that is private and not accessible by default. Where the lawful basis is consent, that authorization record is a consent event record, 3.30. Such a construction is governed by the applicable data protection regulation and is a controller held compliance record.

Implementations shall distinguish, in naming and in reference, between a consent record, which is held by the individual and is bilateral, and a consent event record, which is held privately by the controller in its record of processing activities. A consent event record that assumes the identity and the location of the individual shall not be exchanged, mapped, or reported as equivalent to a consent record, and a receipt shall not reference a consent event record as evidence of online consent. An offline notice is public and is receipted through its link to an online notice, see 7.2.6.

NOTE: Distinct naming lets a relying party tell whether the evidence in hand was recorded or assumed. Where the two are named identically, an offline construction presented through an online interface cannot be distinguished from online consent at the point of inspection.

The default is an interpretation of the notice disclosure event only. It is not evidence of legal consent for processing, and it does not substitute for an authorization record where the lawful basis or the jurisdiction requires one. It does not apply to controller initiated disclosure. No lawful basis other than online consent is inferred from the presence of a receipt.

Implementations relying on the default should record the initiation mode in the disclosure set for the applicable notice version.

NOTE: A dedicated initiation indicator, recording principal initiation independently of the 2FN classification, can be specified in a future revision.

Where the asserted lawful basis is consent, an implementation should maintain an authorization record that is distinct from the Anchored Notice Receipt and separately bound to the same notice_id and notice_version_reference. Where a secondary purpose relies on consent, that authorization shall be expressed as a separate authorization receipt bound to the Anchored Notice Receipt, see Annex D.2.

Where the disclosure event is outside the default described above, no authorization record exists, and no basis other than consent is asserted, the exchange shall be recorded with the lawful basis unresolved, using the value defined in Annex C. Outside that default, an unresolved lawful basis shall not be defaulted to consent.

NOTE: Separating disclosure evidence from authorization evidence keeps the notice record usable under every basis in Annex C, and prevents a notice record from being read as a permission.

The consent construction in use governs, see 3.31: online consent for digital identification is recorded and defaults as stated above, while offline consent presented online assumes identity and location and therefore carries no default. Jurisdictions that reject an interpretive default for the online case shall profile this subclause explicitly and record the profiling rule with the notice version.

Where a lawful basis other than consent is asserted, the receipt header shall state that basis explicitly, for example contract, legal obligation, legitimate interest, vital interest, or public interest, and shall reference the corresponding Annex C row.

Where the lawful basis is consent, the Anchored Notice Receipt provides the proof of notice disclosure on which valid consent depends. Under any other lawful basis, the same artefacts evidence that the public rule set was disclosed and that the individual could inspect authority, purpose, and justification before identification. The evidence obligation under each basis is stated in Annex C.

#### 7.2.3 Availability of the minimum notice disclosure

The elements described in 3.13 shall be present, resolvable, and inspectable before identification or processing begins, and shall be retrievable through at least one modality that satisfies 7.1.3. This requirement is tested by criterion C2.

#### 7.2.4 Notice Version Object and verification

Each notice version shall be represented by a Notice Version Object (NVO), as defined in 3.24.

An NVO shall include:

- notice_url, the location at which that notice version is retrievable
- notice_version_id, the version identifier
- notice_hash, the integrity hash of the notice content as published, computed with SHA-256 or with an equivalent or stronger algorithm
- published_at, the time at which that notice version was published

An NVO should include:

- hash_algorithm, where an algorithm other than SHA-256 is used
- controller_identity_record_id, the controller accountable for the version
- supersedes, the notice_version_id of the version replaced

notice_version_reference shall resolve to the applicable NVO. Where resolution is not available to the relying party, notice_version_reference shall carry notice_version_id and notice_hash directly.

A material change shall create a new NVO, with a new notice_version_id, a new notice_hash, and a new published_at, and shall not alter an existing NVO. Historic NVOs shall be retained for as long as any receipt, processing record, or event log entry references them.

Hash input rule (normative). notice_hash shall be computed over the exact octet stream of the notice representation retrievable at notice_url, without canonicalization, transformation, or re-encoding. Where a notice version is published in more than one representation, each representation shall be represented by its own NVO, with its own notice_url, notice_hash, and published_at. Two implementations that retrieve the same representation therefore compute the same notice_hash.

Verification procedure (normative). A relying party verifies a disclosure claim as follows.

1. Retrieve the notice version using notice_url from the NVO referenced by the receipt.
2. Compute the hash of the retrieved content using the stated algorithm.
3. Compare the computed value with notice_hash. Where the values differ, the notice version shall be treated as unverified, and the receipt shall not be relied upon as evidence of the content disclosed.
4. Where an anchor record, a controller signature, or a notary proof is present, verify it over the same hash inputs.

NOTE: Immutability under 6.3 and criterion C5 are testable only where the hash and the publication time are published. The NVO allows a relying party to detect a notice version that was altered after disclosure.

#### 7.2.5 Authorization State Object and state reconstruction

Where authorization state is relied upon for a processing context, that state shall be represented by an Authorization State Object (ASO), as defined in 3.25. The ASO carries both the per purpose authorization state and the validity state of the record. An implementation shall not maintain separate objects for the two states, and shall not express record validity independently of the purpose state formed against the same notice version.

An ASO shall include:

- authorization_state_id, the identifier of this state instance
- controller_identity_record_id, the accountable controller
- notice_id and notice_version_reference, the notice version the state was formed against
- purpose_state, an array in which each entry states the purpose reference, the lawful_basis relied upon for that purpose, the state value, and the state_time
- record_validity, the validity state of the record
- state_time, the time at which this state instance was formed

An ASO should include:

- anchored_notice_receipt_id, the disclosure event the state is anchored to
- supersedes, the authorization_state_id of the instance replaced
- state_source, whether the change was initiated by the individual, by the controller, or by expiry
- evaluated_at, where a relying party records the time of evaluation

An ASO may include:

- expires_at, where the state is time limited
- derogation_reference, where validity is suspended under a stated lawful derogation

purpose_state vocabulary (normative). Each purpose_state entry shall take one of the following values: not_given, given, altered, restricted, objected, withdrawn, expired.

record_validity vocabulary (normative). record_validity shall take one of the following values: valid, invalid, suspended.

A change to any state value shall create a new ASO instance carrying supersedes, and shall not alter an existing instance. Each change shall create a Notice Event Log entry of type authorization_state_changed or record_validity_changed, bound to the same notice_id and notice_version_reference, see 7.4.1. Historic ASO instances shall be retained for as long as any processing record depends on them.

A material change to the notice shall not alter an existing ASO instance. Where state is carried forward to a new notice version, a new ASO instance shall be created referencing the new notice_version_reference, so that the notice version each state was formed against remains inspectable.

An ASO shall not require an account_id or a pii_principal_id, in accordance with 3.14 and 7.3.1. Its exposure is bilateral, as defined in 7.3.2.

Reconstruction procedure (normative). A relying party establishes the state applying at a time T as follows.

1. Retrieve the ASO instances for the applicable notice_id, and order them by state_time using supersedes.
2. Select the instance in effect at T, and cross check it against the authorization_state_changed and record_validity_changed entries in the Notice Event Log for the same period.
3. Evaluate record_validity as at T. Where it is invalid or suspended at T, the purpose_state values shall not be relied upon as authorization for that period.
4. Evaluate the purpose_state entry for the purpose in question as at T.
5. Verify the notice version the instance references using the procedure in 7.2.4. Where the notice version is unverified, the state shall be treated as unverified for evidential purposes.

NOTE: The ASO is the authorization side counterpart of the Notice Version Object. Without it, 7.2.2 requires state to be reconstructable while nothing in the record structure carries the state, and a relying party evaluating a receipt issued in the past cannot tell whether the authorization it references still stands.

#### 7.2.6 Offline notice linkage

An offline notice, 3.29, shall carry a resolvable reference, for example a printed URL or a machine readable code, that resolves to the Controller Identity Record of the accountable controller and to the Notice Version Object of the online notice that states its terms.

A Notice Receipt generated from an offline notice shall carry the controller_identity_record_id and the notice_version_reference of that online notice, and shall be verifiable by the procedure in 7.2.4.

Where the offline notice presents part of the terms, as a layered notice, the terms it presents shall not conflict with the referenced notice version.

NOTE: An offline notice is receiptable only through this link. Without it, the notice_url and hash requirements of 7.2.4 cannot be met for a physical sign, and the disclosure event it represents cannot be evidenced.

#### 7.2.7 Notice Record field specification table (normative)

Each version of a Notice Record shall carry the fields marked Yes. Fields of the disclosure set in 7.2.1 may be carried inline or through transparency_disclosure_reference.

| Field | Description | Required | Value type | Constraints | Exposure | TS 27560:2023 anchor |
| --- | --- | --- | --- | --- | --- | --- |
| notice_id | Stable notice family identifier | Yes | URI or string identifier | The value shall remain stable across notice versions | Public | 6.3.4.2 privacy_notice, closest anchor |
| notice_version_reference | Immutable reference to this notice version | Yes | URI or hash reference | The value shall resolve to the Notice Version Object for this version, see 7.2.4 | Public | 6.3.4.2 privacy_notice |
| controller_identity_record_id | Reference to the CIR of the accountable controller | Yes | URI or string identifier | The value shall reference a resolvable CIR; joint controllers are represented by multiple references | Public | 6.3.4.9 pii_controllers |
| public_rule_reference | Reference to the applicable code of conduct, code of practice, or legal instrument | Yes | URI or structured reference | The value shall identify the public rule set relied upon, see criterion C4 in 5.1; where a code is referenced, it should be versioned | Public | 6.3.4.21 codes_of_conduct, closest anchor |
| lawful_basis | Asserted lawful basis for the processing context covered by the notice version | Yes | Controlled vocabulary, one or more values | Each value shall use the vocabulary in Annex C; where more than one basis applies, each shall be stated and referenced to its Annex C row, see 7.2.2 | Public | 6.3.4.7 lawful_basis |
| purpose | Recorded purposes for the processing context | Yes | Array of text or structured references | Each entry shall be bound to the legal authority relied upon and to controller_identity_record_id, see 7.5 | Public | 6.3.4.4 purposes, 6.3.4.5 purpose |
| technology_in_use | Technology classes in use and their processing capabilities | Yes | Text or structured reference | Inline or by reference, see 7.2.1; a change shall be treated as a material change | Public | 6.3.4.11 processing_method, closest anchor |
| controls_available_primary | Practical rights controls available to the individual | Yes | Text or structured reference | Inline or by reference, see 7.2.1; a change to availability, scope, or effect shall be treated as a material change | Public | 6.3.4.19 withdrawal_method, 6.3.4.20 privacy_rights, closest anchors |
| associated_or_derivative_controls | Controls associated with or derived from the primary controls | Conditional | Text or structured reference | Present where applicable, see 7.2.1 | Public | Extension field |
| secondary_purposes_of_use | Secondary purposes of use | Conditional | Array of text or structured references | Present where secondary purposes exist, see 7.2.1; a change shall be treated as a material change | Public | 6.3.4.4 purposes, closest anchor |
| limitations_or_derogations_on_controls | Limitations or derogations on the controls disclosed | Conditional | Text or structured reference | Present where applicable, and stated explicitly, see 7.2.1 | Public | Extension field |
| transparency_disclosure_reference | Stable pointer to the disclosure set | Conditional | URI | Present unless the full disclosure set is embedded inline, see 7.2.1 | Public | Extension field |
| recipient_jurisdictions | Destination jurisdictions for cross border transfer or disclosure | Conditional | Array of country codes | Present where cross border transfer or disclosure applies; values should use ISO 3166-1 alpha-2 | Public | 6.3.4.14 processing_locations, 6.3.4.18 recipient_third_parties |
| transfer_mechanism | Transfer mechanism or safeguard class | Conditional | Controlled vocabulary | Present where cross border transfer or disclosure applies; the vocabulary may be profiled by jurisdiction | Public | Extension field |
| profiling_rule_reference | Reference to the jurisdiction profiling rule applied | Conditional | URI | Present where a profiling rule under 7.2.2 or Annex C applies to the notice version | Public | Extension field |
| retention_period | Retention stated in the notice | No | Text or structured reference | Where stated, a change shall be treated as a material change, see 6.3 | Public | 6.3.4.13 retention_period |
| language | Language of the notice representation | No | Language tag | Where a notice is published in more than one language, each representation has its own Notice Version Object, see 7.2.4 | Public | 6.3.4.3 language |
| surveillance_risks | Material risk disclosure for state access and surveillance exposure | No | Text or structured reference | Where applicable, should be present | Public | 6.3.4.22 impact_assessment, closest anchor |
| rights_derogations | Disclosure of rights limitations or derogations in the applicable context | No | Text or structured reference | Where applicable, should be present; a change shall be treated as a material change | Public | Extension field |

### 7.3 Notice Receipt and the Anchored Notice Receipt classification

A Notice Receipt is the artefact defined in 3.3. The Anchored Notice Receipt is a classification applied to the first Notice Receipt issued for a given notice version disclosure event, as defined in 3.4. The classification is asserted using the anchored_notice_receipt field.

Where anchored_notice_receipt is absent or false, the receipt shall link to the applicable Anchored Notice Receipt using anchored_notice_receipt_id, so that subsequent receipts remain traceable to the initial notice disclosure event.

#### 7.3.1 Anonymity by default

An Anchored Notice Receipt shall not require an account_id or a pii_principal_id.

Generation, retention, and verification of an Anchored Notice Receipt shall be possible without identification of the individual. Where an implementation offers receipt verification, that verification shall not require the individual to authenticate or to present a digital identification credential. Anonymity by default applies to the notice artefacts, 3.32, and does not restrict identification required by the lawful basis for the processing itself.

NOTE: The absence of a pii_principal_id does not by itself show that a receipt does not identify the individual. Annex H lists the field categories that are absent from the artefacts in its scope and the conditions under which the remainder are carried.

#### 7.3.2 Notice Receipt field specification table (normative)

At minimum, an Anchored Notice Receipt shall include schema_version, receipt_id, notice_id, notice_version_reference, controller_identity_record_id or a resolvable pointer to the CIR, presented_at, lawful_basis, purpose, and notice_type.

Exposure values used in this document.

- Public. The value is published and retrievable by any party without authentication.
- Bilateral. The value is held by both the issuing controller and the receiving individual, and is not required to be published.
- Restricted. The value is withheld from publication under a stated lawful derogation and is disclosed only to an authorized party.

| Field | Description | Required | Value type | Constraints | Exposure |
| --- | --- | --- | --- | --- | --- |
| schema_version | Schema reference for technical interpretation of the receipt structure | Yes | String identifier | The value shall reference the receipt schema in effect at issuance, using the identifier and the version rule in 7.3.4 | Bilateral |
| anchored_notice_receipt | Indicator that this receipt instance is the Anchored Notice Receipt for the applicable notice version disclosure event | No | Boolean | When true, the receipt is classified as an Anchored Notice Receipt; when false or absent, the receipt shall reference the applicable Anchored Notice Receipt using anchored_notice_receipt_id | Bilateral |
| receipt_id | Receipt instance identifier | Yes | URI or string identifier | The value shall be unique within the issuer domain, or as defined by the implementation | Bilateral |
| anchored_notice_receipt_id | Reference to the applicable Anchored Notice Receipt instance | No | URI or string identifier | When anchored_notice_receipt is true, this field should be absent or equal to receipt_id; otherwise it shall reference the applicable Anchored Notice Receipt | Bilateral |
| account_id | Identifier or reference for the account or relationship context, pseudonymous where applicable | No | URI or string identifier | When present, should be unlinkable and data minimizing; shall not be required for anonymous operation | Bilateral |
| notice_id | Stable notice family identifier | Yes | URI or string identifier | The value shall remain stable across notice versions | Public |
| notice_version_reference | Immutable reference to the disclosed notice version | Yes | URI or hash reference | The value shall reference the exact notice version in effect at the time of disclosure, and shall resolve to the applicable Notice Version Object, see 7.2.4 | Public |
| notice_version_hash | Integrity hash of the notice version disclosed | No | Hash string | The value should be present where the receipt is verified without resolving the Notice Version Object; where present, it shall equal notice_hash in the applicable NVO, see 7.2.4 | Public |
| transparency_disclosure_reference | Stable pointer to the technology and controls disclosure set of the Notice Record | No | URI | Where the disclosure set is not embedded inline in the Notice Record, this field should be present so that relying parties can retrieve the 7.2.1 elements bound to notice_version_reference | Public |
| controller_identity_record_id | Reference to the CIR | Yes | URI or string identifier | The value shall reference a resolvable CIR | Public |
| presented_at | Time of disclosure or presentation | Yes | Date and time | The value shall be recorded using the date and time format specified in the ISO 8601 series, in the UTC time zone | Bilateral |
| lawful_basis | Asserted lawful basis for the processing context covered by the notice version | Yes | Controlled vocabulary | The value shall use the vocabulary in Annex C, and shall be present in the receipt header | Public |
| purpose | Recorded purpose relied upon for the processing context | Yes | Text or structured reference | The value shall be bound to notice_version_reference and controller_identity_record_id, and may be carried by reference to the Notice Record for the applicable version, see 7.5 | Public |
| two_factor_notice | Indicates that the disclosure event was a two factor online notice producing a bilateral receipt | No | Boolean | Where true in an online digital identification context and no other basis is asserted, the disclosure event is by default interpreted as online consent under 7.2.2; outside that context the field records presentation and acknowledgement only | Bilateral |
| notice_type | Notice classification | Yes | Controlled vocabulary | The value shall use the vocabulary in 7.3.3 | Public |
| recipient_jurisdictions | Destination jurisdictions for cross border transfer or disclosure | Conditional | Array of country codes | Where cross border transfer or disclosure applies, this field shall be present; values should use ISO 3166-1 alpha-2 | Public |
| transfer_mechanism | Transfer mechanism or safeguard class | Conditional | Controlled vocabulary | Where cross border transfer or disclosure applies, this field shall be present; the vocabulary may be profiled by jurisdiction | Public |
| surveillance_risks | Material risk disclosure for state access and surveillance exposure | No | Text or structured reference | Where applicable, should be present; where present, shall be version bound through notice_version_reference | Public |
| rights_derogations | Disclosure of rights limitations or derogations in the applicable context | No | Text or structured reference | Where applicable, should be present; a change shall be treated as a material change | Public |

#### 7.3.3 notice_type vocabulary (normative)

notice_type shall take one of the following values:

- statement
- notification
- risk_disclosure
- policy
- signal

Implementations may define additional notice types, but shall map each of them to one of the values above for interoperability.

#### 7.3.4 schema_version identifier and version rule (normative)

The schema specified in this document is `ancr-notice-receipt-2.0`. An implementation conforming to this document shall emit `schema_version` with that value.

The version identifier follows a major, minor, patch rule.

- The major component shall be incremented where a change breaks an implementation built on the previous version, including the removal or rename of a field, a change to whether a field is required, and a change to the default interpretation of a disclosure event.
- The minor component shall be incremented where a field, an event type, or a vocabulary value is added without invalidating a record produced under the previous version.
- The patch component shall be incremented for editorial change that does not alter the record structure.

The major component is 2 because three changes break an implementation built on a receipt structure that carries no stated schema version value.

1. Each notice version shall be represented by a Notice Version Object carrying `notice_hash` and `published_at`, see 7.2.4, and criterion C5 and mandatory requirement 3 test it.
2. The flat rule that no lawful basis is inferred from a receipt is replaced by the scoped default in 7.2.2, which changes how a receipt issued in an online digital identification context is interpreted.
3. Where authorization state is relied upon, it shall be carried by an Authorization State Object, see 7.2.5, tested by criterion C8 and mandatory requirement 11.

A relying party that encounters a receipt with an absent `schema_version`, or with a value carrying a major component below 2, shall not treat the record as conforming to this document, and shall not apply the default in 7.2.2 to it.

NOTE: A receipt issued under `ancr-notice-receipt-2.0` is not interchangeable with one that carries no stated schema version, because the same field name can carry a different interpretation of the disclosure event. The schema version in the receipt header lets a relying party detect that difference.

### 7.4 Notice Event Log

#### 7.4.1 Minimum event types

The Notice Event Log shall support at minimum:

- notice_issued
- notice_material_change

Where an Authorization State Object is maintained under 7.2.5, the Notice Event Log shall additionally support:

- authorization_state_changed
- record_validity_changed

The Notice Event Log should additionally support:

- cir_updated, for a change to the Controller Identity Record relied upon by a notice version
- disclosure_set_updated, for a change to the disclosure set in 7.2.1

Where an implementation claims profile B5, the Notice Event Log shall additionally support:

- operator_correction
- operator_suspension
- operator_withdrawal
- record_re_registration

#### 7.4.2 Event record minimum fields (normative)

Each Notice Event Log entry shall include at minimum:

- event_id
- event_time
- event_type
- notice_id, notice_version_reference, or both
- receipt_id, where applicable

#### 7.4.3 Event type registry (normative)

Implementations shall support at minimum the following event types. Additional event types may be defined by companion specifications.

| event_type | Trigger | Required linkages | Notes |
| --- | --- | --- | --- |
| notice_issued | Issuance or publication of a new notice version | The entry shall include notice_version_reference, and should include notice_id | Supports discovery of current and historic notice versions |
| notice_material_change | Any material change, including purposes, lawful basis, recipients or jurisdictions, retention, and rights mechanisms | The entry shall include the prior and the new notice_version_reference, or an implementation defined diff pointer | Enforces version binding and ongoing reference discipline |
| operator_correction | Alteration of a record by a registry operator | The entry shall include operator_identity_record_id, controller_identity_record_id and the notice_version_reference in effect | Records a change the controller did not make |
| operator_suspension | Suspension of a record by a registry operator | As for operator_correction, and should include the reason and its expiry, where known | The record remains resolvable with its suspended state |
| operator_withdrawal | Withdrawal of a record by a registry operator | As for operator_correction | The record's history remains retrievable |
| record_re_registration | A new registration made in place of an amended record | The entry shall include the identifier of the record replaced and of the new record | Allows an assurance model that prohibits amendment of a verified record to be followed |

The Notice Event Log should support hooks for:

- withdrawal and objection events
- rights exercise events

Implementations may tier event log requirements by assurance level. Where tiered, the implementation shall state the tier.

Where an implementation asserts conformance under 5.1, the Notice Event Log shall evidence the notice versions relied upon for that assertion, so that the claim can be checked against a stated point in time.

#### 7.4.4 Processing events, distinct from notice lifecycle events

The Notice Event Log records notice lifecycle events. Processing events are distinct from notice lifecycle events and shall be recorded separately, so that governed processing is testable against the notice version relied upon.

A processing event record shall include at minimum:

- processing_event_id
- event_time
- processing_event_type
- notice_version_reference, the notice version relied upon for the processing
- controller_identity_record_id, the accountable controller
- purpose, the recorded purpose relied upon, see 7.5
- lawful_basis, the lawful basis relied upon for the processing, using the Annex C vocabulary

NOTE: Separating processing events from notice lifecycle events allows an implementation to demonstrate that recorded processing was governed by a disclosed notice version, and allows a relying party to detect processing that is bound to no notice version and no recorded purpose.

### 7.5 Purpose as a recorded artefact

Purpose shall be recorded, and shall be specified before identification or transfer. Each recorded purpose shall be bound to:

- the legal authority relied upon;
- the controller_identity_record_id of the accountable controller; and
- the notice_version_reference in effect at the time the purpose is disclosed.

NOTE 1: Transparency evidence that cannot be inspected after the fact cannot support accountability or enforcement. The conformance consequence of an unrecorded or unbound purpose is stated in clause 8, item 9.

NOTE 2: Purpose is carried in the Notice Record for the applicable notice version and is bound to receipts and to processing events through notice_version_reference. A relying party can then test whether processing was bound to a disclosed purpose, controller, and notice version.

### 7.6 Relationship to consent records

Where consent is the lawful basis, the consent statement and the consent record shall reference the prior notice disclosure event, by notice_version_reference and by the applicable Anchored Notice Receipt. This document specifies that reference only. It does not specify consent, the consent statement, or the consent record, which remain governed by ISO/IEC TS 27560:2023 and ISO/IEC 29184:2020, see Annex G.

## 8 Mandatory requirements

An implementation conforming to the base extension shall satisfy each of the following requirements.

1. CIR publication. The CIR is publicly accessible and resolvable before any demand for personal identification, aligned with 7.1.
2. Anonymity by default. No pii_principal_id is required for an Anchored Notice Receipt, aligned with 7.3.1.
3. Version binding. Receipts bind to an immutable notice version, and historic versions are retained, aligned with 6.3. Each notice version is represented by a Notice Version Object carrying an integrity hash and a publication time, and the verification procedure in 7.2.4 is supported.
4. Material change. A material change creates a new notice version and a corresponding Notice Event Log entry, aligned with 6.3 and 7.4.
5. Notice classification. Every receipt populates notice_type using the vocabulary in 7.3.3.
6. Reciprocal and proportionate disclosure. The technology and controls disclosure set is published and version bound, aligned with 7.2.1.
7. Non-exclusion. At least one privacy_access_point modality is operable without a digital identification credential, aligned with 3.15 and 7.1.3.
8. Co-regulation conformance. An implementation asserting co-regulated identification satisfies C1 to C8 in 5.1 for each notice version relied upon.
9. Purpose recorded. Purpose is recorded and bound to the legal authority, the controller, and the notice version in effect, aligned with 7.5.
10. Processing events recorded distinctly. Processing events are recorded separately from notice lifecycle events, aligned with 7.4.4.
11. Authorization state carried once. Where authorization state is relied upon, it is carried by a single Authorization State Object bound to the notice version, state changes are appended rather than overwritten, and the state applying at a stated past time is reconstructable, aligned with 7.2.5.
12. Schema version stated. Every receipt carries schema_version with the value specified in 7.3.4, so that a relying party can determine which interpretation rules apply to the record.

## Annex A. Mapping to ISO/IEC TS 27560:2023 (informative, except A.0)

This annex provides an interoperability mapping between the base extension artefacts and ISO/IEC TS 27560:2023 anchors. Clause references are to ISO/IEC TS 27560:2023 as published, not to drafts. Profile field names refer to the fields defined in clause 7. The Action column states the recommended migration or interpretation rule for implementers exchanging records across the TS and this profile.

### A.0 Declared deviation from ISO/IEC TS 27560:2023 (normative)

This profile declares one deviation from ISO/IEC TS 27560:2023.

Deviation. ISO/IEC TS 27560:2023 requires pii_principal_id in the consent record header. This profile does not require it. It substitutes an optional account_id for relationship context, pseudonymous where applicable.

A required principal identifier makes the evidence artefact unobtainable without identification of the individual, which inverts the sequence this profile specifies. Anonymity by default, see 3.14, is a condition of criterion C3 and of mandatory requirement 2.

Interoperability consequence. A record produced under this profile is not, without addition, a conforming TS 27560:2023 consent record where the implementation relies on the required header field. A controller that needs both shall populate account_id, or a TS style pii_principal_id, in the controller side record while keeping the individual side Anchored Notice Receipt free of either.

All other differences described in this annex are profiling actions, that is constraints, specializations, or additive extension fields, and are not deviations.

### A.1 Record and receipt header alignment

This profile carries forward TS style schema governance and identifiers through schema_version and the record and receipt identifiers. The treatment of pii_principal_id is stated in A.0.

### A.2 New fields introduced by this profile

| Profile field | Closest TS anchor | Notes |
| --- | --- | --- |
| anchored_notice_receipt | None | Indicator that a receipt instance is the first Notice Receipt for the applicable disclosure event |
| anchored_notice_receipt_id | None | Linkage field; where the indicator is false or absent, this references the applicable Anchored Notice Receipt |
| notice_id | privacy_notice, reference | Stable notice family identifier complementing the TS notice URL and version reference |
| notice_version_reference | privacy_notice, reference | Immutable version reference supporting version binding beyond a mutable URL |
| Notice Version Object | privacy_notice, reference | Structured version object carrying notice location, version identifier, integrity hash, and publication time; the TS carries a notice reference but no integrity or publication metadata |
| notice_version_hash | None | Optional integrity hash of the disclosed notice version, equal to notice_hash in the applicable Notice Version Object |
| Authorization State Object | 6.3.7.6 event_state, closest anchor | Structured object carrying per purpose authorization state and record validity, with append only state changes and a reconstruction procedure; the TS represents lifecycle state through event elements but specifies no state object that can be evaluated at a past time |
| controller_identity_record_id | party_id | Specializes controller party identification as a resolvable CIR identifier |
| presented_at | event_time | Time of disclosure or presentation, aligned to TS event_time semantics |
| transparency_disclosure_reference | None | Pointer to the technology and controls disclosure set in 7.2.1 |
| notice_type | None | Classification vocabulary: statement, notification, risk_disclosure, policy, signal |
| two_factor_notice | None | Optional indicator for the 2FN pattern producing a bilateral receipt |
| recipient_jurisdictions | recipient_third_parties, jurisdiction | Explicit cross border destination jurisdictions |
| transfer_mechanism | None | Safeguard or transfer mechanism class for cross border transfers |
| surveillance_risks | impact_assessment, optional | Targeted risk disclosure for state access and surveillance exposure |
| rights_derogations | None | Disclosure of rights limitations or derogations in the applicable context |

### A.3 Field mapping table

| TS 27560:2023 field | TS clause | Profile field | Action | Notes |
| --- | --- | --- | --- | --- |
| schema_version | 6.3.3.2, 6.4.5.2 | schema_version | Same | Required in the TS record and receipt metadata and in this profile's receipt header |
| record_id | 6.3.3.3 | receipt_id, for receipt artefacts | Map and rename | Implementations may also persist a TS style record_id in controller side records |
| receipt_id | 6.4.5.3 | receipt_id | Same | Unique receipt instance identifier |
| pii_principal_id | 6.3.3.4 | account_id | Deviation, see A.0 | Optional in this profile; where present it should be data minimizing and unlinkable |
| event_time | 6.3.7.2 | presented_at | Map | Captures the time of disclosure or presentation |
| party_id, controller | 6.3.6.2 | controller_identity_record_id | Map and specialize | Controller party identifier specialized as a CIR reference |
| party_name, controller | 6.3.6.7 | controller_name, CIR | Map | Carried in the CIR rather than repeated per receipt where a reference receipt is used |
| party_contact, controller | 6.3.6.9 | privacy_access_point, CIR | Map | Rights and contact modalities carried as structured entries |
| privacy_notice | 6.3.4.2 | notice_version_reference | Map and extend | Immutable reference, URL or content hash; a notice URL may also be carried in the Notice Record |
| language | 6.3.4.3 | Notice Record disclosure set | Map | Applies to Notice Record rendering where multilingual delivery is supported |
| purposes | 6.3.4.4 | Notice Record disclosure set | Map | Bound to notice_version_reference; secondary purposes disclosed through secondary_purposes_of_use |
| purpose | 6.3.4.5 | Notice Record disclosure set | Map | Purpose labels and identifiers disclosed for the applicable notice version |
| lawful_basis | 6.3.4.7 | lawful_basis | Map and generalize | TS lawful_basis is consent scoped; this profile generalizes it across lawful bases, see Annex C |
| pii_information | 6.3.4.8 | Optional Profile B1 | Map | Attribute and category inventories are processing record scope; a reference receipt may omit them |
| pii_controllers | 6.3.4.9 | controller_identity_record_id | Map and specialize | Joint controllers may be represented as multiple CIR references |
| collection_method | 6.3.4.10 | Optional Profile B1 | Map | Processing record scope; may be referenced from notice versions where required |
| processing_method | 6.3.4.11 | technology_in_use | Map and refactor | Where processing methods imply technology mediated capabilities, for example profiling or automated decision, disclose them with the corresponding controls |
| storage_locations | 6.3.4.12 | Optional Profile B1 | Map | Processing record scope |
| retention_period | 6.3.4.13 | retention_period, Notice Record; Optional Profile B1 | Map | Optional in the Notice Record, see 7.2.7; retention per purpose is processing record scope |
| processing_locations | 6.3.4.14 | Optional Profile B1, recipient_jurisdictions | Map and extend | Cross border destinations disclosed through recipient_jurisdictions |
| geographic_restrictions | 6.3.4.15 | Optional Profile B1 | Map | Processing record scope |
| services | 6.3.4.16 | Notice Record disclosure set | Map | Service and business process labels contextualize purposes |
| jurisdiction | 6.3.4.17 | jurisdiction, CIR | Map | This profile additionally requires a controller asserted jurisdiction in the CIR |
| recipient_third_parties | 6.3.4.18 | Optional Profile B1, recipient_jurisdictions | Map and extend | Recipient inventory in B1; destinations in recipient_jurisdictions |
| withdrawal_method | 6.3.4.19 | privacy_access_point, CIR | Map and refactor | Withdrawal represented as a structured modality and in the 7.2.1 controls disclosure set |
| privacy_rights | 6.3.4.20 | privacy_access_point, CIR | Map and refactor | Rights exercise represented as structured modalities |
| codes_of_conduct | 6.3.4.21 | code_of_conduct, CIR | Map | Carried in the CIR where applicable |
| impact_assessment | 6.3.4.22 | surveillance_risks | Map and specialize | Broader impact assessment remains processing record scope |
| authority_party | 6.3.4.23 | privacy_access_point, CIR | Map and refactor | Complaint and appeal access points represented as modalities and referenced authorities |
| pii_type | 6.3.5.2 | Optional Profile B1 | Map | Where disclosed in notices, should align to the B1 categories |
| pii_attribute_id | 6.3.5.3 | Optional Profile B1 | Map | Maintain stable identifiers where possible |
| pii_optional | 6.3.5.4 | Optional Profile B1 | Map | This field may be disclosed in the Notice Record where required for meaningful choice |
| sensitive_pii_category | 6.3.5.5 | Optional Profile B1 | Map | This field may be disclosed where required by jurisdiction or sector |
| special_pii_category | 6.3.5.6 | Optional Profile B1 | Map | This field may be disclosed where required by jurisdiction |
| party_address | 6.3.6.3 | controller_address, CIR | Map | For other parties, use TS party identification within B1 |
| party_email | 6.3.6.4 | privacy_access_point, CIR | Map and refactor | Represented as a modality entry |
| party_url | 6.3.6.5 | controller_public_id_uri | Map and specialize | General web URLs may be carried as CIR extensions |
| party_phone | 6.3.6.6 | privacy_access_point, CIR | Map and refactor | Represented as a modality entry |
| party_role | 6.3.6.8 | CIR scoping | Constrain | The CIR represents the controller role; other roles may be represented in B1 |
| party_type | 6.3.6.10 | Optional CIR extension | Map | Useful for accountability classification |
| validity_duration | 6.3.7.3 | Optional, basis dependent | Map | Where used, should be bound to the applicable lawful basis and scope |
| entity_id | 6.3.7.4 | controller_identity_record_id | Map and constrain | For controller issued notice events, the acting entity is the CIR reference |
| event_type | 6.3.7.5 | notice_type, Notice Event Log event_type | Map and extend | notice_type classifies the notice context; the event log carries lifecycle event types |
| event_state | 6.3.7.6 | Notice Event Log event_type | Map | Lifecycle transitions represented as log entries such as notice_issued and notice_material_change |

### A.4 Artefact mapping

| Base extension artefact | Primary purpose | TS 27560:2023 anchor | Notes and deltas |
| --- | --- | --- | --- |
| Controller Identity Record | Controller accountability anchor, controller identification first | Party identification, controller role | Profiled subset of party fields plus required pointers for rights access, event log, and publication |
| Notice Record, versioned | Machine readable notice content and version binding | Consent record context, notice or policy content reference | Adds an explicit immutable notice_version_reference |
| Anchored Notice Receipt | Evidence of disclosure, anonymous by default | Consent receipt, record header and context | Removes the required principal identifier, see A.0; the receipt is version bound |
| Notice Event Log | Lifecycle and material change events | Event and lifecycle elements | Adds minimum event type expectations and an assurance tiering note |

### A.5 CIR mapping

| CIR field | TS 27560:2023 anchor | Change type | Notes |
| --- | --- | --- | --- |
| controller_public_id_uri | 6.3.6.5 party_url, closest anchor | Constrained | Public resolvable controller identifier in URI form, profiled as required |
| controller_name | 6.3.6.7 party_name | Constrained | Controller legal name, profiled as required |
| jurisdiction | 6.3.4.17 jurisdiction, PII processing | New | Controller asserted applicable jurisdiction or pointer |
| privacy_access_point | 6.3.6.9 party_contact, closest anchor | Constrained | Structured modalities; at least one operable without a digital identification credential, see 7.1.3 |
| notice_event_log_url | Extension field | New | Pointer to the append only lifecycle record |

### A.6 Notice Event Log mapping

| Event log element | TS 27560:2023 anchor | Notes |
| --- | --- | --- |
| notice_issued | Event type | Disclosure issuance event for a notice version |
| notice_material_change | Event type | Triggers a new notice version and new receipt issuance |
| Assurance tiering note | Conformance guidance | Permits tiered event log requirements with an explicit tier declaration |

## Annex B. Optional profile extensions (normative where stated)

This annex defines three optional profile extensions that build on ISO/IEC TS 27560:2023 while preserving the reference integrity and the reciprocal and proportionate transparency requirements of the base extension.

### B.0 Extension discipline

Any record created under an optional profile in this annex:

- shall preserve the base identifiers and version binding, notice_id and notice_version_reference;
- shall not redefine Anchored Notice Receipt semantics; and
- shall reference the Controller Identity Record through controller_identity_record_id.

### B.1 Profile B1, PII processing record structure

Purpose. Add a RoPA aligned processing record structure, on the controller and processor side, that is traceable to the disclosed notice versions.

#### B.1.1 Minimum conformance requirements (normative)

A conforming B1 processing record:

- shall include a unique processing_record_id;
- shall include controller_identity_record_id;
- shall include notice_id and notice_version_reference for every disclosed processing fact relied upon;
- shall include lawful_basis using the Annex C vocabulary; and
- should reference Notice Event Log entries where material change, withdrawal, objection, or scope escalation is relevant.

#### B.1.2 Extending the TS with B1

Use ISO/IEC TS 27560:2023 as the baseline for party identification in the controller role, profiled into the CIR; for event_time semantics, aligned with the Notice Event Log; and for processing purposes, recipients, and retention, reusing TS field naming where practical, while binding each processing claim to notice_version_reference.

### B.2 Profile B2, personal data control record structure

Purpose. Add an individual held, data minimizing personal evidence record that is portable and supports rights exercise.

#### B.2.1 Minimum conformance requirements (normative)

A conforming B2 personal record:

- shall include a unique personal_record_id;
- shall include notice_id and notice_version_reference as the evidence anchor;
- shall include controller_identity_record_id;
- shall include privacy_access_point, or a reference to it through the CIR, sufficient to exercise rights;
- shall support anonymous or pseudonymous operation by default; and
- may include receipt_id as a pointer to a specific receipt instance, accompanied by notice_version_reference.

#### B.2.2 Extending the TS with B2

Treat the TS receipt as the exchange artefact and the B2 record as the individual held wallet architecture. Keep B2 minimal and reference first, with no replication of full processing inventories. Where B2 stores additional detail, that detail should be derived from TS receipt fields, or TS compatible receipt extensions, and should remain unlinkable unless the individual chooses otherwise.

### B.3 Relationship to companion specifications

Cross border security and AI lifecycle governance requirements should be specified in companion documents rather than here:

- Cross border transfer mechanisms: alignment tracked against ISO/IEC 27091 Annex B.4, operational transparency, and ISO/IEC WD 27566-2 Annex F practice statements.
- AI lifecycle governance: alignment tracked against ISO/IEC FDIS 27091 and ISO/IEC 42001.
- Notice and consent record extension work: alignment tracked against the preliminary work item registered by SC 27 Resolution 2026/32 and against ISO/IEC 27560. A clause level crosswalk to the registered scope of that work item is provided in Annex F.
- Online transparency code of practice profiling: alignment tracked against the ISO/IEC preliminary work item *Internet Transparency Code of Practice Profile through privacy by design*, established for ISO/IEC JTC 1/SC 44/WG 1 by resolution of the fifth ISO/IEC JTC 1/SC 44 plenary, 3 September 2026, which aligns that work item to ISO/IEC 29100, ISO/IEC 29184 and ISO/IEC TS 27560:2023. That work item selects and constrains base standards to produce a code of practice; this document specifies the record structure through which a disclosure made under such a code is published, referenced by version, and evidenced. The two meet at conformance criterion C4 in 5.1, which requires the Notice Record to state the applicable public rule set by reference to the code of conduct, code of practice, or legal instrument relied upon, and at the code_of_conduct field specified in 7.1, which carries that reference on the Controller Identity Record. A code of practice produced under that work item is one such public rule set. The resolution states that the profile does not replace or duplicate the technical work of ISO/IEC JTC 1/SC 27/WG 5.
- Legal model and vocabulary alignment: expressed in the ANCR DPV Model Extension, which maps the fields specified in clause 7 into DPV terms and anchors them to Convention 108+ Articles 5, 8, 9, and 14. That companion reuses `notice_id`, `notice_version_reference`, `receipt_id`, and the Authorization State Object states specified in 7.2.5 as defined here, and treats this document as the source of the record structure. Where the two documents diverge, this document governs the record structure and the companion governs the vocabulary mapping.

### B.5 Profile B5, registry operator and online notice notary accountability

Purpose. Make the resolution path of a Controller Identity Record, and the witnessing of a notice or receipt, inspectable on the same terms as the record they concern.

A controller that serves its own Controller Identity Record is its own resolution path. B.5.1 and B.5.2 apply only where a CIR is resolved through a registry operator. B.5.3 applies only where a notary proof is issued.

#### B.5.1 Fields (normative)

Where a CIR is resolved through a registry operator, the CIR as served shall carry the following fields, in addition to those specified in 7.1.2.

| Field | Description | Required | Value type | Constraints | Exposure |
| --- | --- | --- | --- | --- | --- |
| resolution_path | Whether the record is served by the controller or by a registry operator | Yes | Controlled vocabulary: direct, operated | Shall be operated where this profile applies | Public |
| operator_identity_record_id | Reference to the registry operator's own CIR | Yes, where operated | URI | Shall resolve by the same means as the record it accompanies, without authentication | Public |
| assurance_level | Level at which the registry operator holds itself | Yes, where operated | String | Shall be stated by reference to assurance_model_reference | Public |
| assurance_model_reference | Published assurance model against which assurance_level is stated | Yes, where operated | URI | Shall resolve to a published and versioned model | Public |
| issuing_authority | Party under whose name the listing is issued | Yes, where distinct from the registry operator | URI | Shall resolve to that party's CIR | Public |
| accountable_operator | Party accountable for operation of the service | Yes, where distinct from the registry operator | URI | Shall resolve to that party's CIR | Public |
| service_operator | Party running the serving infrastructure | No | URI | Where present, shall resolve to that party's CIR | Public |
| registry_identifier | Identifier assigned to the record by the registry | No | String | Where present, shall be stable for the life of the record | Public |

This profile does not specify an assurance model. It requires the level to be stated against a published model, in the same way that criterion C4 requires the public rule set to be stated by reference.

#### B.5.2 Requirements (normative)

An implementation claiming profile B5 shall satisfy the following.

1. The registry operator's own CIR is resolvable by the same means as the records it serves, before any demand for identification, and without authentication.
2. Every operator intervention produces a Notice Event Log entry of the corresponding type in 7.4.1.
3. A registry operator does not alter the substance of a record without such an entry.
4. A registry operator does not require identification of a party inspecting a record it serves. Retrieval of a record through a registry operator is not an identification event, consistent with 3.14, Note 2 to entry.
5. A registry operator does not retain request metadata that identifies the inspecting party, including network address and device identifiers, in association with the record inspected. The categories are those of Annex H, H.2, rows 38 to 41 and 43 to 47.

NOTE: Where the controller serves its own record, the requirements in this subclause are met by criterion C1 in 5.1.

#### B.5.3 Online notice notary (normative)

Where a notary proof is issued for a Notice Version Object, a Notice Receipt or a Notice Event Log entry, the proof shall carry the following fields.

| Field | Description | Required | Value type | Constraints | Exposure |
| --- | --- | --- | --- | --- | --- |
| notary_identity_record_id | Reference to the online notice notary's own CIR | Yes | URI | Shall resolve without authentication | Public |
| witnessed_hash | Hash witnessed | Yes | Hash string | Shall equal notice_hash for a Notice Version Object, or the hash of the receipt or entry witnessed | Public |
| hash_algorithm | Algorithm of witnessed_hash | Yes | String | SHA-256 or an equivalent or stronger algorithm, as in 7.2.4 | Public |
| witnessed_at | Time of witnessing | Yes | Date and time | ISO 8601, in the UTC time zone | Public |
| proof | Signature or inclusion proof over witnessed_hash and witnessed_at | Yes | String or structured value | Shall be verifiable with a key or log published in the notary's CIR | Public |

An implementation relying on an online notice notary shall satisfy the following.

1. The notary is a party other than the controller whose notice, receipt or entry it witnesses.
2. The notary receives only the hash and the time to be witnessed. It does not receive the content witnessed, or any data identifying the individual, consistent with 3.14.
3. The notary does not retain request metadata that identifies the requesting party, in the categories of Annex H, H.2, rows 38 to 41 and 43 to 47.
4. The notary's CIR, and the key or log against which its proofs are verified, are resolvable without authentication.
5. A proof remains retrievable by its witnessed_hash for as long as the notice version it concerns is retained under 6.3.

NOTE: Verification of a notary proof follows 7.2.4, step 4. Where published_at in a Notice Version Object is later than witnessed_at in a proof over the same notice_hash, the proof establishes the earlier time.

## Annex C. Lawful basis variants, rights and obligations (normative)

This annex defines the lawful basis vocabulary and the minimum rights and obligations disclosure table for lawful basis interoperability. Implementations shall reference the applicable row through lawful_basis in the receipt header.

| lawful_basis | Meaning | Rights commonly triggered | Controller obligations commonly triggered | Minimum header requirement |
| --- | --- | --- | --- | --- |
| consent | Processing based on meaningful choice by the individual | Withdrawal, access, rectification, erasure where applicable, objection where applicable | Record evidence of consent; enable withdrawal; ensure consent is freely given, specific, informed, and unambiguous; avoid coercion; demonstrate proof | 2FN may be used; in an online digital identification context, where 2FN is used and no other basis is asserted, online consent is the default interpretation, see 7.2.2; offline consent presented online carries no default, shall be asserted explicitly, and shall be captured in a private controller held record of processing activities as a consent event record, 3.30; consent records and consent event records are named distinctly |
| contract | Processing necessary for contract performance, or for steps taken at the request of the individual | Access, rectification, objection and complaint routes, portability where applicable | Disclose the necessity scope; limit processing to contract purposes; document retention aligned to the contract | Header shall assert contract and identify the contract purpose scope covered by the notice version |
| legal_obligation | Processing necessary to comply with a legal obligation | Access and explanation, complaint and appeal routes, restriction where lawful | Identify the obligation authority; document the statutory basis; apply minimization; disclose retention mandates | Header shall assert legal obligation and provide an authority reference or a pointer to it |
| legitimate_interest | Processing necessary for legitimate interests balanced against the rights of the individual | Objection, access, explanation, complaint and appeal routes | Document the balancing and necessity assessment; provide an objection mechanism; apply safeguards and minimization | Header shall assert legitimate interest and point to the balancing rationale or its summary |
| vital_interest | Processing necessary to protect vital interests | Access and explanation after the fact, where applicable | Document the emergency necessity; limit scope and duration; provide later notice and accountability | Header shall assert vital interest and record the emergency context constraints |
| public_interest | Processing necessary for a task carried out in the public interest or under official authority | Access, explanation, objection and appeal routes as applicable | Identify the authority; define the task scope; apply proportionality; enable oversight mechanisms | Header shall assert public interest and provide an authority or task reference, or a pointer to it |
| unresolved | No lawful basis was established for the exchange at the time of recording | Access and explanation; objection; complaint routes as applicable | Resolve the basis, or cease the processing that depends on it; record the unresolved state against the notice version relied upon | Header shall record unresolved, and shall not default to consent, see 7.2.2 |

The evidence obligation is constant across every row. The lawful basis determines which rights and objection mechanisms apply, and what the controller discloses as authority or justification. It does not determine whether the co-regulation artefacts are required. For every row, a resolvable Controller Identity Record, a versioned Notice Record, an Anchored Notice Receipt, and a Notice Event Log entry shall be available, and the criteria in 5.1 apply unchanged.

Profiling rule (normative). A jurisdiction whose lawful basis enumeration differs from this table shall publish a profiling rule that maps each jurisdictional basis to exactly one row of this table, using unresolved where no row corresponds. The profiling rule shall be referenced from each notice version to which it applies, in the same manner as the profiling of 7.2.2, so that a receipt generated under the jurisdictional enumeration remains interpretable against this annex.

NOTE 1: The vocabulary is drawn from Convention 108+ Article 5 and GDPR Article 6.

NOTE 2: The Convention 108+ DPV style legal model extension cited in 2.2 expresses `consent` and the non consent bases as DPV legal basis classes anchored to Convention 108+ Article 5.2, and models compatibility of further processing separately from legal basis. That mapping is one route to a profiling rule, and it does not change the vocabulary in this table.

## Annex D. Use of the receipt in a four stage exchange (informative)

This annex describes a staged exchange pattern in which a Notice Receipt is used as the evidence architecture across multiple stages. It does not define protocol mechanics.

### D.1 Stage 1, Anchored Notice Receipt, proof of notice

Purpose: establish bilateral evidence that a specific notice version was disclosed or presented, suitable for dispute resolution and, where the lawful basis is consent, for proof of notice supporting valid consent.

Minimum binding identifiers: receipt_id, notice_id, notice_version_reference, controller_identity_record_id, presented_at.

Optional linkage: anchored_notice_receipt set to true.

### D.2 Stage 2, authorization receipt, basis dependent

Purpose: express an authorization state, for example consent, contract acknowledgement, or legal obligation acknowledgement, explicitly linked to the Stage 1 Anchored Notice Receipt.

Interoperability rule: a Stage 2 receipt can reference the Stage 1 receipt using anchored_notice_receipt_id, or reuse receipt_id where a single receipt instance is updated in place.

### D.3 Stage 3, micro credential, protocol facing

Purpose: represent the Stage 2 authorization as a credential or signed assertion suitable for protocol enforcement, for example API or device authorization, without resharing the full receipt content.

Interoperability rule: a Stage 3 credential carries, or is derivable from, the Stage 1 binding identifiers, controller_identity_record_id with notice_version_reference and receipt_id, which prevents ambiguity and replay across relying parties.

### D.4 Stage 4, portable token, portability

Purpose: enable portability and reuse of authorization state across controllers and jurisdictions, subject to scope limits and to revocation or withdrawal controls.

Interoperability rule: a Stage 4 token is traceable to Stage 1 through the binding identifiers, and includes or references a status pointer that lets relying parties verify whether the Stage 1 notice version and the Stage 2 authorization remain active.

### D.5 Lifecycle and invalidation

Where staged exchanges are used, implementations can record lifecycle events, including issuance, material change, withdrawal or objection, expiry, and supersession, in the Notice Event Log, so that credentials and tokens derived in Stages 3 and 4 can be invalidated or superseded when the underlying notice or authorization state changes.

## Annex E. TPI-R conformance and compliance profile (informative)

This annex maps the normative artefacts of this document to the Transparency Performance Indicator Report (TPI-R) methodology, for use by an implementer, an auditor, or a regulator assessing a deployed implementation. TPI-R is a measurement tool applied to this specification. It is not a requirement of this document.

### E.1 Purpose

TPI-R is an external assessment methodology that measures how well a live deployment realizes the transparency artefacts specified in this document. It applies four indicators, each independently testable against observable evidence.

Application. The indicators are normally applied in three stages:

a) capture the practice, being what the deployment does rather than what it states;
b) test the information captured against the requirement; and
c) measure the performance of that information, including its use for rights access.

Each indicator is rated on the scale defined in the ANCR TPI Conformity Specification, from -3 to +1:

| Rating | Meaning |
| --- | --- |
| +1 | Dynamic, in context transparency, an active state |
| 0 | Present but static or out of context |
| -1 | Present but obstructed |
| -3 | Non-operable transparency |

The four ratings are reported together as a profile. This document does not define a composite score. The ratings are ordinal categories, so arithmetic across them, including any weighted sum, does not produce a comparable figure. Any composite score is defined in the ANCR TPI Conformity Specification.

A second variant, ANCR TPI-R, extends the four indicators with conformance indicators that test the presence and the integrity of the artefacts this document specifies: the Controller Identity Record, the Notice Receipt, the Anchored Notice Receipt, and the Notice Event Log.

For this extension, the ANCR TPI-R variant is the applicable assessment profile. The base TPI-R indicators remain usable where an assessor evaluates transparency performance without artefact conformance. This annex does not settle TPI-R methodology versions.

### E.2 Indicator mapping

| Indicator | What it measures | Evidence in this document |
| --- | --- | --- |
| TPI-1 Timing | When notice is available relative to identification and processing | Sequence condition in clause 1 and criterion C1; minimum notice disclosure, 3.13 and 7.2.3; presented_at, 7.3.2 |
| TPI-2 Required elements | Whether the required disclosure elements are present | Minimum notice disclosure, 3.13; CIR field set, 7.1.1 and 7.1.2; Notice Record fields, 7.2.7; Notice Receipt fields, 7.3.2; purpose, 7.5 |
| TPI-3 Accessibility | Whether the required information is reachable without obstruction | privacy_access_point, 7.1.3; non-exclusion, 3.15 and criterion C7; publicly retrievable disclosure set, 7.2.1 |
| TPI-4 Security integrity | Whether session security metadata is consistent with the disclosed notice | Notice Version Object and hash verification, 3.24 and 7.2.4; immutability of notice_version_reference, 6.3; Anchored Notice Receipt binding, 3.4 and 7.3; Notice Event Log, 7.4 |
| ANCR: CIR | Presence and resolvability of the CIR | 7.1 and 7.1.2 |
| ANCR: Notice Receipt | Presence of a conforming Notice Receipt | 7.3.2 |
| ANCR: Anchored Notice Receipt | Presence and binding of the Anchored Notice Receipt | 3.4 and 7.3 |
| ANCR: Notice Event Log | Presence of lifecycle event records | 7.4 |

### E.3 Scope boundary

A TPI-R score is a compliance and conformance signal. It is not a conformance claim under this document. A conforming implementation is defined by the mandatory requirements in clause 8 and the conformance criteria in 5.1. TPI-R measures how well a live deployment realizes that conformance in practice, which can diverge from the specification text.

### E.4 Attribution

TPI-R is cited by its published methodology name, Transparency Performance Indicator Report, of the Kantara Initiative ANCR Working Group. The ANCR TPI-R variant referenced here is the Anchored Notice and Consent Receipt profile of that methodology.

## Annex F. Crosswalk to the preliminary work item registered by SC 27 Resolution 2026/32 (informative)

The preliminary work item *Gap analysis for standards on privacy notices and consent and ways to address potential gaps* was registered by SC 27 Resolution 2026/32. This annex maps the registered scope and justification of the work item to the clauses of this document, so that the gap analysis can evaluate this extension as documented, implemented prior art. Clause references are to this document unless stated otherwise.

### F.1 Scope element mapping

| Registered scope element | Where addressed in this document |
| --- | --- |
| Clarify the relationship between ISO/IEC 29184 and ISO/IEC 27560, and potentially other relevant standards | Introduction, relationship of related instruments; 2.2 NOTE and Annex G, dependencies on ISO/IEC 29184:2020; 6.1, in which ISO/IEC 29184 aligned presentation controls are factor 1 of two factor online notice; 7.6, which locates consent, the consent statement, and the consent record in ISO/IEC TS 27560:2023 and ISO/IEC 29184 and specifies only the notice evidence reference between them; Annex A, field level mapping to ISO/IEC TS 27560:2023 |
| Evaluate and express digital notice requirements against cross-border transparency requirements to avoid conflicting authority models that prevent interoperability at scale | 3.10 co-regulated identification, one public policy with two rule sets operating on the same identifier; 5.1 criteria C1 to C8, the testable authority model; 7.2.1 co-regulation test; 7.1.2 jurisdiction in the Controller Identity Record; 7.3.2 recipient_jurisdictions and transfer_mechanism; Annex C, lawful basis variants with a jurisdiction profiling rule |

### F.2 Justification gap mapping

| Registered justification gap | Where addressed in this document |
| --- | --- |
| Digital credential wallets and portable credentials, new interaction surfaces and constrained device UI patterns | 3.15 non-exclusion and 7.1.3, operability without a digital identification credential; Annex B.2, personal data control record structure as the individual held wallet architecture; Annex D stages 3 and 4, micro credential and portable token traceable to the Anchored Notice Receipt |
| Machine-processable notices, software agents, automated preference handling, audit tooling | 7.2 Notice Record as machine readable transparency statement; 7.2.4 Notice Version Object with a normative verification procedure; 7.2.5 Authorization State Object with a normative reconstruction procedure; 7.3.3 notice_type vocabulary; 7.4 Notice Event Log; Annex E, TPI-R assessment of deployed implementations |
| Multi-jurisdictional enforcement expectations in cross-border contexts | 7.3.2 recipient_jurisdictions, transfer_mechanism, surveillance_risks, and rights_derogations; criterion C4, public rule reference; Annex C rights and obligations variants, drawn from Convention 108+ Article 5 and GDPR Article 6, with the normative profiling rule for differing enumerations |
| Inconsistent notice quality and inconsistent evidence of choice across systems and jurisdictions | 3.13 minimum notice disclosure and criterion C2; 6.1 two factor online notice; 3.4 and 7.3, the Anchored Notice Receipt as the consistent bilateral evidence artefact; clause 8 mandatory requirements |

NOTE: The work item is cited by its title and registering resolution, which remain stable as the work item progresses. This mapping does not assert that the identified gaps are closed.

## Annex G. Dependencies on ISO/IEC 29184:2020 (informative)

This annex sets out the clauses of ISO/IEC 29184:2020 on which this document relies, and what this document adds to each. The semantic content of notice remains that of ISO/IEC 29184:2020. This document adds the structure of the notice as presented, its version binding, and the custody of the evidence that it was presented. No amendment to ISO/IEC 29184:2020 is implied.

| ISO/IEC 29184:2020 | Title | Clause of this document | What this document adds |
| --- | --- | --- | --- |
| 5.2.2 | Providing notice obligation | 7.1 Controller Identity Record | Controller identification published and resolvable before any demand for personal identification, so that it reaches a party who is not yet a PII principal |
| 5.2.7 | Appropriate form | 6.1, Factor 1; 7.2 Notice Record | A specified, machine readable structure for the notice as presented, held as evidence |
| 5.2.8 | Ongoing reference | 6.3; 7.2.4 Notice Version Object | A notice identifier and a version reference bound to every receipt and record, under any lawful basis |
| 5.3.2, 5.3.3 | Purpose description; Presentation of purpose description | 7.5; purpose in 7.3.2 | Purpose recorded as an artefact and bound to the notice version in effect |
| 5.3.4 | Identification of the PII controller | 7.1 Controller Identity Record | The controller's identity as a resolvable record, available before the individual is identified |
| 5.3.9, 5.3.10 | Geo-location of, and legal jurisdiction over, stored PII; Third-party transfer | recipient_jurisdictions and transfer_mechanism in 7.3.2 | Location, jurisdiction and transfer content in a machine processable record bound to the notice version |
| 5.3.11 | Retention period | 6.3; retention_period in profile B1, Annex A | A change to retention is a material change creating a new notice version. Retention per purpose is not specified by this document |
| 5.3.15 | Basis for processing | lawful_basis in 7.3.2; Annex C | The lawful basis carried in the receipt header, using a controlled vocabulary |
| 5.5.2 | Renewing notice | 6.3; 7.4 | A new notice version and a Notice Event Log entry on every material change |
| 5.5.3 | Renewing consent | 6.3; 7.4; 7.2.5 | Change events and authorization state recorded under any lawful basis |
| Annex B, reached from the NOTE in 5.4.3 | Example of a consent receipt or consent record | 7.3 Notice Receipt | The receipt specified as an evidence structure held by the individual, with version binding |

## Annex H. Blinding Identity Taxonomy profile for notice evidence (informative)

This annex profiles the Blinding Identity Taxonomy 1.0 (BIT) for the evidence artefacts specified in this document, so that anonymity by default, 3.14 and 7.3.1, can be assessed by inspecting fields. The terms identifier, quasi-identifier and pseudonym are used as in ISO/IEC 20889:2018. The field category numbers are those of BIT, 6.4.

The profile applies to data about the individual. It does not apply to the Controller Identity Record, which identifies the controller by design.

### H.1 Artefacts in scope

- the Anchored Notice Receipt, and any Notice Receipt issued without an account_id, 7.3;
- Notice Event Log entries, 7.4.2;
- the Authorization State Object, 7.2.5.

### H.2 Treatment of field categories

| BIT categories | Description | Treatment in the artefacts in scope |
| --- | --- | --- |
| 1 to 15 | Names, physical and e-mail addresses, telephone numbers, postal codes, software handles, profile pages, passport, social security, national insurance, driving licence, vehicle registration, bank account and card numbers, PINs | Absent |
| 16, 17, 19, 28 | Private and master keys, symmetric keys, link secrets, passwords | Absent |
| 18, 20, 29, 30 | Public keys, decentralized identifiers, signatures, digital certificates | Carried only where they identify the controller or the issuing system, or sign the artefact. Absent where they identify the individual |
| 21, 23 to 27 | Employee, government, membership, institutional, case and user identifiers | Absent |
| 22 | Account identifiers | Absent from the Anchored Notice Receipt and the Authorization State Object. Carried in other receipts only as account_id, 7.3.2, pseudonymous and unlinkable |
| 31 to 34, 36, 37 | Photos, videos, images, voice, genetic and biometric identifiers | Absent |
| 35 | Dates and timestamps | Carried only as event and version times: presented_at, event_time, state_time, evaluated_at, expires_at and published_at. No date concerning the individual, such as a date of birth |
| 38 to 41, 43 to 47 | IP, MAC and Bluetooth addresses, SSIDs, cookie, radio frequency and IoT identifiers, IMEI, IMSI | Absent, including from log and transport metadata retained with the artefact |
| 42 | Locational information | Absent. Jurisdiction is carried at the level of recipient_jurisdictions, 7.3.2, and not as a location of the individual |
| 48, 49 | Social media posts and comments, free-form text | Absent |

### H.3 Use in assessment

An assessor applying criterion C3 can inspect each field of an artefact in H.1 against H.2. A field that falls in a category marked Absent is a finding against anonymity by default, whether or not an account_id or a pii_principal_id is present.

### H.4 Limits

BIT 1.0 dates from 2020. Identifiers not listed in it, including mobile advertising identifiers, device fingerprints, passkey credential identifiers, wallet identifiers and session identifiers however carried, are treated as network and device identifiers in the row for categories 38 to 41 and 43 to 47. Blinding of datasets held by a controller is outside the scope of this annex.
