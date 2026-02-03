import { EnvValidator } from './validator';
import { EnvSchema, InferEnv } from './types';

/**
 * Validates process.env against a provided schema.
 * * @example
 * const env = validateEnv({
 * PORT: { type: 'number', default: 3000 },
 * NODE_ENV: { choices: ['development', 'production'] }
 * });
 * * @param schema Definition of environment variables
 * @returns Typed environment object
 */
export function validateEnv<T extends EnvSchema>(schema: T): InferEnv<T> {
  const validator = new EnvValidator();
  return validator.validate(schema);
}

export { EnvValidator } from './validator';
export { EnvValidationError } from './errors/ValidationError';
export * from './types';
