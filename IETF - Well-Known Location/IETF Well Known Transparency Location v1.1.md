---
title: "Well-Known URI for Controller Transparency Records"
---

Internet-Draft: draft-lizar-transparency-wellknown-00 (not submitted)

Intended status: Standards Track

Date: 25 November 2026

Author: M. Lizar, ANCR WG Kantara Initiative

## Abstract

This document defines the well-known URI suffix "transparency". A controller uses it to publish a Controller Identification Record (CIR): a machine-readable record of who the controller is, where it is established, and how to reach it about privacy. The record can be retrieved without authentication, before any personal data is requested.

## Status of This Memo

This Internet-Draft is submitted in full conformance with the provisions of BCP 78 and BCP 79.

Internet-Drafts are working documents of the Internet Engineering Task Force (IETF). Note that other groups may also distribute working documents as Internet-Drafts. The list of current Internet-Drafts is at https://datatracker.ietf.org/drafts/current/.

Internet-Drafts are draft documents valid for a maximum of six months and may be updated, replaced, or obsoleted by other documents at any time. It is inappropriate to use Internet-Drafts as reference material or to cite them other than as "work in progress."

## Copyright Notice

Copyright (c) 2026 IETF Trust and the persons identified as the document authors. All rights reserved.

This document is subject to BCP 78 and the IETF Trust's Legal Provisions Relating to IETF Documents (https://trustee.ietf.org/license-info) in effect on the date of publication of this document. Please review these documents carefully, as they describe your rights and restrictions with respect to this document.

## 1. Introduction

Data protection law commonly requires a controller to say who it is and how it can be contacted. This information is usually published as prose, at a location each site chooses. Software acting for an individual cannot find it reliably, and cannot tell whether it has changed.

This document defines one location, "/.well-known/transparency", and the record found there. It uses the framework of [RFC8615]. The record is the Controller Identification Record specified in the Kantara Initiative ANCR Extension [ANCR], which extends [ISO27560].

### 1.1 Uses

- A person, or software acting for that person, identifies the controller before providing personal data.
- A notice receipt refers to the CIR of the controller that gave the notice.
- A person finds the privacy notices the controller publishes, and the version of each in effect.
- A person finds where to exercise privacy rights.
- A regulator or researcher retrieves the same record for many controllers.

### 1.2 Out of Scope

This document does not define the content of notices, receipts, the notice event log, assurance levels, certification or trust marks. It does not signal or record an individual's choices. Publishing a CIR does not establish that a controller complies with any law.

## 2. Conventions and Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [RFC2119] [RFC8174] when, and only when, they appear in all capitals, as shown here.

Controller: the party that decides the purposes and means of processing personal data.

Controller Identification Record (CIR): a publicly accessible record of controller accountability, used as the anchor for notices and receipts.

Privacy access point: a channel through which an individual can reach the controller about privacy, including to exercise rights.

Notice event log: an append-only record of lifecycle events relating to notices and receipts.

Client: software that retrieves a CIR.

## 3. The "transparency" Well-Known URI

### 3.1 Location

A controller publishes its CIR at:

```
https://<authority>/.well-known/transparency
```

The URI MUST use the "https" scheme. This document does not define the use of this suffix with any other scheme.

This document defines no additional path components or query strings. A controller MAY publish related resources below this path, such as "/.well-known/transparency/cir.json". Clients MUST NOT infer the presence or meaning of such resources from their paths, and SHOULD use the links in the CIR.

### 3.2 Scope

A CIR applies to the origin from which it is retrieved, and to no other origin. A client MUST NOT apply it to a subdomain, a parent domain or another port on the strength of the name alone.

Where several controllers are responsible for one origin, the CIR identifies the controller accountable for that origin. Records for joint controllers are for future specification.

### 3.3 Retrieval

A client retrieves the CIR with an HTTP GET request [RFC9110]:

```
GET /.well-known/transparency HTTP/1.1
Host: www.example.com
Accept: application/json
```

A server that has a CIR responds:

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: public, max-age=86400
X-Content-Type-Options: nosniff
Access-Control-Allow-Origin: *
```

- The server MUST NOT require authentication, cookies or any identification of the individual.
- The representation MUST be a JSON object [RFC8259]. A successful response MUST use the media type "application/json" or "application/ld+json". A client MUST NOT process a response of any other media type as a CIR.
- A server MAY redirect to another URI on the same origin. A client MUST NOT follow a redirect to a different origin when retrieving a CIR.
- A server SHOULD send a validator (ETag or Last-Modified) and caching directives [RFC9111].
- A server SHOULD allow cross-origin reads, so that software running in a browser can retrieve the record.

### 3.4 Absence and Errors

A 404 or 410 response means that no CIR is published at that origin. It says nothing else about the controller. A client MUST NOT treat any other error, or a response that is not a valid CIR, as a published CIR. A client that retries SHOULD honour Retry-After.

## 4. The Controller Identification Record

### 4.1 Required Members

| Member | Type | Meaning |
|:---|:---|:---|
| controller_identification_record_id | string | Stable identifier of the CIR |
| controller_public_id_uri | string (URI) | Public, resolvable identifier of the controller |
| controller_name | string | Legal name of the controller |
| jurisdiction | string | Jurisdiction of the controller. A country is given as an ISO 3166-1 alpha-2 code |
| privacy_access_point | array of objects | One or more access points. Each has the string members type, value and label |

At least one privacy access point MUST be usable without an account or a digital identity credential.

### 4.2 Optional Members

| Member | Type | Meaning |
|:---|:---|:---|
| controller_address | string or object | Address of the controller |
| notice_event_log_url | string (URI) | Location of the notice event log. RECOMMENDED |
| notices | array of objects | Privacy notices of the controller, as in Section 4.3. RECOMMENDED |
| code_of_conduct | string (URI) | Code of conduct or practice the controller declares |
| derogation_reference | object | Reference to a lawful ground for withholding information |

### 4.3 Notices

Each object in "notices" describes one privacy notice and has these members:

| Member | Type | Meaning |
|:---|:---|:---|
| notice_id | string | Stable identifier of the notice. REQUIRED. It does not change when the notice is revised |
| notice_version_reference | string | Immutable reference to the version of the notice in effect. REQUIRED |

The value of notice_version_reference is a URI that resolves to the Notice Version Object specified in [ANCR], which gives the location, hash and publication time of that version. The controller MUST update the CIR when a new version takes effect. Use of a hash reference in place of a URI is for future specification.

A client MUST NOT treat an entry in "notices" as evidence that the notice was presented to, read by or accepted by any individual.

The "privacy-policy" link relation [RFC6903] links a page to a human-readable privacy policy. A controller MAY use it together with a CIR. It does not identify the controller or a version of the policy.

### 4.4 Processing

A client MUST ignore members it does not recognise. A client MUST treat a record that lacks a required member, or in which a required member has the wrong type, as invalid. A client MUST ignore an entry in "notices" that lacks a required member.

Earlier records use the member name "controller_identity_record_id". A client SHOULD accept it where "controller_identification_record_id" is absent. A server MUST NOT use it as the only identifier.

### 4.5 Example

```json
{
  "controller_identification_record_id": "https://www.example.com/.well-known/transparency",
  "controller_public_id_uri": "https://www.example.com",
  "controller_name": "Example Services Inc.",
  "jurisdiction": "CA",
  "privacy_access_point": [
    { "type": "web", "value": "https://www.example.com/privacy", "label": "Privacy requests" },
    { "type": "email", "value": "privacy@example.com", "label": "Privacy office" }
  ],
  "notices": [
    {
      "notice_id": "https://www.example.com/privacy/notice",
      "notice_version_reference": "https://www.example.com/privacy/notice/versions/2026-11-01"
    }
  ],
  "notice_event_log_url": "https://www.example.com/privacy/notice-events"
}
```

## 5. Security Considerations

The considerations of [RFC8615], Section 4, apply.

### 5.1 Meaning of a Retrieved Record

Retrieval over HTTPS shows that the record came from the origin. It does not show that the named controller exists, or that its claims are true. Domain validation does not confirm a legal name. A client SHOULD present the record as a statement by the origin, unless it has verified the record through an independent source.

### 5.2 Write Access

A party able to write to the well-known path can replace the CIR and direct privacy requests to itself. Operators SHOULD restrict and monitor write access. This is of particular concern on hosts shared by several parties.

### 5.3 Integrity and History

HTTPS protects the record in transit. It does not protect against alteration at the origin, or show what the record said earlier. A notice event log held only at the same origin does not provide independent evidence. Signed records are for future specification.

### 5.4 Untrusted Content

Values in a CIR are untrusted input. Clients MUST escape them before display, SHOULD limit the size of a response they process, and SHOULD restrict the URI schemes they follow. A client running on a server SHOULD NOT let URIs in a CIR reach internal network resources.

### 5.5 Load

The resource is static and cacheable. Clients SHOULD use cached responses and conditional requests, and SHOULD NOT probe origins without reason. Operators SHOULD apply any rate limits in a way that does not require clients to identify themselves.

## 6. Privacy Considerations

A request for a CIR discloses to the server the client's network address and the time of the request, and may carry other request headers. [RFC6973] gives general guidance. A client SHOULD send the request without cookies, credentials or a Referer header.

A server MUST NOT use retrieval of the CIR to identify an individual, and MUST NOT treat retrieval as consent or acceptance. Operators SHOULD keep request logs to the minimum needed to run the service.

The record is public and may be copied indefinitely. A controller SHOULD publish a role and a role mailbox rather than the name or personal address of an individual. Where the controller is a natural person, the required members can themselves be personal data, and the controller needs to weigh publication against its legal obligations.

## 7. IANA Considerations

IANA is asked to register the following in the "Well-Known URIs" registry [RFC8615]:

- URI suffix: transparency
- Change controller: IETF
- Specification document(s): this document
- Status: permanent
- Related information: none

## 8. References

### 8.1 Normative References

[RFC2119] Bradner, S., "Key words for use in RFCs to Indicate Requirement Levels", BCP 14, RFC 2119, March 1997.

[RFC8174] Leiba, B., "Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words", BCP 14, RFC 8174, May 2017.

[RFC8259] Bray, T., Ed., "The JavaScript Object Notation (JSON) Data Interchange Format", STD 90, RFC 8259, December 2017.

[RFC8615] Nottingham, M., "Well-Known Uniform Resource Identifiers (URIs)", RFC 8615, May 2019.

[RFC9110] Fielding, R., Ed., Nottingham, M., Ed., and J. Reschke, Ed., "HTTP Semantics", STD 97, RFC 9110, June 2022.

[RFC9111] Fielding, R., Ed., Nottingham, M., Ed., and J. Reschke, Ed., "HTTP Caching", STD 98, RFC 9111, June 2022.

### 8.2 Informative References

[ANCR] Kantara Initiative ANCR Working Group, "ANCR Extension for ISO/IEC TS 27560:2023", Release 1, v1.0 Release Candidate, 23 September 2026, https://github.com/KantaraInitiative/ancr-wg/tree/main/ancr-ts-27560-extension.

[ISO27560] ISO/IEC TS 27560:2023, "Privacy technologies: Consent record information structure".

[RFC6903] Snell, J., "Additional Link Relation Types", RFC 6903, March 2013.

[RFC6973] Cooper, A., Tschofenig, H., Aboba, B., Peterson, J., Morris, J., Hansen, M., and R. Smith, "Privacy Considerations for Internet Protocols", RFC 6973, July 2013.

## Acknowledgments

The Controller Identification Record is work of the Kantara Initiative ANCR Working Group. Contributors include Sal D'Agostino.

## Author's Address

Mark Lizar

Global Privacy Rights

Email: info@globalprivacyrights.org

URI: https://globalprivacyrights.org
