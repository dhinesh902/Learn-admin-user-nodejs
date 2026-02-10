class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ApiSuccess {
  constructor(statusCode, data) {
    ((this.statusCode = statusCode),
      (this.status = "success"),
      (this.data = data || []));
  }
}

export { ApiSuccess, ApiError };
