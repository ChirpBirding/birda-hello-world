/**
 * Runtime helpers for accessing Expo config values.
 *
 * IMPORTANT: This file is intentionally separate from app.config.ts because:
 * - app.config.ts imports "dotenv/config" which uses Node.js 'fs' module
 * - This file is imported by React Native runtime code
 * - React Native doesn't have access to Node.js standard library modules
 *
 * Keep this file free of any Node.js-only dependencies.
 */

import Constants from "expo-constants";

export interface HelloWorldConfigExtra {
  eas: {
    projectId: string;
  };
  revenueCat: {
    ANDROID_API_KEY: string;
    IOS_API_KEY: string;
  };
}

/**
 * Get the typed extra config from expo-constants.
 * This provides type-safe access to app configuration values.
 *
 * @example
 * import { getExpoConfigExtra } from '../utils/expoConfig';
 * const { revenueCat } = getExpoConfigExtra();
 */
export const getExpoConfigExtra = (): Partial<HelloWorldConfigExtra> => {
  return (Constants.expoConfig?.extra ?? {}) as Partial<HelloWorldConfigExtra>;
};

