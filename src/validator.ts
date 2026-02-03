import { EnvSchema, EnvVarDefinition, InferEnv } from './types';
import { EnvValidationError } from './errors/ValidationError';

/**
 * Core validation logic class.
 * Adheres to SRP by focusing solely on validating and parsing values.
 */
export class EnvValidator {
  private readonly processEnv: NodeJS.ProcessEnv;

  constructor(processEnv: NodeJS.ProcessEnv = process.env) {
    this.processEnv = processEnv;
  }

  /**
   * Validates the environment against the provided schema.
   * @param schema The schema definition.
   * @returns The parsed and typed configuration object.
   * @throws EnvValidationError if validation fails.
   */
  public validate<T extends EnvSchema>(schema: T): InferEnv<T> {
    const errors: string[] = [];
    const result: any = {};

    for (const [key, config] of Object.entries(schema)) {
      const rawValue = this.processEnv[key];
      const { value, error } = this.processKey(key, rawValue, config);

      if (error) {
        errors.push(error);
      } else {
        result[key] = value;
      }
    }

    if (errors.length > 0) {
      throw new EnvValidationError(errors);
    }

    return result as InferEnv<T>;
  }

  private processKey(
    key: string,
    value: string | undefined,
    config: EnvVarDefinition,
  ): { value?: any; error?: string } {
    // 1. Check requirement and defaults
    if (value === undefined || value.trim() === '') {
      if (config.default !== undefined) {
        return { value: config.default };
      }
      if (config.required !== false) {
        return { error: `Missing required variable: ${key}` };
      }
      return { value: undefined };
    }

    // 2. Parse and Type Check
    const parsed = this.parseValue(value, config.type);

    // Type mismatch (specifically for NaN)
    if (config.type === 'number' && Number.isNaN(parsed)) {
      return { error: `Variable ${key} must be a number. Received: "${value}"` };
    }

    // 3. Enum/Choices Check
    if (config.choices && !config.choices.includes(parsed)) {
      return {
        error: `Variable ${key} must be one of [${config.choices.join(', ')}]. Received: "${parsed}"`,
      };
    }

    // 4. Custom Validation
    if (config.validate) {
      const validationResult = config.validate(parsed);
      if (validationResult === false) {
        return { error: `Variable ${key} failed custom validation` };
      }
      if (typeof validationResult === 'string') {
        return { error: `Variable ${key}: ${validationResult}` };
      }
    }

    return { value: parsed };
  }

  private parseValue(value: string, type?: string): any {
    switch (type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return value.toLowerCase() === 'true' || value === '1';
      case 'string':
      default:
        return value;
    }
  }
}
