'use strict';


class ServerError extends Error {
  constructor(status = 400, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, ServerError);

    // Custom debugging information
    this.status = status;
  }
}


module.exports = ServerError;
