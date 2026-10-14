describe("AsyncCustomizationActions", () => {
  describe("exportCustomAttributesProfile", () => {
    /**
     * Verify that Ajax.post is called with URL
     * `${Constants.API_PREFIX}/data/profile/custom-attributes/export` and a query string
     * containing every supplied attribute IRI as a separate, URL-encoded `customAttributeUris` parameter.
     */
    it.todo("posts to export endpoint with custom attribute IRIs in query");

    /**
     * Verify that the request content is the supplied profile description extended with
     * "@context" equal to PROFILE_DESCRIPTION_CONTEXT, and that the original profile object is not mutated.
     */
    it.todo("sends profile description with PROFILE_DESCRIPTION_CONTEXT");

    /**
     * Response with Content-Disposition header `attachment; filename="profile.jsonld"`.
     * Verify that Utils.fileDownload is called with filename "profile.jsonld"
     * and Constants.JSON_LD_MIME_TYPE.
     */
    it.todo("uses filename from Content-Disposition header");

    /**
     * Response without Content-Disposition header, and response with a header not matching the
     * `filename="<name>.<ext>"` pattern (e.g. unquoted filename or filename without extension).
     * Verify that Utils.fileDownload is called with the default filename "custom-attributes-profile.jsonld".
     */
    it.todo(
      "falls back to default filename when Content-Disposition is missing"
    );

    /**
     * Response data is a string -> verify fileDownload receives it unchanged.
     * Response data is an object -> verify fileDownload receives JSON.stringify(data, null, 2).
     */
    it.todo("passes string data as-is and stringifies object data");

    /**
     * Verify that on success the dispatched actions are request and success
     * of type EXPORT_CUSTOM_ATTRIBUTES_PROFILE.
     */
    it.todo("dispatches request and success actions on success");

    /**
     * Ajax.post rejects with ErrorData.
     * Verify that a failure action containing the error is dispatched and fileDownload is not called.
     */
    it.todo("dispatches failure and does not download file on error");
  });

  describe("downloadProfileFromUri", () => {
    /**
     * Verify that Ajax.get is called with the supplied URI (not prefixed with API_PREFIX) and a config whose
     * Accept header is Constants.JSON_LD_MIME_TYPE, whose abort signal is the signal of the supplied
     * AbortController and which has credentials excluded (shouldExcludeCredentials() === true).
     */
    it.todo(
      "requests the URI as JSON-LD without credentials and with abort signal"
    );

    /**
     * Ajax.get resolves with a valid JSON-LD profile.
     * Verify that a success action of type DOWNLOAD_CUSTOM_ATTRIBUTES_PROFILE is dispatched
     * with a CustomAttributesProfile instance as payload with the expected iri, title and custom attributes.
     */
    it.todo("dispatches success with parsed CustomAttributesProfile payload");

    /**
     * Ajax.get resolves with JSON-LD that fails profile validation (e.g. no custom attributes).
     * Verify that a failure action is dispatched whose error is ErrorData with `message` equal
     * to the validation Error message.
     */
    it.todo("dispatches failure with message when profile validation fails");

    /**
     * Ajax.get rejects with ErrorData (e.g. { status: 404 }).
     * Verify that a failure action is dispatched with the ErrorData unchanged.
     */
    it.todo("dispatches failure with original ErrorData when request fails");
  });

  describe("loadProfileFromFile", () => {
    /**
     * File containing a valid JSON-LD profile.
     * Verify that a success action of type LOAD_CUSTOM_ATTRIBUTES_PROFILE is dispatched
     * with a CustomAttributesProfile payload matching the file content.
     */
    it.todo("dispatches success with profile parsed from file");
    // Note: if File.prototype.text is not available in the test environment, the file has to be mocked.

    /**
     * File containing invalid JSON.
     * Verify that a failure action is dispatched with error message in format "SyntaxError: <message>".
     */
    it.todo("dispatches failure with error name and message for invalid JSON");

    /**
     * File containing valid JSON-LD which is not a valid profile (e.g. invalid IRI or missing title).
     * Verify that a failure action is dispatched with message "Error: Invalid profile: ...".
     */
    it.todo("dispatches failure when file content is not a valid profile");
  });

  describe("importCustomAttributesProfile", () => {
    /**
     * Verify that Ajax.post is called with `${Constants.API_PREFIX}/data/profile/custom-attributes/import`
     * and content equal to profile.toJsonLd().
     */
    it.todo("posts profile JSON-LD to import endpoint");

    /**
     * Ajax.post resolves.
     * Verify that custom attributes are reloaded (getCustomAttributes is dispatched / Ajax.get called for
     * custom attributes), a SUCCESS message with messageId
     * "administration.customization.customAttributes.profile.import.success" is published
     * and a success action of type IMPORT_CUSTOM_ATTRIBUTES_PROFILE is dispatched.
     */
    it.todo(
      "reloads custom attributes, publishes success message and dispatches success"
    );

    /**
     * Verify that the success message is published only after the custom attributes reload has finished.
     */
    it.todo("publishes success message after custom attributes are reloaded");

    /**
     * Ajax.post resolves, but reloading custom attributes (Ajax.get) rejects.
     * getCustomAttributes handles the error itself, so verify the current behavior: a GET_CUSTOM_ATTRIBUTES
     * failure is dispatched, while the import is still reported as successful (success message and success action).
     */
    it.todo(
      "reports import success even when reloading custom attributes fails"
    );

    /**
     * Ajax.post rejects with ErrorData.
     * Verify that an ERROR message built from the ErrorData is published, a failure action with the error
     * is dispatched, and no success message is published.
     */
    it.todo("publishes error message and dispatches failure on error");
  });
});
