# DPV-27560 Conformance Test (draft) — evidence-first (ANCR)

## Purpose
Define a **DPV-27560 conformance test** that is evidence-first and makes the ANCR requirements **testable**. This is not a DPV vocabulary test. It is an implementation/guidance conformance test for DPV-27560 use in open-network digital identification contexts.

## What this test asserts
An implementation claiming conformance MUST be able to provide evidence that:
- **Controller identification happened first** (before any governed disclosure or processing)
- **Notice was delivered before processing** (not record-first, notice-later)
- **Authorization (when consent is the legal basis) is separate from permission enforcement**
- **Notice version binding is durable** (post-hoc rewriting is detectably non-conformant)
- **Recipients are explicit and accountable** at the time of interaction
- **Principal identifier binding is governed** and not forced as a default disclosure event

## Conformance levels (recommended)

### Level A — DPV-27560 Structural Conformance (baseline)
Focus: the record/receipt is well-formed and uses the DPV-27560 schema/profile correctly.

**A1. Profile identifier present**
- A consent record MUST declare the profile IRI using `dct:conformsTo`.

**A2. Record identifier present**
- A consent record MUST include a stable record identifier (`dct:identifier` or equivalent per guidance).

**A3. Processing context fields populated (minimum set)**
- For each processing context, the record MUST be able to represent:
  - the technical / digital-id context of use
  - controller identification
  - controller jurisdiction (normative legal jurisdiction)
  - controller contact points
  - purpose(s)
  - legal basis
  - recipient(s)
  - public access endpoint (rights access point)
  - withdrawal method

**A3.1 Proportional disclosure support (structural capability)**
- The record MUST support representing additional fields to express, where relevant:
  - scope of surveillance
  - scope of processing authority
  - identifier binding conditions (if/when a principal identifier is used)

**A3 Rationale (informative)**
Digitally intermediated contexts do not provide the inherent situational visibility present in physical-world interactions. For open-network digital identification, implementations therefore need a structured way to represent controller jurisdiction/authority and disclosure scope prior to (or independent of) any principal identifier binding.

Outcome: a DPV-27560 record can be parsed and compared across implementations.

### Level B — Evidence-First Conformance (ANCR)
Focus: conformance includes **testable sequencing and binding**.

**B1. Sequence integrity (Controller-ID → Notice → Authorization → Enforcement)**
Pass condition: evidence demonstrates that notice delivery occurred before any processing event.
- MUST show: a Controller Identification Record (or equivalent controller identification artefact) is available prior to notice/processing.
- MUST show: notice is delivered before any `dpv:Collect` / `dpv:Use` / `dpv:Transfer` event.
- MUST show: authorization event time is before enforcement events.

**B2. Notice version binding**
Pass condition: authorization evidence is bound to a specific notice version.
- MUST show: notice has issuance/modification metadata (or an immutable identifier) sufficient to distinguish versions.
- MUST show: authorization references that notice version (directly or via a binding artefact).

**B3. Recipient transparency**
Pass condition: all recipients/third parties are explicit at time of interaction.
- MUST show: recipients are enumerated or bounded by an explicit, testable scope.
- MUST show: recipient role/accountability is declared (e.g., controller vs recipient vs processor, as applicable).

**B4. Identifier governance**
Pass condition: principal identifiers are not forced as a default disclosure.
- MUST support: an anonymous-by-default first-contact artefact (Stage 1).
- MUST show: any principal identifier binding is explicitly permitted after controller identification + notice.

## Test vectors (what an auditor/reviewer should ask for)
Provide two traces for evaluation:

1) **Happy path (valid evidence-first flow)**
- Controller-ID artefact
- Notice artefact (versioned)
- Authorization event (time-stamped)
- Enforcement event(s)
- Receipt/record object that binds these together

2) **Failure path (record-first, notice-later)**
- Demonstrate that the test rejects cases where notice timestamps occur after processing begins, or where notice version cannot be fixed.

## Minimal artefacts the PII principal should receive
- A notice receipt (portable) that can be verified independently.
- A pointer to controller identification and access point.