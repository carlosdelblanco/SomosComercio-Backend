import CustomError from "./CustomError";

describe("Given the class CustomError", () => {
  describe("When it is invoked with the message 'General error', a status code 401, and a public message 'Error, unauthorized'", () => {
    test("Then it should return an instance of Error with the received properties", () => {
      const expectedError = {
        message: "Error, unauthorized",
        statusCode: 401,
        publicMessage: "Error, unauthorized",
      };

      const expectedMessage = expectedError.message;
      const expectedCode = expectedError.statusCode;
      const expectedPublicMessage = expectedError.publicMessage;

      const newCustomError = new CustomError(
        expectedMessage,
        expectedCode,
        expectedPublicMessage
      );

      expect(newCustomError).toHaveProperty("message", expectedMessage);
      expect(newCustomError).toHaveProperty("statusCode", expectedCode);
      expect(newCustomError).toHaveProperty(
        "publicMessage",
        expectedPublicMessage
      );
    });
  });
});
