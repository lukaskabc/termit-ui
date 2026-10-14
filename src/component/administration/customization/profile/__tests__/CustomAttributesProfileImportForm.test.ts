/**
 * Tests of the result handling logic of CustomAttributesProfileImportForm.
 * Note: getMessageFromError and handleProfileResult (resp. handleFileResult / handleDownloadResult)
 * are currently module-private and have to be exported (or extracted to a util module) to be testable.
 */
describe("CustomAttributesProfileImportForm", () => {
  describe("getMessageFromError", () => {
    /**
     * Verify that undefined is returned for null error.
     */
    it.todo("returns undefined when error is null");

    /**
     * Error with messageId (and message/status as well).
     * Verify that the translated messageId is returned (messageId has priority).
     */
    it.todo("returns translated messageId when present");

    /**
     * Error without messageId but with message.
     * Verify that the message is returned as is.
     */
    it.todo("returns message when messageId is missing");

    /**
     * Error with only status.
     * Verify that "status <status>" is returned.
     */
    it.todo("returns status description when only status is present");

    /**
     * Error with neither messageId, message nor status.
     * Verify that an empty string is returned.
     */
    it.todo("returns empty string when error contains no details");
  });

  describe("handleProfileResult", () => {
    /**
     * Success action with profile payload.
     * Verify that the profile consumer receives the profile and the validation consumer
     * receives ValidationResult.VALID.
     */
    it.todo("passes profile and valid validation result on success");

    /**
     * Failure action with an error yielding a non-empty reason.
     * Verify that the validation consumer receives a BLOCKER result with message
     * "<translated messageKey>: <reason>" and the profile consumer receives null.
     */
    it.todo("passes blocker with reason and resets profile on failure");

    /**
     * Failure action with an error without any details (reason is empty string).
     * Verify that the validation consumer receives a BLOCKER result with only the translated messageKey
     * and the profile consumer receives null.
     */
    it.todo("passes blocker without reason when error has no details");

    /**
     * Failure action whose error is null.
     * Verify that neither the profile consumer nor the validation consumer is called
     * (the previous profile and validation state are kept).
     */
    it.todo("does not call any consumer when failure carries no error");

    /**
     * handleFileResult uses the "...profile.import.invalidProfile" message key,
     * handleDownloadResult uses the "...profile.import.downloadFailed" message key.
     */
    it.todo("file and download handlers use their respective message keys");
  });
});
