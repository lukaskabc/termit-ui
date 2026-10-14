describe("CustomAttributesProfile", () => {
  describe("constructor", () => {
    /**
     * Given valid data (IRI, title, description, non-empty customAttributes),
     * verify that iri, title, description and customAttributes are copied to the instance unchanged.
     */
    it.todo("copies all fields from the supplied data");

    /**
     * Given valid data without description,
     * verify that construction succeeds and description is undefined.
     */
    it.todo("accepts data without description");

    /**
     * Given data whose iri is not a valid URI (e.g. "not-an-iri", empty string, undefined),
     * verify that the constructor throws an Error whose message starts with "Invalid profile: "
     * and contains the invalid IRI value.
     */
    it.todo("throws when IRI is not a valid URI");

    /**
     * Given data with undefined title and data with an empty title object ({}),
     * verify that the constructor throws an Error with the "Missing title" message.
     */
    it.todo("throws when title is missing or empty");

    /**
     * Given data with customAttributes being an empty array,
     * verify that the constructor throws an Error with the "No custom attributes specified" message.
     */
    it.todo("throws when customAttributes is empty");

    /**
     * Given data with customAttributes being undefined or a non-array value (e.g. a single object,
     * which can happen when JSON-LD compaction yields a single value),
     * verify that the constructor throws an Error with the "No custom attributes specified" message.
     */
    it.todo("throws when customAttributes is not an array");
  });

  describe("toJsonLd", () => {
    /**
     * Verify that toJsonLd returns an object with "@context" equal to PROFILE_CONTEXT
     * and the profile data (iri, title, description, customAttributes) in "@graph".
     */
    it.todo("returns profile data with PROFILE_CONTEXT");

    /**
     * Round-trip: serialize a profile via toJsonLd, run the result through
     * JsonLdUtils.compactAndResolveReferences with PROFILE_CONTEXT and construct a new profile.
     * Verify that iri, title, description and the custom attributes (iri, label, domainIri, rangeIri)
     * are equal to the original. Compare domain/range via domainIri/rangeIri, because compaction may return
     * them as { iri } objects instead of plain strings.
     */
    it.todo("output can be compacted back into an equal profile");
  });

  describe("PROFILE_CONTEXT", () => {
    /**
     * Compact a JSON-LD document containing a profile with a single custom attribute
     * (using expanded IRIs, termit:has-custom-attribute) using PROFILE_CONTEXT.
     * Verify that customAttributes is compacted into an array (because of "@container": "@set")
     * and that the attribute properties are mapped using the custom attribute CONTEXT.
     */
    it.todo(
      "compacts has-custom-attribute into customAttributes array even for a single attribute"
    );
  });
});
