// Type declarations for eslint-config-next modules
// These modules export ESLint flat config arrays using CommonJS format

declare module "eslint-config-next/core-web-vitals" {
  import type { Linter } from "eslint";
  const config: Linter.Config[];
  export default config;
}

declare module "eslint-config-next/typescript" {
  import type { Linter } from "eslint";
  const config: Linter.Config[];
  export default config;
}

// Type declarations for eslint/config helper functions
declare module "eslint/config" {
  import type { Linter } from "eslint";

  /**
   * Helper function to define ESLint flat config
   * @param config - Array of ESLint configuration objects
   * @returns The same configuration array
   */
  export function defineConfig(config: Linter.Config[]): Linter.Config[];

  /**
   * Helper function to create global ignore patterns
   * @param patterns - Array of glob patterns to ignore globally
   * @returns A configuration object with global ignores
   */
  export function globalIgnores(patterns: string[]): Linter.Config;
}
