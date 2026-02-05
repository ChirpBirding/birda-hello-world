import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
  PurchasesOfferings,
  STOREKIT_VERSION,
} from "react-native-purchases";

import { getExpoConfigExtra } from "../utils/expoConfig";

interface UseRevenueCatOfferingsResult {
  offerings: Record<string, PurchasesOffering> | null;
  loading: boolean;
  isConfigured: boolean;
  error: string | null;
}

let isRevenueCatInitialized = false;

export const useRevenueCatOfferings = (): UseRevenueCatOfferingsResult => {
  const [offerings, setOfferings] = useState<Record<
    string,
    PurchasesOffering
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeRevenueCat = async () => {
      try {
        if (!isRevenueCatInitialized) {
          await Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

          const extra = getExpoConfigExtra();
          const { ANDROID_API_KEY, IOS_API_KEY } = extra.revenueCat ?? {};

          if (!IOS_API_KEY || !ANDROID_API_KEY) {
            throw new Error(
              "RevenueCat API keys not configured. Please set EXPO_PUBLIC_REVENUECAT_IOS_API_KEY and EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY in your .env file"
            );
          }

          Purchases.configure({
            apiKey:
              Platform.select({
                ios: IOS_API_KEY,
                android: ANDROID_API_KEY,
              }) ?? "",
            storeKitVersion: STOREKIT_VERSION.STOREKIT_1,
          });

          isRevenueCatInitialized = true;
        }

        setIsConfigured(true);

        const offeringsResult: PurchasesOfferings =
          await Purchases.getOfferings();
        setOfferings(offeringsResult.all);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize RevenueCat"
        );
        setLoading(false);
      }
    };

    initializeRevenueCat();
  }, []);

  return { offerings, loading, isConfigured, error };
};

