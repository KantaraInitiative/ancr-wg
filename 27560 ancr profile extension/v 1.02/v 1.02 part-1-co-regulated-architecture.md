# ISO/IEC 27560:2025-1 Universal Notice Receipt Profile v1.02

## Part 1 — Co-regulated notice receipt architecture

This file contains Part 1 content for the v1.02 baseline.

Note: v1.02 is intended to be backward compatible with v1.01 for implementations that do not use delegation.

---

## 1. Scope

### 1.1 Profile objectives

Primary innovation: Four-stage ANCR (Anchored Notice and Consent Receipt) authorization exchange

- Stage 1: Notice Receipt (mandatory)
    - Controller presents CIR before requesting any PII.
    - Individual can remain anonymous.
    - Both parties hold synchronized proof (Two-Factor Notice).
- Stage 2: Authorization Receipt (optional; context-dependent)
    - Individual returns Stage 1 receipt with explicit authorization.
- Stage 3: Micro Notice Credential (optional)
    - Cryptographically verifiable credential for API/device authorization.
- Stage 4: Notice Token (optional)
    - Portable authorization token anchored to individual-controlled identifier (for cross-controller portability).

### 1.2 Scope: digital privacy across all legal bases

Applies to PII processing under any Convention 108+ lawful basis:

- Consent
- Contract
- Legal obligation
- Legitimate interest
- Vital interest
- Public interest

### 1.3 Profile boundaries

- Stage 1 (Notice Receipt) is mandatory for base conformance.
- Stages 2 to 4 are optional protocol extensions.
- Field-level compatibility maintained with ISO/IEC 27560-1:2025 Section 6.5.

### 1.4 Terminology: notice and consent receipts

- Notice Receipt: universal bilateral record documenting controller notification under any legal basis.
- Privacy receipt (base standard term): notice receipt in PII contexts.
- Consent receipt (TS 27560:2023 term): notice receipt with authorization_type = consent_granted.

---

## 2. Normative references

### 2.1 Primary normative references

- Council of Europe Convention 108+
- ISO/IEC 27560:2025 WD (submission draft)
- ISO/IEC 29100:2011

### 2.2 Operational implementation references

- EU Regulation 2018/1725
- W3C Data Privacy Vocabulary (DPV)

### 2.3 Non-normative references

- GDPR (EU 2016/679)
- ISO/IEC 29184:2020 (historical contribution; not normative here)

---

## 3. Terms and definitions (selected)

- Controller Identification Record (CIR): structured public controller information enabling independent receipt generation and verification.
- Two-Factor Notice (2FN): both controller and individual hold synchronized proof-of-notice.
- Notice Event Log: append-only log of notice receipt lifecycle and state changes.
- Anonymous-by-default: Stage 1 shall not require pii_principal_id.

---

## 4. Abbreviations

ANCR, CIR, 2FN, PII, WD

---

## 5. Universal notice receipt architecture

### 5.1 Relationship to ISO/IEC 27560-1:2025

This profile extends the base standard with a notice-first architecture and multi-basis applicability.

### 5.2 Co-regulated transparency infrastructure

Receipt generation can occur independently using public CIR information.

### 5.3 Anonymous-by-default architecture

Stage 1 removes pii_principal_id.

### 5.4 Controller Identification Record (CIR)

CIR is publicly accessible (for example: /.well-known/transparency/notice.txt).

### 5.5 Two-Factor Notice (2FN)

2FN provides bilateral proof-of-notice for both parties.

### 5.6 Notice Event Log

Append-only audit trail: issuance, authorization, material change, rights exercise.

---

## 6. ANCR Exchange Stage 1 — field specification (outline)

This GitHub-ready file currently carries the Stage 1 field spec as an outline plus the full mapping table in Appendix A.

---

## 7. Conformance

### 7.1 Mandatory for Universal Notice Receipt Profile conformance

1. CIR publication before processing.
2. CIR accessible without authentication.
3. Stage 1 shall not require pii_principal_id.
4. Implement Two-Factor Notice.
5. Maintain queryable Notice Event Log.
6. Specify scope_of_disclosure.

### 7.2 Optional enhancements

- Registry verification
- Stages 2 to 4 protocol
- Cryptographic signatures for high-assurance contexts

---

## Completeness note

This file is intentionally structured for GitHub export. If additional Part 1 subsections exist in the canonical v1.01 baseline, append them here before release.

If you are publishing a strict v1.02 baseline, keep Part 1 aligned with v1.01 and carry v1.02 changes primarily in Part 3 (delegation uplift).