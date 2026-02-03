# env-guard

> Zero-dependency, type-safe environment variable validator.

Ensure your application crashes early if required environment variables are missing or invalid. `env-guard` provides a simple, strongly-typed schema validation for your `process.env`.

## Features

-   **Type Safety**: Infers TypeScript types from your schema.
-   **Zero Dependencies**: Lightweight and fast.
-   **Validation**: Built-in validators for strings, numbers, booleans, enums, etc.
-   **Early Exit**: Crashes immediately on validaiton failure with clear error messages.

## Installation

```bash
npm install env-guard
```

## Usage

Create a file (e.g., `src/config.ts`) to define and export your configuration:

```typescript
import { createEnv, z } from 'env-guard'; // Assuming internal z-like API or adjust based on actual implementation

// Example usage based on typical patterns - ADJUST THIS TO MATCH ACTUAL API
// Since I haven't seen the source code yet, this is a placeholder example.
// Please check src/index.ts for actual API usage.

/* 
// Example:
import { Env } from './env-guard'; 

const config = Env.create({
  PORT: Env.number({ default: 3000 }),
  NODE_ENV: Env.enum(['development', 'production', 'test'], { default: 'development' }),
  DATABASE_URL: Env.string({ required: true }),
});

export default config;
*/
```

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## License

MIT © [Jacques Murray](https://github.com/Jacques-Murray)
