/**
 * Custom error class for aggregation of validation failures.
 */
export class EnvValidationError extends Error {
  public readonly errors: string[];

  constructor(errors: string[]) {
    super(`Environment validation failed:\n - ${errors.join('\n - ')}`);
    this.name = 'EnvValidationError';
    this.errors = errors;
    Object.setPrototypeOf(this, EnvValidationError.prototype);
  }
}
