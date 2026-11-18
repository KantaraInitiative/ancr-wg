// Module 2, conv108: the Convention 108+ legal model.
// Source term list for build.ts. Terms and meanings carried from Example 1 (26 October 2026), clauses 3, 4, 6 and 7.
// Legal element identifiers (conv108:Art8, conv108:Art9-1-b, ...) are read from conv108-legal-elements.csv.
export const NS = "https://kantarainitiative.github.io/ancr-wg/ns/conv108plus#"

export type Layer = "3 Presentation" | "5 Evidence" | "6 Treaty" | "Outside the Stack"
export type Conv108Term = {
  term: string
  kind: "class" | "property"
  parent?: string          // rdfs:subClassOf, a DPV term where one exists
  anchors: string[]        // legal element identifiers in conv108-legal-elements.csv
  source?: string          // anchor outside Convention 108+, for terms that have one
  layer: Layer
  definition: string
  related?: string[]       // skos:related, for a field or term that is close but not the same
}

export const TERMS: Conv108Term[] = [
  // Legal bases and processing condition, 3.1
  { term: "ConsentBasis", kind: "class", parent: "dpv:Consent", anchors: ["Art5-2"], layer: "6 Treaty",
    definition: "Consent used as the legal basis for a specified purpose" },
  { term: "OtherLegitimateBasisUnderLaw", kind: "class", parent: "dpv:LegalBasis", anchors: ["Art5-2"], layer: "6 Treaty",
    definition: "Another legitimate basis established by applicable law" },
  { term: "CompatibleFurtherProcessing", kind: "class", anchors: ["Art5-4-b"], layer: "6 Treaty",
    definition: "A recorded determination that further processing is compatible with the original purpose. A processing condition, not a legal basis" },
  // Principles, 4.1
  { term: "LawfulnessPrinciple", kind: "class", anchors: ["Art5-1", "Art5-2", "Art5-3"], layer: "6 Treaty",
    definition: "Lawful and proportionate processing that reflects a fair balance of interests, rights, and freedoms" },
  { term: "PurposeSpecificationPrinciple", kind: "class", anchors: ["Art5-4-b"], layer: "6 Treaty",
    definition: "Explicit, specified, and legitimate purposes; no incompatible further processing" },
  { term: "DataMinimisationPrinciple", kind: "class", anchors: ["Art5-4-c"], layer: "6 Treaty",
    definition: "Adequate, relevant, and not excessive" },
  { term: "TransparencyRequirement", kind: "class", anchors: ["Art8"], layer: "6 Treaty",
    definition: "Required information about the controller and intended processing" },
  { term: "TransborderProtectionRequirement", kind: "class", anchors: ["Art14"], layer: "6 Treaty",
    definition: "Appropriate protection for transborder data flows" },
  // Rights, 4.2
  { term: "RightOfAccess", kind: "class", parent: "dpv:DataSubjectRight", anchors: ["Art9-1-b"], layer: "6 Treaty",
    definition: "Confirmation of processing, communication of personal data in an intelligible form, and available information concerning origin, preservation period, and other required details" },
  { term: "RightAgainstSolelyAutomatedDecision", kind: "class", parent: "dpv:DataSubjectRight", anchors: ["Art9-1-a"], layer: "6 Treaty",
    definition: "Not to be subject to a decision significantly affecting the individual when based solely on automated processing, without the individual's views being taken into consideration" },
  { term: "RightToKnowAutomatedReasoning", kind: "class", parent: "dpv:DataSubjectRight", anchors: ["Art9-1-c"], layer: "6 Treaty",
    definition: "To obtain knowledge of the reasoning underlying relevant automated processing results" },
  { term: "RightToObject", kind: "class", parent: "dpv:DataSubjectRight", anchors: ["Art9-1-d"], layer: "6 Treaty",
    definition: "To object on grounds relating to the individual's situation, subject to the conditions in the Convention" },
  { term: "RightToRectificationOrErasure", kind: "class", parent: "dpv:DataSubjectRight", anchors: ["Art9-1-e"], layer: "6 Treaty",
    definition: "To obtain rectification or erasure where processing does not comply with the Convention" },
  // Transparency requirements, 4.3
  { term: "TransparencyInformation", kind: "class", anchors: ["Art8"], layer: "6 Treaty",
    definition: "Controller identity and establishment, legal basis, purposes, personal data categories, recipients, rights mechanisms, and any additional information needed for fair and transparent processing" },
  { term: "TransparencyBeforeCollection", kind: "class", anchors: ["Art8"], source: "Implementation requirement, transparency by default", layer: "3 Presentation",
    definition: "Required transparency information is resolvable before the first collection event" },
  { term: "TransborderTransparency", kind: "class", anchors: ["Art14"], source: "Implementation requirement", layer: "6 Treaty",
    definition: "Destination and applicable safeguard information are resolvable before transfer" },
  { term: "AutomatedProcessingTransparency", kind: "class", anchors: ["Art9-1-a", "Art9-1-c"], source: "Implementation requirement", layer: "6 Treaty",
    definition: "Relevant automated decision scope and reasoning information are available in time for the individual to exercise applicable rights" },
  { term: "DualHeldRecordRequirement", kind: "class", anchors: [], source: "ISO/IEC TS 27560:2023 and ANCR Extension alignment", layer: "5 Evidence",
    definition: "A record of what was presented is available to the individual as well as the controller, in the online construction" },
  // CIR property with no ANCR field, clause 5
  { term: "hasTransborderSafeguard", kind: "property", anchors: ["Art14"], layer: "6 Treaty", related: ["ancr:transfer_mechanism"],
    definition: "The safeguard relied on for a transborder flow to a stated destination" },
  // AI transparency profile, clause 7, anchored outside Convention 108+
  { term: "ChainOfNotice", kind: "class", anchors: [], source: "Chain of notice, item I16; ISO/IEC 22989 roles", layer: "Outside the Stack",
    definition: "Notice per participant through the AI lifecycle, each notice bound to the participant that issued it and to the notice version it issued, and tested by the next participant before that participant relies on it" },
  { term: "hasNoticeParticipant", kind: "property", anchors: [], source: "Item I16", layer: "Outside the Stack",
    definition: "A participant in a chain of notice" },
  { term: "hasLifecycleRole", kind: "property", anchors: [], source: "Item I16; ISO/IEC 22989", layer: "Outside the Stack",
    definition: "The ISO/IEC 22989 AI lifecycle role a notice participant acts in. The 22989 labels are alignment references, not adopted terms" },
  { term: "hasParticipantScope", kind: "property", anchors: [], source: "Item I16", layer: "Outside the Stack",
    definition: "Scope of disclosure of a chain participant's notice: the principal's physical context, specified online context, being the purposes, data and processing within the participant's lifecycle role, to which the notice applies and on which the next participant may rely" },
  { term: "hasTrainingDataProvenance", kind: "property", anchors: [], source: "Item I5; EU AI Act Article 53(1)(d)", layer: "Outside the Stack",
    definition: "Training data provenance and sources" },
  { term: "hasRightsReservationStatus", kind: "property", anchors: [], source: "Item I6; EU AI Act Article 53(1)(c); Directive 2019/790 Article 4(3)", layer: "Outside the Stack",
    definition: "Copyright and machine actionable rights reservation status" },
]
