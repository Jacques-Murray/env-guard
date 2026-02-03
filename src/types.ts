/**
 * Supported data types for environment variables.
 */
export type EnvVarType = 'string' | 'number' | 'boolean' | 'email' | 'url';

/**
 * Configuration definition for a single environment variable.
 */
export interface EnvVarDefinition<T = unknown> {
  /** The expected type of the variable. */
  type?: EnvVarType;
  /** Whether the variable is required. Defaults to true. */
  required?: boolean;
  /** A default value to use if the variable is missing. */
  default?: T;
  /** A custom validator function. Returns true if valid, or a string for a custom error. */
  validate?: (value: T) => boolean | string;
  /** An array of allowed values (enum). */
  choices?: T[];
}

/**
 * The schema object defining the environment structure.
 */
export type EnvSchema = Record<string, EnvVarDefinition>;

/**
 * Infers the TypeScript return type based on the schema.
 */
export type InferEnv<T extends EnvSchema> = {
  [K in keyof T]: T[K]['required'] extends false ? GetType<T[K]> | undefined : GetType<T[K]>;
};

type GetType<T extends EnvVarDefinition> = T['type'] extends 'number'
  ? number
  : T['type'] extends 'boolean'
  ? boolean
  : string;
