import "dotenv/config";
import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  owner: "chirpbirding",
  name: "Birda Hello World",
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
    bundleIdentifier: "com.chirpbirding.birda",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.chirpbirding.birda",
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

