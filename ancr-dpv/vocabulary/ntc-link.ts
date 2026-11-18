// NTC terms the ANCR vocabulary links to: the ITCoP code of practice declaration, carried in ancr:code_of_conduct.
// NTC (Notice Transparency Controls) is the companion vocabulary of PWI 26689, developed in ad hoc group WG 5-57-001.
// It is not part of this vocabulary. NS is its provisional base; change it here when NTC is assigned a namespace.
export const NS = "urn:x-ntc:v1:"

// Keys of the ITCoP code of practice declaration, carried in ancr:code_of_conduct.
// From the ITCoP Code of Conduct Profile, section 4, and the NTC v0.2.1 CIR context.
export const DECLARATION_CONTEXT: Record<string, any> = {
  type: "@type",
  code_id: { "@id": "ntc:declaresCode", "@type": "@id" },
  code_title: "dct:title",
  code_version: "ntc:codeVersion",
  profile_id: { "@id": "dct:conformsTo", "@type": "@id" },
  profile_version: "ntc:profileVersion",
  principles_claimed: { "@id": "ntc:conformsToPrinciple", "@type": "@vocab", "@container": "@set" },
  declaration_basis: { "@id": "ntc:hasDeclarationBasis", "@type": "@vocab" },
  declared_at: { "@id": "ntc:declaredAt", "@type": "xsd:dateTime" },
  verification_ref: { "@id": "dct:references", "@type": "@id" },
}
export const DECLARATION_VALUES: Record<string, string> = {
  code_of_practice_declaration: "ntc:CodeOfPracticeDeclaration",
  self_declared: "ntc:SelfDeclared",
  independently_verified: "ntc:IndependentlyVerified",
  ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`P${i + 1}`, `ntc:ITCoPPrinciple${i + 1}`])),
}
