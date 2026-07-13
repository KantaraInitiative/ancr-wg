# Kantara Initiative — ANCR Working Group (ANCR WG)

This repository contains the working materials, drafts, and versioned packages produced by the **Anchored Notice and Consent Receipt (ANCR) Working Group** under the Kantara Initiative.

ANCR WG focuses on interoperable, implementation-ready artefacts that support **inspectable, accountable notice and consent receipt exchange**.

## The Consent Receipt (core project)

The **Consent Receipt** is Kantara ANCR WG's foundational transparency artefact for co-regulated digital identification: a machine-readable record handed to a person at the point of notice, capturing who is
processing their data, for what purpose, under what legal basis, and how to exercise
their rights. It turns human consent from an unverifiable claim into inspectable evidence that scale digital trust online.

**Lineage:**

1. **Kantara Consent Receipt** — the original specification that established the
   receipt as the unit of consent evidence.
2. **ISO/IEC 29184:2020 (Annex B)** — the Consent Receipt was adopted into ISO as
   the hosted consent-receipt / consent-record reference, explicitly citing the
   Kantara Consent Receipt specification.
3. **ISO/IEC TS 27560:2023** — became the international consent record information
   structure.
4. **ANCR (Anchored Notice and Consent Receipt)** — anchors the receipt to a
   verifiable controller identity and a notice event, making the record traceable.
5. **Notice Receipt Extension (now complete)** — extends ISO/IEC TS 27560:2023 into
   a receipt-exchange profile for anchored, inspectable notice evidence.

**Spec location:** [`27560-ancr-profile-extension/`](27560-ancr-profile-extension/index.md)
(current working entry point:
[`iso-27560-ts-extension/`](27560-ancr-profile-extension/iso-27560-ts-extension/index.md)).

## Submission index (PWI 26689)

Working-group outputs corresponding to the documents submitted for ISO/IEC JTC 1/SC 27/WG 5
(PWI 26689 — Notice and Consent Records):

- **27560 Consent Receipt Extension** — the receipt-exchange profile extending ISO/IEC TS 27560:2023.
- **PWI 26689 Gap Analysis, Part 1 (Scope A)** — TS 27560:2023 cross-referenced against receipt-exchange requirements.
- **WG5 / CoE Liaison materials** — plenary and Council of Europe liaison decks
  ([`wg5-report-03-2026/`](27560-ancr-profile-extension/wg5-report-03-2026)).

> The canonical version for the submission is a working-group decision and is not
> yet fixed in this repository. See the package index before citing a version.

## Quick links

- ANCR WG Wiki (working area, minutes, decisions, working documents):  
  https://kantara.atlassian.net/wiki/spaces/WA/overview?homepageId=2916356

- Join the ANCR Working Group (membership / participation):  
  https://kantara.atlassian.net/wiki/spaces/WA/overview?homepageId=2916356

## What’s in this repo

- Versioned specification packages and draft documents
- Supporting artefacts (examples, mappings, and related working materials)
- GitHub-facing indexes that point to the appropriate version folders

## How to use this repository

1. Start with the relevant package folder (by topic/version).
2. Use the `index.md` inside that folder to navigate versions and artefacts.
3. Use GitHub Issues/Discussions (if enabled) for change proposals and implementer feedback.

## Contributing

If you are proposing a change, include:
- the target file path and version
- a clear rationale (interoperability, implementability, conformance)
- any security/privacy impact considerations

---
Maintained by the Kantara Initiative ANCR Working Group.
