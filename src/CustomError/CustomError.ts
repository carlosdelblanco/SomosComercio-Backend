class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public responseMessage: string
  ) {
    super(message);
  }
}

export default CustomError;
