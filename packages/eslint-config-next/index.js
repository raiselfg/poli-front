import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default function nextConfig(tsconfigRootDir) {
  return defineConfig([
    ...nextVitals,
    ...nextTs,
    {
      files: ['**/*.{ts,tsx,mts,cts}'],
      extends: [tseslint.configs.strictTypeChecked],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
          },
        ],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
      },
    },
    prettier,
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  ]);
}
