# ANCR DPV vocabulary

Draft 0.7, built from Example 1 (Convention 108+ legal model), Example 2 (ANCR Extension fields and controlled values) and Notice Transparency Controls v0.2.1 (code of practice controls). Draft 0.6 is kept in `releases/0.6/`.

## Purpose

To let a record that conforms to the ANCR Extension for ISO/IEC TS 27560:2023, Release 1, be exchanged and read as Data Privacy Vocabulary (DPV), to show which legal requirement each part of the record evidences, and to let a controller declare a transparency by default code of practice in the record.

## Rule

Each field and controlled value of the ANCR Extension has one identifier, in `ancr:`. That identifier is an address for the Extension definition, not a new definition. Where the Extension and this vocabulary differ, the Extension governs and the vocabulary is corrected. Any other name for the same field is kept only as a deprecated equivalent, so that existing references still resolve.

## Modules

| Module | Namespace | Scope | Source term list | Built file |
| --- | --- | --- | --- | --- |
| 1 Record | `ancr:` `https://kantarainitiative.github.io/ancr-wg/ns/ancr#` | 74 fields, 37 controlled values, exposure classes, and the `ancr:evidences` relation | `terms-ancr.ts` | `dist/ancr.ttl`, `dist/ancr-context.jsonld` |
| 2 Legal model | `conv108:` `https://kantarainitiative.github.io/ancr-wg/ns/conv108plus#` | 200 legal element identifiers for Convention 108+ and 25 legal model terms, each placed at one layer of the Operational Transparency Stack | `terms-conv108.ts`, `conv108-legal-elements.csv` | `dist/conv108.ttl` |
| 4 Mappings | none of its own | Retired names, and which legal elements each field carries evidence for | `mappings.ts` | `dist/mappings.ttl` |

`dist/register.csv` lists every term with its module, status, Stack layer and source.

NTC (Notice Transparency Controls) is linked, not included. It is the companion vocabulary of PWI 26689, developed in ad hoc group WG 5-57-001, and is maintained outside this vocabulary, with its own provisional base, `urn:x-ntc:v1:`. The code of practice controls that were module 3 in the first 0.7 build are now part of NTC. `ntc-link.ts` lists the NTC terms this vocabulary reads. NTC terms that duplicate an Extension field or value are deprecated equivalents of the `ancr:` term.

The JSON-LD context reads ANCR Extension records. It also reads the ITCoP code of practice declaration where it is carried in `code_of_conduct`, using the NTC terms by their NTC identifiers. The NTC v0.2.1 contexts for records in the NWIP outline v4 form are kept unchanged with NTC.

## Age assurance pilot

`fixtures/age-assurance/` holds a Controller Identification Record with an ITCoP declaration, a notice receipt and an Authorization State Object for one age check. The test expands each of them and checks for the expected terms. It also lists the fields in them that have no link to the law yet.

## Changes from 0.6

| Change | 0.6 | 0.7 |
| --- | --- | --- |
| NTC | Separate draft; four terms recorded in mappings as replaced | Linked, not included: maintained with NTC, built from NTC v0.2.1 on the NTC base |
| Terms that duplicate an Extension field or value | `ntc:NoticeIssued`, `NoticeMaterialChange`, `CIRUpdated`, `UnresolvedLegalBasis` | The same four, plus `ntc:hasCodeOfConduct`, kept in the NTC controls as deprecated equivalents of the `ancr:` term |
| Rights access point | NTC related its Rights Access Point to `conv108:hasRightsAccessReference` | Related to `ancr:privacy_access_point` |
| Code of practice declaration | Only in the NTC v0.2.1 context for the NWIP form | Also readable in an Extension record, inside `code_of_conduct` |
| Pilot | None | Age assurance fixtures and checks |

## Open

1. `conv108:hasParticipantScope` has no definition in either example. The test reports it until one is supplied.
2. `ancr:evidences` is a new proposed property. The alternative is to keep the field to law relation in prose only.
3. The field to law relations cover the Controller Identification Record, lawful basis and purpose. The test lists the pilot fields that are not related yet.
4. `issuing_authority`, `registry_identifier` and `assurance_level` are profile B5 fields on the Extension main branch, not in Release 1.
5. NTC control properties that may duplicate an Extension field: `ntc:hasNoticeEventLog` (`notice_event_log_url`), `ntc:hasEventType` (`event_type`), `ntc:eventTime` (`event_time`), `ntc:retentionPeriod` (`retention_period`), `ntc:hasAuthorityStatement` (`authority`), `ntc:hasReceipt` (`receipt_id`). Each needs a decision: deprecate in favour of the `ancr:` field, or keep because the NWIP outline v4 field differs in meaning.
6. Gaps 1, 2 and 4 of the 0.6 review (transfer mechanism values, purpose vocabulary, links from the rest of the record to the law) are not yet addressed.

## Build and test

```sh
bun install
bun build.ts
bun test.ts
```

`bun build-ns.ts` then writes the namespace documents into `ancr-ts-27560-extension/docs/ns/`, which the site serves at `https://kantarainitiative.github.io/ancr-wg/ns/`. Each page carries the status of the vocabulary, and has an anchor for each term, so `.../ns/ancr#notice_hash` opens on its definition.
