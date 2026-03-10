# Appendix J — AI System Context Implementation (Informative) (v1.02)

Source of truth (GitHub): https://github.com/0PN-lab/specs/tree/732bf836290a7d8df69d19fc798192e781ab35d2/ISO-27560%20Extension%20

Status: INFORMATIVE — This appendix does not affect conformance to the Universal Notice Receipt Profile. AI system transparency support is OPTIONAL for base profile conformance.

## J.1 AI System Notice Types

When `context_category="ai_system"`, the following `notice_type` values enable AI-specific transparency.

J.1.1 Automated Decision-Making Disclosure

- `notice_type`: `automated_decision_disclosure`
- Use case: Informing individuals that an AI system will make or significantly influence decisions affecting them.
- Alignment notes (non-normative examples): Convention 108+ automated decision rights; GDPR Article 22; ISO/IEC 42001 Annex B.8.2.

Example Notice Receipt

Inline JSON example (for illustration):

{

"schema_version": "27560-UNIVERSAL-NOTICE-2025-1.0",

"receipt_id": "ai-notice-001",

"controller_identity_record_id": "CIR-CA-FINANCE-789",

"notice_receipt_type": "ANCR Exchange Stage 1",

"notice_type": "automated_decision_disclosure",

"context_category": "ai_system",

"ai_system_disclosure": {

"system_name": "Credit Scoring Model v2.3",

"intended_purpose": "Automated creditworthiness assessment",

"decision_scope": "Loan approval up to $50,000 CAD",

"human_oversight_available": true,

"explainability_mechanism": "SHAP values provided on request via rights_access_point"

},

"scope_of_disclosure": "regional",

"permissions_bundle": [

"automated_decision_making",

"human_review_on_request"

]

}

J.1.2 AI Model Update Notification

- `notice_type`: `disclosure`
- Use case: Material change notification when AI model version changes significantly.

Example Material Change Disclosure

{

"notice_type": "disclosure",

"context_category": "ai_system",

"material_change_description": "Credit scoring model updated from v2.3 to v3.0. New model trained on 2024 data; accuracy improved from 89% to 92%.",

"change_effective_date": "2026-01-15",

"impact_to_individual": "Previous credit scores may be recalculated under new model. Individuals may request manual review within 30 days.",

"event_type": "ai_model_retrained"

}

J.1.3 AI System Deployment Notice

- `notice_type`: `notification`
- Use case: Initial notice when AI system begins processing individual data.

J.1.4 Performance Drift Disclosure

- `notice_type`: `disclosure`
- Use case: Material change when AI system performance degrades or exhibits unexpected behavior.

## J.2 AI-Specific Authorization Types (ANCR Exchange Stage 2)

When individuals authorize AI system processing, `authorization_type` extends to include:

J.2.1 Automated Decision Consent

- `authorization_type`: `automated_decision_consent`

Example Authorization

{

"authorization_type": "automated_decision_consent",

"consent_timestamp": "2025-12-12T10:00:00-05:00",

"decision_scope": "Employment screening—resume filtering only; final hiring decision by human recruiter",

"human_review_availability": "Request manual review within 14 days via rights_access_point",

"explainability_access": "Decision factors provided automatically with rejection notice",

"permissions_bundle": [

"automated_resume_screening",

"human_review_on_request",

"explainability_report_generation"

],

"withdrawal_mechanism": "Email [privacy@example.com](mailto:privacy@example.com)—withdrawal effective within 48 hours"

}

J.2.2 AI Training Data Consent

- `authorization_type`: `ai_training_data_consent`

Example

{

"authorization_type": "ai_training_data_consent",

"consent_timestamp": "2025-12-12T10:05:00-05:00",

"training_purpose": "Improve recommendation algorithm accuracy",

"data_retention_training": "Training data retained for model lifecycle; deleted when model decommissioned (estimated 24 months)",

"opt_out_mechanism": "Disable via account settings—future interactions excluded from training",

"anonymization_guarantee": "Personal identifiers removed before training; only behavioral patterns utilized"

}

J.2.3 Explainability Request Authorization

- `authorization_type`: `explainability_request`

## J.3 AI Notice Event Log Requirements

When `context_category="ai_system"`, the Notice Event Log SHOULD record AI-specific events aligned to AI management controls (e.g., ISO/IEC 42001 Annex B.6.2.8 as a reference).

J.3.1 Minimum AI events

- `ai_decision_made`: AI system makes or influences a decision affecting the individual
- `ai_model_retrained`: Model retrained or version updated
- `human_override_exercised`: Human reviewer overrides an AI decision
- `explainability_requested`: Individual requests decision explanation
- `ai_performance_drift_detected`: Performance below threshold or bias detected

Example Event Log Entry

{

"event_time": "2025-12-10T14:22:00-05:00",

"event_type": "ai_decision_made",

"entity_id": "CIR-CA-FINANCE-789",

"decision_metadata": {

"decision_id": "loan-app-12345",

"model_version": "credit-scoring-v2.3",

"outcome": "approved",

"confidence_score": 0.87,

"primary_factors": ["income_stability", "credit_history_length", "debt_to_income_ratio"]

},

"human_review_available": true

}

## J.4 High-Risk AI Enhanced Transparency

When an AI system is classified as high-risk, controllers SHOULD enhance CIR with `ai_system_documentation`.

Example AI System Documentation in CIR

{

"controller_identity_record_id": "CIR-EU-HR-AI-456",

"ai_system_documentation": {

"system_name": "Automated Resume Screening System",

"risk_classification": "high_risk_per_eu_ai_act_annex_iii_4a",

"conformity_assessment_body": "TÜV SÜD notified body #1234",

"ce_marking_reference": "CE-AI-2025-567",

"intended_purpose": "Pre-screen job applications for skills match; final hiring decision by human recruiter",

"prohibited_use_cases": [

"Sole determinant of hiring decision",

"Personality assessment",

"Discriminatory filtering"

],

"human_oversight": {

"oversight_type": "human_in_command",

"override_available": true,

"override_mechanism": "Hiring manager reviews all AI recommendations before decision",

"oversight_competence_requirements": "Trained on bias detection and model limitations"

},

"performance_metrics": {

"accuracy": 0.89,

"fairness_audit_date": "2025-11-15",

"demographic_parity_deviation": 0.04,

"false_positive_rate": 0.08

},

"model_transparency": {

"algorithm_type": "gradient_boosted_decision_trees",

"explainability_method": "SHAP",

"training_data_sources": "Anonymized historical hiring data 2020-2024; public job description corpus",

"bias_mitigation_measures": [

"Protected attributes excluded from training",

"Fairness constraints applied during optimization",

"Regular bias audits per ISO/IEC TR 24027"

]

},

"update_frequency": "quarterly_retraining_with_fairness_audit"

}

}

## J.5 Cross-Border AI Model Deployment

When AI training, deployment, or inference occurs across jurisdictions, enhanced transparency is required.

Example training vs inference jurisdiction disclosure

{

"scope_of_disclosure": "international",

"recipient_jurisdictions": [

{

"country_code": "US",

"role": "ai_model_training",

"adequacy_status": "no_decision",

"data_processed": "Training dataset—anonymized interactions 2020-2024",

"legal_regime": "Foreign intelligence surveillance legislation may permit government access to data of non-US persons"

},

{

"country_code": "CA",

"role": "ai_inference",

"adequacy_status": "adequate",

"data_processed": "Real-time inference processed in Canadian data centers"

}

]

}

## J.6 Conformance and Standards Alignment

Optional AI System Transparency Extension (informative claim):

Organizations claiming an AI System Transparency Extension conformance SHOULD:

1. Implement Universal Notice Receipt Profile (mandatory base)
2. Use `context_category="ai_system"` when AI systems process personal data
3. Log AI-specific events per J.3
4. Disclose human oversight mechanism in authorization and/or CIR documentation
5. Disclose cross-border AI deployment jurisdictions when `scope_of_disclosure="international"`

## J.7 Implementation Guidance

For controllers deploying AI systems:

- Classify AI risk level using applicable framework
- Extend CIR with `ai_system_documentation` if high-risk
- Generate Stage 1 notice receipt with ai_system context before processing
- Configure Notice Event Log to capture AI-specific events
- Provide explainability mechanism via `rights_access_point`

Appendix J Status: INFORMATIVE

Conformance Impact: None

V1.1 Scope: Standardize AI-specific requirements after base infrastructure adoption