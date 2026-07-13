---
layout: home
title: ANCR Working Group
---

# ANCR Working Group — Kantara Initiative

The Anchored Notice and Consent Receipt (ANCR) Working Group builds inspectable,
implementation-ready artefacts for **notice and consent receipt exchange**. Our
flagship artefact is the **Consent Receipt**, and its evolution into the ISO/IEC
TS 27560 Consent and Notice Receipt Extension.

## The Consent Receipt

The **Consent Receipt** is Kantara's foundational transparency artefact: a
machine-readable record, handed to a person at the point of notice, that captures
who is processing their data, for what purpose, under what legal basis, and how to
exercise their rights. It turns consent from an unverifiable claim into inspectable
evidence.

**Lineage:**

1. **Kantara Consent Receipt** — the original specification that established the
   receipt as the unit of consent evidence.
2. **ANCR (Anchored Notice and Consent Receipt)** — anchors the receipt to a
   verifiable controller identity and a notice event, so the record is not just
   issued but traceable.
3. **ISO/IEC TS 27560 Consent and Notice Receipt Extension** — carries the ANCR
   model into the international standard, extending ISO/IEC TS 27560:2023 (the
   consent record information structure) into a receipt-exchange profile.

**Where to find the spec:**

- ISO/IEC 27560 ANCR Profile Extension package (versioned):
  [27560 ANCR Profile Extension](https://github.com/KantaraInitiative/ancr-wg/tree/main/27560-ancr-profile-extension)
- Current working entry point:
  [ISO-27560 TS Extension](https://github.com/KantaraInitiative/ancr-wg/tree/main/27560-ancr-profile-extension/iso-27560-ts-extension)
- Archived baselines: v1.01 and v1.02 under the same package.

## Submission index (PWI 26689)

The following working-group outputs correspond to the documents submitted for
ISO/IEC JTC 1/SC 27/WG 5 (PWI 26689 — Notice and Consent Records):

- **27560 Consent Receipt Extension** — the receipt-exchange profile extending
  ISO/IEC TS 27560:2023 (the N-doc that carries the Consent Receipt into the
  standard).
- **PWI 26689 Gap Analysis, Part 1 (Scope A)** — the cross-reference of ISO/IEC
  TS 27560:2023 against the receipt-exchange requirements.
- **WG5 / CoE Liaison materials** — the plenary and Council of Europe liaison
  decks.
  [WG5 Report 03-2026 materials](https://github.com/KantaraInitiative/ancr-wg/tree/main/27560-ancr-profile-extension/wg5-report-03-2026)

> Note: the canonical version for the submission is a working-group decision and is
> not yet fixed in this repository. See the package index for details.

## Other working areas

- **Transparency Performance Indicators (TPI)** — the ANCR transparency-scheme and
  conformity work:
  [TPI](https://github.com/KantaraInitiative/ancr-wg/tree/main/TPI)
- **DPV (Convention 108+ legal model)** — evidence-first DPV-style extension
  material:
  [dpv](https://github.com/KantaraInitiative/ancr-wg/tree/main/dpv)

## Participate

- GitHub repository: <https://github.com/KantaraInitiative/ancr-wg>
- ANCR WG Wiki (minutes, decisions, working docs, participation):
  <https://kantara.atlassian.net/wiki/spaces/WA/overview?homepageId=2916356>
- [About the ANCR Working Group](./about.md)

## Notes

- This site is published from the `docs/` folder (GitHub Pages / Jekyll). Pages
  outside `docs/` are linked to the GitHub repository tree, which always resolves.
