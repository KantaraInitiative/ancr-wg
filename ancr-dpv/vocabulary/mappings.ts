// Module 4: mappings to retired names, and the legal elements each field carries evidence for. NTC is linked, not included: its terms are in ntc-v1/controls.
// Rule: an Extension field or value has one identifier, in ancr:. Any other name for it is kept only as a deprecated equivalent.

// conv108: properties from Example 1 that name an Extension field. Retired in favour of the ancr: field.
export const CONV108_RETIRED: [string, string, string][] = [
  // [conv108 term, ancr field, Extension clause]
  ["hasRightsAccessReference", "privacy_access_point", "7.1.2"],
  ["hasDerogationReference", "derogation_reference", "7.1.4"],
  ["hasIssuingAuthority", "issuing_authority", "B.5.1"],
  ["hasRegistryIdentifier", "registry_identifier", "B.5.1"],
  ["hasAssuranceStatus", "assurance_level", "B.5.1"],
  ["hasAuthorizationState", "purpose_state", "7.2.5"],
  ["hasActiveState", "record_validity", "7.2.5"],
]

// ancrf: (Example 1, core field mapping) is withdrawn. Every ancrf: term is the ancr: field of the same name.
export const ANCRF_NS = "https://kantarainitiative.github.io/ancr-wg/ns/ancr-fields#"
export const ANCRF_TERMS = [
  "code_of_conduct", "controller_identification_record_id", "controller_name", "controller_public_id_uri",
  "derogation_reference", "jurisdiction", "notice_event_log_url", "notice_hash", "notice_id", "notice_url",
  "notice_version_id", "notice_version_reference", "privacy_access_point", "published_at", "purpose_state",
  "receipt_id", "record_validity",
]

// Which legal elements a field carries evidence for. From Example 1, clause 5 (Controller Identification Record) and 7.2.
export const EVIDENCES: [string, string[]][] = [
  ["controller_identification_record_id", ["Art8"]],
  ["controller_public_id_uri", ["Art8"]],
  ["controller_name", ["Art8"]],
  ["jurisdiction", ["Art8", "Art14"]],
  ["privacy_access_point", ["Art9"]],
  ["notice_event_log_url", ["Art8"]],
  ["code_of_conduct", ["Art8"]],
  ["lawful_basis", ["Art5-2"]],
  ["purpose", ["Art5-4-b"]],
]
