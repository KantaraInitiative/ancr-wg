# Appendix B — Legal Bases and Context Implementation (v1.02)

Source of truth (GitHub): https://github.com/0pn-lab/iso-27560-unrp

Purpose: Provide implementable guidance for how lawful basis and context interact with `authorization_type`, `notice_type`, and Notice Event Log events.

This appendix is intended to prevent “consent evidence laundering” by making lawful basis explicit, and by constraining which authorization semantics are allowed for each basis/context.

## B.1 Legal bases (Convention 108+)

The baseline lawful bases used in this profile are:

- consent
- contract
- legal_obligation
- legitimate_interest
- vital_interest
- public_interest

## B.2 Context categories

Context categories allow authorization semantics and notice framing to vary without changing the legal-basis vocabulary:

- privacy
- safety
- security
- environment
- ai_system (informative extension)

## B.3 Stage 2 `authorization_type` by legal basis (baseline mapping)

This mapping is the normative baseline for implementations.

Privacy context authorizations:

- consent → `authorization_type = consent_granted`
- contract → `authorization_type = contract_accepted`
- legal_obligation → `authorization_type = legal_access_acknowledged`
- legitimate_interest → `authorization_type = legitimate_interest_objection` (or `legitimate_interest_acknowledged` where a high-risk acknowledgement is required but not permission-gating)
- vital_interest → `authorization_type = emergency_notified`
- public_interest → `authorization_type = public_interest_participation`

Non-privacy context authorizations:

- safety → `authorization_type = safety_acknowledgment`
- security → `authorization_type = security_policy_acceptance`
- environment → `authorization_type = environmental_disclosure_acknowledgment`

## B.4 Minimum Notice Event Log event taxonomy

The Notice Event Log is the authoritative evidence stream. Implementations SHOULD keep the event taxonomy stable and auditable.

Stage 1 (notice):

- `notice_issued`
- `material_change`

Stage 2 (authorization / acknowledgement):

- `consent_granted`
- `contract_accepted`
- `legal_access_acknowledged`
- `objection_received`
- `emergency_notified`
- `public_interest_participation`

Termination and updates:

- `consent_withdrawn` (or a basis-appropriate `authorization_terminated`)
- `permission_changed`

Delegation-related (when delegation is used):

- `delegation_granted`
- `delegation_revoked`
- `delegation_expired`
- `delegation_superseded`

## B.5 Normative implementation rules

B.5.1 Stage separation

- Stage 1 applies to all lawful bases: it is a scope and disclosure rule, not a consent rule.
- Stage 2 semantics MUST match lawful basis (MUST NOT represent Stage 2 as consent unless `lawful_basis = consent`).

B.5.2 Lawful-basis and authorization constraints

- If `lawful_basis = legal_obligation`, implementations MUST NOT emit `consent_granted`.
- If `lawful_basis = contract`, implementations MUST NOT emit `consent_granted`.
- If `lawful_basis = legitimate_interest`, implementations MUST provide an objection-capable mechanism and SHOULD represent that with `objection_received` events (and/or `legitimate_interest_objection` semantics).

B.5.3 Legitimate interest (LI) is not permission-gated

- LI is notify-by-default + objection-capable (not permission-gated).
- Where an acknowledgement is used (for high-risk or sensitive processing transparency), it MUST be represented as an acknowledgement, not a consent.

B.5.4 “Consent required” claims must be testable

- If an implementation asserts `lawful_basis = consent`, it MUST be able to prove the consent grant and withdrawal path via the Notice Event Log.

## B.6 Decision procedure (reference algorithm)

Given a processing action or permission request, determine fields and events as follows:

1. Determine `context_category` (privacy/safety/security/environment/ai_system).
2. Determine `lawful_basis` (one of the 108+ bases).
3. Emit/maintain a Stage 1 Notice Receipt for the scope (before any collection where required by the profile’s Stage 1 rules).
4. If the action requires Stage 2 (authorization/acknowledgement), choose `authorization_type` strictly from the mapping in B.3.
5. Emit the corresponding Stage 2 event in the Notice Event Log.
6. If basis/context changes, emit `permission_changed` and re-issue a notice or material-change event as appropriate.

## B.7 Worked examples (implementer-facing)

B.7.1 Consent (privacy)

- `lawful_basis = consent`
- Stage 2 `authorization_type = consent_granted`
- Notice Event Log: `notice_issued` → `consent_granted` → later possibly `consent_withdrawn`

B.7.2 Contract (privacy)

- `lawful_basis = contract`
- Stage 2 `authorization_type = contract_accepted`
- Notice Event Log: `notice_issued` → `contract_accepted`
- Constraint: MUST NOT emit `consent_granted` for the same permission bundle.

B.7.3 Legal obligation (privacy)

- `lawful_basis = legal_obligation`
- Stage 2 `authorization_type = legal_access_acknowledged`
- Notice Event Log: `notice_issued` → `legal_access_acknowledged`
- Constraint: MUST NOT present this as “consent”.

B.7.4 Legitimate interest (privacy)

- `lawful_basis = legitimate_interest`
- Stage 2: may be absent (notice-only), or represented as `legitimate_interest_acknowledged` (acknowledgement).
- Notice Event Log: `notice_issued` → optional `material_change` → if objection occurs: `objection_received`

B.7.5 Vital interest (emergency)

- `lawful_basis = vital_interest`
- Stage 2 `authorization_type = emergency_notified`
- Notice Event Log: `notice_issued` (or emergency notice) → `emergency_notified`

B.7.6 Public interest participation

- `lawful_basis = public_interest`
- Stage 2 `authorization_type = public_interest_participation`

## B.8 Cross-border transfer & disclosure alignment (baseline)

Where `scope_of_disclosure` implies cross-border transfer and the transfer is material to risk:

- implementations SHOULD emit a `material_change` event when transfer scope materially expands;
- implementations SHOULD capture transfer mechanism and jurisdictions in profile fields (see Appendix A.2 inventory draft).

## B.9 Delegation interaction (binding rules)

If delegation is used to authorize a delegate to act on behalf of an individual:

- implementations MUST represent delegation state changes with delegation events (`delegation_granted`, `delegation_revoked`, `delegation_expired`, `delegation_superseded`)
- any authorization event that relies on delegation SHOULD be linkable to the delegation object via identifiers (e.g., `delegation_id`, `delegation_event_id`/`der_id`, and, if relevant, `incident_envelope_id`).
- fail-closed rule: if delegation state cannot be resolved at the time of action, the action MUST be denied (or treated as unauthorized).