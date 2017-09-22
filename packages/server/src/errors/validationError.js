export default class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}
