# ANCR WG contribution: ANCR DPV Model Extension

A Convention 108+ legal model expressed in DPV style, with an AI transparency profile, and evidence based acceptance criteria for the record structure specified by the ANCR extension to ISO/IEC TS 27560:2023.

## What this is

A vocabulary and legal model layer. It maps the fields specified in the ANCR extension into DPV terms, anchors them to the modernised Convention 108, and states acceptance criteria that can be tested against a record or a receipt rather than against a policy document.

It covers:

- proposed namespace and reused DPV modules;
- Convention 108+ legal bases, Article 5.2, and compatibility of further processing, Article 5.4(b), kept separate from legal basis;
- principles, Articles 5, 8, and 14, and rights, Article 9;
- transparency requirements, Article 8 and Article 14, expressed with timing and custody conditions;
- the DPV expression of the Controller Identification Record field set;
- a proposed information set for dynamic data and AI systems, I1 to I16;
- an AI transparency profile, I3, I5, I6, and I16, anchored to the EU AI Act and ISO/IEC 22989 rather than to Convention 108+;
- evidence based acceptance criteria: sequence integrity, notice binding, receipt availability and custody, recipient transparency, identifier governance, the AI transparency profile, and rights and lifecycle routes.

## What this is not

This is not a second record structure. The record structure is specified once, in the ANCR extension one directory up, and this document does not restate or vary it.

It is not a Council of Europe text, a W3C DPVCG deliverable, a Kantara Initiative recommendation, or an ISO/IEC publication. Every `conv108:` term is a proposal of this draft. References to standards indicate alignment only.

## Scope discipline

**Precedence.** The ANCR extension governs the record structure: the Controller Identification Record field set, the Notice Record, the Notice Version Object, the Notice Receipt, the Authorization State Object, and the Notice Event Log. This document governs the vocabulary mapping and the legal model. Where the two diverge, the ANCR extension governs and this document is corrected.

**No duplicate terms.** No `conv108:` term is minted for a field the ANCR extension already defines. `notice_id`, `notice_version_reference`, `notice_hash`, `published_at`, `receipt_id`, `purpose_state`, and `record_validity` are reused by name and mapped in clause 7.2. The earlier candidates `conv108:hasNoticeVersionHash` and `conv108:hasReceiptIdentifier` are retired.

**Provisional namespace.** Terms are published under an ANCR controlled base, `https://kantarainitiative.github.io/ancr-wg/ns/conv108plus#`, so that a draft proposal is not mistaken for a registered DPV namespace. The intended migration destination, subject to a DPVCG decision, is stated in clause 2.

## Files

- `ancr-dpv-extension-spec.md`. The ANCR DPV Model Extension: proposed namespace, Convention 108+ legal bases, principles, rights, transparency requirements, the DPV expression of the CIR field set, the I1 to I16 information set with its AI transparency profile, the ANCR field mapping for I12, I13, and I15, the chain of notice role binding, and the acceptance criteria. Status: 0.3 external review draft.
- `README.md`. This file.

## Intended use

Read alongside `../ancr-ts-27560 Notice Record Extension.md`, which specifies the record structure. Read this document for the legal model, the vocabulary, and the acceptance criteria. Comments on the namespace, on the proposed CIR additions, and on whether the AI transparency profile should be split into a separate file are the most useful feedback at this stage.
