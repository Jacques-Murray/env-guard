import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EnvValidator } from '../src/validator';
import { EnvValidationError } from "../src/errors/ValidationError";

describe('EnvValidator', () => {
    let validator: EnvValidator;
    const mockEnv = {
        PORT: '8080',
        DEBUG: 'true',
        API_URL: 'https://api.example.com',
        INVALID_NUM: 'not-a-number',
    };

    beforeEach(() => {
        validator = new EnvValidator(mockEnv);
    });

    it('should validate and return correct types', () => {
        const schema = {
            PORT: { type: 'number' as const },
            DEBUG: { type: 'boolean' as const },
            API_URL: { type: 'string' as const },
        };

        const result = validator.validate(schema);

        expect(result.PORT).toBe(8080);
        expect(result.DEBUG).toBe(true);
        expect(result.API_URL).toBe('https://api.example.com');
    });

    it('should use default values for missing optional keys', () => {
        const schema = {
            MISSING_KEY: { type: 'string' as const, default: 'default_val' },
        };

        const result = validator.validate(schema);
        expect(result.MISSING_KEY).toBe('default_val');
    });

    it('should throw aggregated error for missing required keys', () => {
        const schema = {
            MISSING_1: { type: 'string' as const },
            MISSING_2: { type: 'number' as const }
        };

        try {
            validator.validate(schema);;
        } catch (e) {
            expect(e).toBeInstanceOf(EnvValidationError);
            if (e instanceof (EnvValidationError)) {
                expect(e.errors.length).toBe(2);
                expect(e.message).toContain('Missing required variable: MISSING_1');
            }
        }
    });

    it('should validate enums/choices', () => {
        const schema = {
            PORT: { type: 'number' as const, choices: [8080, 9090] }
        };
        // 8080 is in mockEnv
        expect(validator.validate(schema).PORT).toBe(8080);
    });

    it('should fail on invalid enums', () => {
        const validator = new EnvValidator({ NODE_ENV: 'test' });
        const schema = {
            NODE_ENV: { choices: ['dev', 'prod'] }
        };

        expect(() => validator.validate(schema)).toThrow(EnvValidationError);
    });
});