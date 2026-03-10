# ISO/IEC 27560:2025-1 Universal Notice Receipt Profile v1.02

## Part 3 — Delegation baseline (incident / emergency operations)

This Part is the v1.02 uplift: delegation is promoted to a first-class, testable object (Delegation Receipt + Delegation Event Record), with Notice Event Log event taxonomy plus binding and fail-closed verification semantics.

---

## Delegation (incident / emergency operations)

Purpose: Provide interoperable requirements for delegated authority in time-critical operations (e.g., Incident Command System), without changing legal basis semantics.

### Non-overlap rule (normative)

- Delegation does not create legal basis.
- Delegation expresses who may act on whose behalf and under what scope.
- Any processing still requires an upstream lawful basis (e.g., consent, contract, legal obligation, vital interest, public interest, lawful authority) and must remain auditable via the Notice Event Log.

---

## Delegation Receipt (normative)

Controllers supporting delegation of authority for operations affecting notice/authorization state SHALL support a Delegation Receipt that records delegation for a defined scope and duration.

---

## Delegation as a first-class object (DER model) — conditional, but core pattern

This profile treats delegation as a first-class object with explicit state transitions.

Conditional implementation rule: Implementations SHALL support the DER model when runtime delegation verification is required (for example, cross-border delegation, multi-party incident command, or any case where admission must fail-closed if delegation state cannot be verified).

Delegation Event Record (DER): A canonical, auditable object representing a delegation state transition.

- Event types: `grant`, `revoke`, `expire`, `supersede`
- Purpose: enable portable, independent determination of “is this delegation currently valid?”

Minimum portable fields (DER):

- `delegation_event_id` (or `der_id`)
- `incident_id` (or `incident_envelope_id`)
- `event_type`
- `issued_at`
- `expires_at` (required for grants)
- `issuer_ref`
- `assignee_ref`
- `delegated_role_or_function`
- `operations_allowed[]`
- `data_class_boundary[]`
- `delegation_chain[]` (optional)
- `overlay_requirements[]` (optional)
- `jurisdiction_profile_id` (optional)
- `previous_delegation_event_id` (required for revoke/supersede)
- `integrity_proof` (signature hash, key id, algorithm)
- `verifier_endpoint`

Fail-closed runtime rule (normative): If delegation state cannot be resolved (verifier unavailable, state ambiguous), the system SHALL deny operations that require delegation.

Binding rule (normative): Execution-time receipts (and any warrant/order token used for execution) SHALL reference the `delegation_event_id` (or `delegation_id`) and the `incident_envelope_id` so verifiers can bind governance → execution → audit.

---

## Delegation Receipt required fields

- `delegation_id`: globally unique identifier
- `delegator`: identifier for the delegating authority
- `delegate`: identifier for the receiving role or person
- `delegation_role`: role the delegate is acting in
- `delegation_scope`: operations and information classes covered
- `delegation_constraints`: time bounds and operational constraints
- `effective_time` and `expiry_time`
- `revocation_mechanism`: pointer to Notice Event Log endpoint and revocation event type(s)
- `evidence_binding`: binding to Controller Identification Record (CIR) version hash at issuance (when active state validation is enabled)

---

## Delegation restrictions (normative)

- Delegation SHALL be time-bounded and SHALL include an `expiry_time`.
- Delegation SHOULD be expressed by role (not per-person) to reduce operational friction.
- Implementations SHALL support a policy decision that sub-delegation is either prohibited, or permitted only when `delegation_chain` is present and limits are enforced.

---

## Notice Event Log events for delegation (normative)

Notice Event Logs SHALL support the following event types when delegation is used:

- `delegation_granted`
- `delegation_revoked`
- `delegation_expired`
- `delegation_superseded` (required when supersession is used)

Each delegation event SHALL include `delegation_id` (and SHOULD include `delegation_event_id` when DER is used) and SHALL be independently verifiable (e.g., by signature, log binding, or registry verification level).

---

## Delegation and execution receipts (normative binding rule)

When an operation is executed under delegation, the execution-time receipt SHALL reference:

- `delegation_id`
- `delegation_role`
- `delegation_scope` (or a hash/reference)

This creates a portable chain from governance (delegation) → execution → audit.