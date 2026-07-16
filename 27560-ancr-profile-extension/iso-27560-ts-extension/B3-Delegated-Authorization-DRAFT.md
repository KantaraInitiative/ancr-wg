# B3 Delegated Authorization: draft profile for the ANCR 27560 extension

> Draft 2026-07-15. Covers local, delegated, and localised consent-based authorization. Two parts: Part A is the standards-facing framing (for a WG5 introduction or N-doc), Part B is the buildable clause text to place in the extension. Composition over the base machinery: no new artefact type, no new event-log spine. Terminology: "Personal PII Record Controls" (never "PAI"); CIR = "Controller Identification Record". Not committed to the repo.

---

## Part A: Framing and justification (committee register)

**B.3 Optional Profile B3: Delegated Authorization (local, delegated, person-held)**

The base extension establishes controller-published notice (the CIR and Notice Record), anonymous-by-default evidence of disclosure (the Anchored Notice Receipt), and a person-held record for rights exercise (Profile B2). Annex D already contemplates a Stage 2 authorization receipt linked to the Stage 1 anchor. What the model does not yet express as a first-class element is who authorized on whose behalf: the current structure can record that an authorization state exists, but not the binding between an authorizing party and the subject party, nor the basis on which one acts for the other. Profile B3 closes that gap. It adds a delegation binding at Stage 2 (authorizing_party, subject_party, and a delegation_basis of self, guardian, agent, or mandate), scopes that binding to the notice version in effect at authorization, and represents revocation through a new, additive Notice Event Log event, delegation_revoked. The binding is held person-side under Profile B2, remains anonymous-by-default, and chains to the Stage 1 Anchored Notice Receipt via the existing anchored_notice_receipt_id linkage. This is a preserve-and-extend addition, not a new architecture: it reuses Stage 1 anchoring, the B2 holding pattern, the Annex C lawful-basis vocabulary, and the existing event-log discipline, adding one binding and one additive event type rather than introducing a parallel structure.

### Positioning hooks (offered for consensus, not as decisions)

**Hook (a): a machine-readable guardian-consent artefact for ISO/IEC 27566-2 (Age Assurance).** Where age assurance depends on a guardian consenting for a minor, 27566-2 currently expresses that relationship in prose. B3 offers a candidate machine-readable artefact for it: delegation_basis = guardian, with the guardian as authorizing_party and the minor as subject_party, scoped to a specific notice version and revocable through delegation_revoked. This lands directly on the ISO/IEC WD 27566-2 Annex F practice-statement fragments that the base extension already names as a citation target (Foreword; Annex B.4), giving those practice statements an evidence structure they can reference rather than restate. Offered as a contribution for the committee to consider, not as a settled dependency.

**Hook (b): localised, person-held, revocable authorization for the Personal PII Record Controls model.** The Personal PII Record Controls model needs to express authorization that is local to the individual, held on the person's side, and revocable without a round-trip to the controller. B3 provides that shape: the delegation binding lives in the B2 person-held record, operates anonymous-by-default, and is revoked by an individual-initiated delegation_revoked event rather than by controller action. This extends the B2 wallet-architecture pattern (Annex B.2) with delegated authority (self, agent, or mandate) while preserving the base extension's reference integrity and anonymous-by-default guarantees.

---

## Part B: Clause text to place in the extension

### B.3 Optional Profile B3: Delegated Authorization Record (delegated / localised consent-based authorization)

**Purpose:** Add a Stage 2 delegation binding that records, anonymously by default, when an authorization is granted by one party on behalf of another (local, delegated, or localised consent-based authorization) while chaining every delegated authorization back to the Stage 1 Anchored Notice Receipt. B3 is composition over the base machinery: it introduces no new artefact type and no new event-log spine, and it reuses the Notice Event Log (clause 7.4) for revocation. B3 records are held person-side as an extension of the Optional Profile B2 Personal Processing Record.

This profile applies where the party exercising a choice is not the same party the choice is exercised on behalf of. Examples include a guardian authorizing on behalf of a minor, and a Personal PII Record Controls agent authorizing on behalf of the individual it acts for. The delegation is bound to the disclosed notice version so that a delegated authorization cannot silently widen beyond the notice under which it was granted.

#### B.3.1 Minimum conformance requirements (normative)

A conforming B3 delegated authorization record:

- SHALL preserve base identifiers and version binding (notice_id + notice_version_reference) and SHALL reference the Controller Identification Record via controller_identity_record_id, in accordance with B.0.
- SHALL be expressed as a Stage 2 authorization receipt (Annex D.2) and SHALL reference the applicable Anchored Notice Receipt using anchored_notice_receipt_id, so that the delegation chains to the Stage 1 notice disclosure event.
- SHALL support anonymous or pseudonymous operation by default, consistent with clause 7.3.1; it SHALL NOT require an account_id or a PII principal identifier for either the authorizing party or the subject party.
- SHALL include authorizing_party (the party granting the authorization) and subject_party (the party on whose behalf it is granted).
- SHALL include delegation_basis using the controlled vocabulary in B.3.3; where no delegation is asserted, the value SHALL default to self.
- SHALL bind delegation_scope to notice_version_reference so that the authorized scope cannot exceed the scope disclosed by the referenced notice version; any widening of scope SHALL be treated as a material change under clause 6.3 and SHALL trigger a new notice version and a corresponding Notice Event Log entry.
- SHALL include delegation_validity expressing the time bound or condition bound under which the delegation remains in effect.
- SHOULD include delegation_evidence_reference as a pointer, by reference and not inline, to the backing authority for the delegation, so as to remain data-minimizing.
- SHOULD reference Notice Event Log entries where delegation revocation, material change, or scope escalation is relevant, and SHALL, where a delegation is revoked, record a delegation_revoked event in the Notice Event Log (clause 7.4.1) so that credentials and tokens derived in Stages 3 and 4 can be invalidated per Annex D.5.
- MAY include receipt_id as a pointer to a specific Stage 2 receipt instance; when present it SHOULD be accompanied by notice_version_reference.

#### B.3.2 Delegation field specification table (normative)

Base receipt fields (clause 7.3.2) continue to apply; the fields below are additive.

| Field | Description | Required? | Value type / format | Constraints | Exposure |
| --- | --- | --- | --- | --- | --- |
| authorizing_party | The party granting the authorization (the delegate acting) | Yes | Object (anonymous-by-default) or pseudonymous reference | SHALL NOT require an account_id or PII principal identifier; when identified, SHOULD be data-minimizing and unlinkable; when delegation_basis is self, this party is the individual | Holder issuer |
| subject_party | The party on whose behalf the authorization is granted (the PII principal) | Yes | Object (anonymous-by-default) or pseudonymous reference | SHALL NOT require an account_id or PII principal identifier; SHOULD be represented by the minimum reference sufficient for rights exercise | Holder issuer |
| delegation_basis | The basis on which authorizing_party acts for subject_party | Yes | Controlled vocabulary | SHALL use the vocabulary in B.3.3; SHALL default to self when no delegation is asserted | Holder issuer |
| delegation_scope | The scope of processing authorized under this delegation | Yes | Object or structured reference | SHALL be bound to notice_version_reference; SHALL NOT exceed the scope disclosed by the referenced notice version; widening SHALL be treated as a material change (clause 6.3) | Holder issuer |
| delegation_validity | Time bound or condition bound under which the delegation remains in effect | Yes | Object (for example valid_until date-time, or a named condition such as until_majority) | SHALL express either a time bound or a condition bound; SHALL be evaluable by a relying party to determine whether the delegation is active | Holder issuer |
| delegation_evidence_reference | Pointer to the backing authority for the delegation | No | URL/URI or structured reference | SHALL be by reference and not inline (data-minimizing); when present, SHOULD include reference_uri and authority; the backing authority itself SHALL NOT be embedded in the receipt | Holder issuer (pointer); backing authority restricted |
| anchored_notice_receipt_id | Reference to the applicable Anchored Notice Receipt (Stage 1) | Yes | URI or string identifier | SHALL reference the Stage 1 Anchored Notice Receipt so the delegation chains to the notice disclosure event (Annex D.2) | Holder issuer |

#### B.3.3 delegation_basis vocabulary (normative)

delegation_basis SHALL use one of the following values:

- self
- guardian
- agent
- mandate

Where no delegation is asserted, delegation_basis SHALL default to self. Implementations MAY define additional delegation bases, but SHALL map them to one of the values above for interoperability.

#### B.3.4 How to extend ISO/IEC TS 27560:2023 with B3

Treat the Stage 2 authorization receipt (Annex D.2) as the exchange artefact and the B3 delegation binding as an additive extension of the Optional Profile B2 Personal Processing Record (individual-held):

- Keep B3 minimal (references first): carry the delegation binding on the Stage 2 receipt and hold it person-side under B2, rather than replicating processing inventories.
- Reuse TS 27560:2023 event_time and validity_duration semantics (6.3.7.2, 6.3.7.3) for presented_at and delegation_validity respectively, and align delegation lifecycle events with the Notice Event Log.
- Represent the acting and subject parties using TS party identification only where identification is required; by default both remain anonymous or pseudonymous per clause 7.3.1.

#### B.3.5 Use-case mapping (informative)

1. **ISO/IEC WD 27566-2 guardian consent.** delegation_basis = guardian; subject_party = the minor; delegation_validity = a condition bound (for example until_majority). The backing authority is carried by reference in delegation_evidence_reference and recorded in a practice statement at ISO/IEC WD 27566-2 Clause 10.4 / Annex F, rather than inline. When the minor reaches majority, delegation_validity expires and, per the Annex D.5 note, downstream credentials and tokens are invalidated equivalently to a delegation_revoked event. This aligns with the companion-specification tracking already noted in B.4 (27566-2 Annex F practice statements).

2. **Person-held controller model (Personal PII Record Controls).** delegation_basis = agent; authorizing_party = the individual's Personal PII Record Controls agent acting on the individual's behalf; subject_party = the individual. delegation_scope is bound to notice_version_reference so the agent cannot authorize beyond the disclosed notice, and the whole delegation chains to the Stage 1 Anchored Notice Receipt via anchored_notice_receipt_id. The record is held person-side under Optional Profile B2, keeping the individual as the holder of the evidence spine.

### Addition to clause 7.4.1 (Minimum event types)

Add one event type to the list in clause 7.4.1, so it reads: notice_issued, notice_material_change, delegation_revoked.

### Addition to clause 7.4.3 (Event type registry)

| event_type | Trigger | Required linkages | Notes |
| --- | --- | --- | --- |
| delegation_revoked | On revocation of a delegated authorization recorded under Optional Profile B3 | SHALL include notice_version_reference and the anchored_notice_receipt_id of the revoked delegation; SHOULD include receipt_id | Sits alongside the withdrawal/objection hooks in clause 7.4.3; on revocation, downstream Stage 3 credentials and Stage 4 tokens are invalidated per Annex D.5 |

### Addition to Annex D.5 (Lifecycle and invalidation)

Where a delegated authorization recorded under Optional Profile B3 is revoked, implementations SHOULD record a delegation_revoked event in the Notice Event Log (clause 7.4.1). On recording delegation_revoked, any Stage 3 micro credential and any Stage 4 portable token derived from the revoked delegation SHOULD be treated as invalidated or superseded, and relying parties consulting the Stage 4 status pointer (Annex D.4) SHOULD resolve the delegation as no longer active. Expiry of delegation_validity (for example a guardian delegation reaching until_majority) SHOULD be treated equivalently to revocation for invalidation purposes.

---

## Placement notes

- **B.3** slots after B.2 in Annex B, before the current **B.4** relationship-to-companion-specifications section. That ordering is deliberate: B.4 already names the 27566-2 Annex F practice-statement tracking that B.3.5 use case 1 leans on, so B.3 reads into B.4.
- The **7.4.1** and **7.4.3** additions are the only edits outside Annex B, and both are additive (the existing "SHOULD support hooks for withdrawal/objection" line already anticipates a revocation hook).
- Conformance seam (not a defect): Section 8 mandatory requirements are Base-conformance only, and Annex B profiles are opt-in per Section 5. B3 adds no Section 8 obligation. A conformance claim to B3 is a separate declared claim, matching how B1 and B2 already work.

## Guardrails (checked)

Preserve-and-extend stated explicitly. No asserted regulator or committee endorsement (offered for consensus throughout). CIR = Controller Identification Record. "Personal PII Record Controls" used, never "PAI." No em dashes. Verbal forms restricted to shall/should/may. Field-table columns match clauses 7.1.1 and 7.3.2; the vocabulary block mirrors 7.3.1A.
