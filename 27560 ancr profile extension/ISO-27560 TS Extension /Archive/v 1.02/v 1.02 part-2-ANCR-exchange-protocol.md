# ISO/IEC 27560:2025-1 Universal Notice Receipt Profile v1.02

## Part 2 — ANCR (AuthC) exchange protocol (optional)

This file contains Part 2 content for the v1.02 baseline.

---

## Section 12: Authorization Exchange Overview

### 12.1 Addressing Base Standard Gap

ISO/IEC 27560:2025 does not specify exchange protocol for privacy receipts. This authorization exchange protocol defines:

- Exchange pattern: How receipts flow between parties across four stages
- Exchange semantics: What each stage authorizes
- Exchange structure: Field additions per stage
- Universal applicability: Same pattern across privacy, safety, security, environment contexts

### 12.2 Four-Stage Progression

- ANCR Exchange Stage 1 (Notice Receipt): Notice acknowledgment (bilateral proof)
- ANCR Exchange Stage 2 (Consent Notice Receipt): Explicit authorization (consent, contract, policy acceptance, etc.)
- ANCR Exchange Stage 3 (Micro Notice Credential): Technical context authorization (API, device, remote verification)
- ANCR Exchange Stage 4 (Notice Token): Individual-controlled authorization portability (agentic coordination, authorization in digital wallets)

---

## Section 13: ANCR Exchange Stage 2 — Consent Notice Receipt

### 13.1 Authorization Types by Context and Legal Basis

Privacy context authorizations:

- Consent: authorization_type="consent_granted"
- Contract: authorization_type="contract_accepted"
- Legal obligation: authorization_type="legal_access_acknowledged"
- Legitimate interest: authorization_type="legitimate_interest_objection"
- Vital interest: authorization_type="emergency_notified"
- Public interest: authorization_type="public_interest_participation"

Non-privacy context authorizations:

- Safety: authorization_type="safety_acknowledgment"
- Security: authorization_type="security_policy_acceptance"
- Environment: authorization_type="environmental_disclosure_acknowledgment"

---

## Section 14: ANCR Exchange Stage 3 — Micro Notice Credential

### 14.1 Technical Context Authorization

Field additions:

- cryptographic_signature
- credential_binding
- technical_permissions_scope
- validity_period

Use cases:

- API authorization with granular permissions
- Cross-device authorization synchronization
- Third-party Controller verification without full receipt sharing
- IoT device authorization for safety/security contexts

---

## Section 15: ANCR Exchange Stage 4 — Notice Token

### 15.1 Individual-Controlled Portability

Field additions:

- principal_anchor
- token_claims
- cross_controller_metadata
- portability_scope

Use cases:

- Agentic coordination with consent authorization tokens
- Authorization wallet management
- Directed authorization to third-party controllers
- Cross-jurisdictional authorization portability

---

## Section 16: Authorization Exchange Conformance

### 16.1 Conformance Levels

- Universal Notice Receipt Conformance: Stage 1
- Authorization Exchange Conformance: Stage 1 + Stage 2
- Full Protocol Conformance: Stages 1–4

### 16.2 Mandatory for Authorization Exchange

- Stage 2 support for contexts requiring explicit authorization
- Notice Event Log updates for authorization events
- Authorization withdrawal/termination mechanism

---

## Section 17: Token Security Considerations

### 17.1 Replay Attack Prevention

- Unique token identifiers (jti)
- Time-bound tokens with expiration
- Nonce-based challenge-response

### 17.2 Authorization Freshness Validation

- Token issuance must be after latest Notice Event Log material change
- Controllers reject tokens issued before policy updates

### 17.2.1 Active State Synchronic Validation (Level 4)

For Level 4 implementations, consent tokens SHALL include cryptographic binding to the CIR state at time of issuance.

### 17.3 Revocation Mechanism

- Notice Event Log tracks revocation events
- Controllers maintain revocation list
- Real-time revocation check API
