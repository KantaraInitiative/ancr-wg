# Appendix A — Field mapping to ISO/IEC 27560-1:2025 (v1.02)

Source of truth (GitHub): https://github.com/0pn-lab/iso-27560-unrp

Note: the full mapping tables (one row per field, with clause refs, cardinality, and types) still need to be completed. Until then, this appendix carries a minimum viable mapping set sufficient for implementer alignment.

## A.1 Minimum viable mapping table (selected)

| Base standard (27560) | Profile field (UNRP) | Clause ref (if known) | Change type | Notes |
| --- | --- | --- | --- | --- |
| record_id | receipt_id | 6.3.3.2 | Renamed | Semantic clarity: "receipt" instance tracking |
| pii_principal_id | pii_principal_id | 6.3.3.1 | Constrained | Removed from Stage 1 (anonymous-by-default); optional Stage 2+ |
| party_id (Controller role) | controller_identity_record_id | 6.3.6.* | Extended | Used as CIR-ID; supports registry verification |
| (none) | cir_publication_url | N/A | New | Public CIR location (e.g., /.well-known/transparency/notice.txt) |
| (none) | notice_receipt_type | N/A | New | Stage 1–4 progression indicator |
| (none) | notice_type | N/A | New | notification/disclosure/policy/signal/statement |
| (none) | context_category | N/A | New | privacy/safety/security/environment/ai_system |
| (none) | two_factor_notice_indicator | N/A | New | 2FN pattern flag |
| (none) | scope_of_disclosure | N/A | New | Risk-proportionate disclosure scope |
| (none) | permissions_bundle | N/A | New | Granular permissions; requested Stage 1, granted Stage 2+ |
| (none) | authorization_type | N/A | New | Stage 2+ basis/context semantics |
| event_time | event_time | 6.3.1.1 | Unchanged | Also used for Notice Event Log entries |
| event_type | event_type | 6.3.1.2 | Extended | Adds profile event types; delegation-related when used |

## A.2 Full inventory (draft)

This is a draft “full inventory” table for Appendix A. Clause references and some requirement levels are still TBD pending final alignment against the ISO/IEC 27560-1:2025 text.

Legend:

- Stage 1 = Notice Receipt
- Stage 2+ = Authorization/credential/token stages

| Base field (27560) | Profile field (UNRP) | Clause ref | Requirement (Stage 1) | Requirement (Stage 2+) | Data type / allowed values | Change rationale / notes |
| --- | --- | --- | --- | --- | --- | --- |
| schema_version | schema_version | TBD | Required | Required | string | Profile uses explicit schema versioning for interoperability |
| record_id | receipt_id | 6.3.3.2 (base) | Required | Required | string (UUID/URI) | Rename for semantic clarity: receipt instance tracking |
| record_timestamp | receipt_timestamp | TBD | Required | Required | datetime (ISO 8601) | Rename to distinguish receipt issuance time |
| pii_principal_id | pii_principal_id | 6.3.3.1 (base) | Prohibited | Optional/Conditional | string | Anonymous-by-default Stage 1; only present when identity binding is required |
| party_id (Controller role) | controller_identity_record_id | 6.3.6.* (base) | Required | Required | string (CIR-ID) | Promote controller identity to first-class reference (CIR-ID) |
| (none) | cir_publication_url | N/A | Required | Required | string (URL) | Public location of CIR (e.g., /.well-known/transparency/notice.txt) |
| (none) | notice_receipt_type | N/A | Required | Required | string enum: Stage 1, Stage 2, Stage 3, Stage 4 | Explicit stage progression |
| (none) | notice_type | N/A | Required | Required | string enum: notification, disclosure, policy, statement, signal | Needed to distinguish notice semantics |
| (none) | context_category | N/A | Optional | Optional | string enum: privacy, safety, security, environment, ai_system | Domain categorization (ai_system is informative extension) |
| (none) | two_factor_notice_indicator | N/A | Required | Required | boolean | Signals 2FN bilateral proof pattern |
| (none) | scope_of_disclosure | N/A | Required | Required | string enum (implementation): local/community/regional/national/international (or your scoped taxonomy) | Risk-proportionate transparency requirement |
| (none) | notice_event_log_url | N/A | Required | Required | string (URL) | Queryable append-only log endpoint |
| (none) | notice_event_log_id | N/A | Required | Required | string | Identifier for the log stream (if used) |
| event_time | event_time | 6.3.1.1 (base) | Required | Required | datetime (ISO 8601) | Used for notice issuance and subsequent events |
| event_type | event_type | 6.3.1.2 (base) | Required | Required | string enum | Extended with UNRP event taxonomy (e.g., notice_issued, material_change, consent_withdrawn; plus delegation events when used) |
| entity_id | entity_id | 6.3.1.* (base) | Required | Required | string | Typically CIR-ID for controller-initiated events |
| lawful_basis | lawful_basis | TBD | Required | Required | string enum (108+): consent, contract, legal_obligation, legitimate_interest, vital_interest, public_interest | Multi-basis applicability |
| purposes | purposes | TBD | Required | Required | array/string | May be constrained (recommended: one primary purpose per receipt) |
| retention_period | retention_period | TBD | Optional | Optional | string (ISO 8601 duration) | Keep base disclosure where applicable |
| processing_locations | processing_locations | TBD | Optional/Conditional | Optional/Conditional | array | Used to determine scope_of_disclosure and cross-border context |
| (none) | permissions_bundle | N/A | Optional | Optional/Conditional | array/object | Requested permissions at Stage 1; granted permissions at Stage 2+ |
| (none) | authorization_type | N/A | Prohibited | Conditional | string enum | Stage 2+ semantics by basis/context (consent_granted, contract_accepted, etc.) |
| (none) | consent_timestamp | N/A | Prohibited | Conditional | datetime (ISO 8601) | Records when authorization was granted (Stage 2+) |
| (none) | cryptographic_signature | N/A | Prohibited | Optional/Conditional | string | Stage 3+ signature over receipt/permissions |
| (none) | credential_binding | N/A | Prohibited | Optional/Conditional | object/string | Stage 3 binding (device/session/API key) |
| (none) | technical_permissions_scope | N/A | Prohibited | Optional/Conditional | array | Stage 3 technical enforcement scope |
| (none) | validity_period | N/A | Prohibited | Optional/Conditional | string/datetime | Credential expiration (Stage 3+) |
| (none) | principal_anchor | N/A | Prohibited | Optional/Conditional | string | Stage 4 portable anchor (DID/public key/wallet) |
| (none) | token_claims | N/A | Prohibited | Optional/Conditional | object | Stage 4 token claim set |
| (none) | cross_controller_metadata | N/A | Prohibited | Optional/Conditional | object | Provenance / portability metadata |
| (none) | portability_scope | N/A | Prohibited | Optional/Conditional | string | Portability constraints (geo/purpose) |
| (none) | transfer_mechanism | N/A | Conditional | Conditional | string enum | Required when scope_of_disclosure implies cross-border transfer disclosure |
| (none) | recipient_jurisdictions | N/A | Conditional | Conditional | array | ISO 3166-1 alpha-2 codes or objects |
| (none) | surveillance_risks | N/A | Conditional | Conditional | object | Required for informed consent where surveillance risk is material |
| (none) | transfer_consent_validation | N/A | Conditional | Conditional | object | Proves cross-border informed consent details |

Implementation note:

- For delegation, see the v1.02 delegation baseline (Part 3) and ensure Notice Event Log supports delegation_* events with binding identifiers (delegation_id, delegation_event_id/der_id, incident_envelope_id) where applicable.