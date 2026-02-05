import "dotenv/config";
import { ExpoConfig } from "expo/config";

const EAS_ENVIRONMENT = process.env.EAS_BUILD_PROFILE ?? "development";

interface EnvironmentConfig {
  APP_NAME: string;
  APP_BUNDLE_ID_IOS: string;
  APP_BUNDLE_ID_ANDROID: string;
}

const getEnvironmentConfig = (environment: string): EnvironmentConfig => {
  if (environment === "production") {
    return {
      APP_NAME: "Birda Hello World",
      APP_BUNDLE_ID_IOS: "com.chirpbirding.birda",
      APP_BUNDLE_ID_ANDROID: "com.chirpbirding.birda",
    };
  }
  // development, staging, preview, etc.
  return {
    APP_NAME: "Birda Hello World Dev",
    APP_BUNDLE_ID_IOS: "com.chirpbirding.birda-dev",
    APP_BUNDLE_ID_ANDROID: "com.chirpbirding.birda_dev",
  };
};

const { APP_NAME, APP_BUNDLE_ID_IOS, APP_BUNDLE_ID_ANDROID } =
  getEnvironmentConfig(EAS_ENVIRONMENT);

const config: ExpoConfig = {
  owner: "chirpbirding",
  name: APP_NAME,
  slug: "birda-hello-world",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: false,
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: APP_BUNDLE_ID_IOS,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: APP_BUNDLE_ID_ANDROID,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          minSdkVersion: 29,
          targetSdkVersion: 35,
        },
        ios: {
          deploymentTarget: "16.0",
        },
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "738d2fb6-2355-4e2c-9b21-516ad3a910af",
    },
    revenueCat: {
      ANDROID_API_KEY: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY,
      IOS_API_KEY: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY,
    },
  },
};

export default config;

