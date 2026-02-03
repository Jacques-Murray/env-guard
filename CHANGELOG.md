# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2026-02-03

### Added
- **Core Validation**: Introduced `validateEnv` to strictly validate `process.env` against a defined schema.
- **Type Safety**: Full TypeScript support with `InferEnv` to automatically derive configuration types from the schema.
- **Built-in Types**: Support for `string`, `number`, and `boolean` with automatic parsing (e.g., converting "true" to `true`).
- **Enums**: Support for allowed values via the `choices` property.
- **Default Values**: Ability to define default values for optional environment variables.
- **Custom Validation**: Support for custom validator functions for complex logic.
- **Zero Dependencies**: Lightweight implementation with no external runtime dependencies.

### Changed
- **Config**: Added `repository` field to `package.json` to support NPM Trusted Publishing.
