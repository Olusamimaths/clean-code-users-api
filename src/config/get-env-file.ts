/**
 * Retrieves the name of the environment file based on the current NODE_ENV value.
 * If NODE_ENV is not set or set to "production", it returns ".env".
 * Otherwise, it returns the value of NODE_ENV with ".env" appended.
 * @returns The name of the environment file.
 */
export function getEnvFileName(): string {
  const ENV = process.env.NODE_ENV;
  if (isProductionOrNotSet(ENV)) {
    return '.env';
  }
  return `${ENV}.env`.trim();
}

function isProductionOrNotSet(ENV: string): boolean {
  return !ENV || ['prod', 'production'].includes(ENV);
}
