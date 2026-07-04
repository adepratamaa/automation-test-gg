type EnvKey = 'LANDING_URL' | 'LOGIN_URL' | 'EMAIL' | 'PASSWORD';

// get an environment variable and show a clear error if it is missing.
export function getEnv(key: EnvKey) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}
