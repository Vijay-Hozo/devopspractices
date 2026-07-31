export class HttpError extends Error {
  /**
   * @param {number} status
   * @param {string} message
   * @param {object} [details]
   */
  constructor(status, message, details) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}
