---
layout: home
title: ANCR Working Group
---

![ANCR Working Group logo]({{ '/assets/ANCR-WG-logo.png' | relative_url }})

# ANCR Working Group, Kantara Initiative

The Anchored Notice and Consent Receipt (ANCR) Working Group builds inspectable,
implementation-ready artefacts for **notice and consent receipt exchange**. Our
flagship artefact is the **Consent Receipt**, and its evolution into the ISO/IEC
TS 27560 Notice Receipt Extension.

## Announcement: Co-Regulated Digital Identification (CDRI)

The ANCR Notice Receipt Extension now specifies **co-regulated digital identification (CDRI)**: a model in which identification is governed by two concurrent rule sets at once, the controller's own rules, and the public rules of treaty, law, and standards. The public rule set is expressed as inspectable record structure and is verifiable before identification occurs. Accountable controller identification and machine-readable notice come first; personal identification follows. This makes the difference between identification that is transparent and identification that is surveillance testable in the record itself.

## The Consent Receipt

The **Consent Receipt** is Kantara's foundational transparency artefact: a
machine-readable record, handed to a person at the point of notice, that captures
who is processing their data, for what purpose, under what legal basis, and how to
exercise their rights. It turns consent from an unverifiable claim into inspectable
evidence.

**Lineage:**

1. **Kantara Consent Receipt**, the original specification that established the
   receipt as the unit of consent evidence.
2. **ISO/IEC 29184:2020 (Annex B)**, the Consent Receipt was adopted into ISO as
   the hosted consent-receipt / consent-record reference, explicitly citing the
   Kantara Consent Receipt specification.
3. **ISO/IEC TS 27560:2023**, became the international consent record information
   structure.
4. **ANCR (Anchored Notice and Consent Receipt)**, anchors the receipt to a
   verifiable controller identity and a notice event, so the record is not just
   issued but traceable.
5. **Notice Receipt Extension (now complete)**, extends ISO/IEC TS 27560:2023 into
   a receipt-exchange profile for anchored, inspectable notice evidence.

**Where to find the spec:**

- ISO/IEC 27560 ANCR Profile Extension package (versioned):
  [27560 ANCR Profile Extension](https://github.com/KantaraInitiative/ancr-wg/tree/main/ancr-ts-27560-extension)
- Current working entry point:
  [ISO-27560 TS Extension](https://github.com/KantaraInitiative/ancr-wg/blob/main/ancr-ts-27560-extension/ancr-ts-27560%20Notice%20Record%20Extension.md)

## Submission index (PWI 26689)

The following working-group outputs correspond to the documents submitted for
ISO/IEC JTC 1/SC 27/WG 5 (PWI 26689, Notice and Consent Records):

- **27560 Notice Receipt Extension**, the receipt-exchange profile extending
  ISO/IEC TS 27560:2023 (the N-doc that carries the Consent Receipt into the
  standard).
- **WG5 / CoE Liaison materials**, the plenary and Council of Europe liaison
  decks.
  [WG5 Report 03-2026 materials](https://github.com/KantaraInitiative/ancr-wg/tree/main/ancr-ts-27560-extension/materials)

> Note: the canonical version for the submission is a working-group decision and is
> not yet fixed in this repository. See the package index for details.

## Other working areas

- **Transparency Performance Indicators (TPI)**, the ANCR transparency-scheme and
  conformity work:
  [TPI](https://github.com/KantaraInitiative/ancr-wg/tree/main/TPI)
- **DPV (Transparency Code of Practice legal model)**, evidence-first DPV-style extension
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
