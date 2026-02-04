import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
  PurchasesOfferings,
} from "react-native-purchases";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

export const RevenueCatTestScreen = () => {
  const [offerings, setOfferings] = useState<Record<
    string,
    PurchasesOffering
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeRevenueCat();
  }, []);

  const initializeRevenueCat = async () => {
    try {
      // Set log level for debugging
      await Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

      // TODO: Replace with your actual RevenueCat API keys
      const IOS_API_KEY = "YOUR_IOS_API_KEY";
      const ANDROID_API_KEY = "YOUR_ANDROID_API_KEY";

      // Configure RevenueCat
      Purchases.configure({
        apiKey: IOS_API_KEY, // Use Platform.select for production
      });

      setIsConfigured(true);

      // Fetch offerings
      const offeringsResult: PurchasesOfferings =
        await Purchases.getOfferings();
      setOfferings(offeringsResult.all);
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to initialize RevenueCat",
      );
      setLoading(false);
    }
  };

  const presentPaywall = async (offering: PurchasesOffering): Promise<void> => {
    try {
      const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({
        offering,
      });

      switch (paywallResult) {
        case PAYWALL_RESULT.PURCHASED:
          Alert.alert("Success", "Purchase completed!");
          break;
        case PAYWALL_RESULT.RESTORED:
          Alert.alert("Success", "Purchases restored!");
          break;
        case PAYWALL_RESULT.CANCELLED:
          Alert.alert("Cancelled", "Paywall was cancelled");
          break;
        case PAYWALL_RESULT.NOT_PRESENTED:
          Alert.alert("Error", "Paywall could not be presented");
          break;
        case PAYWALL_RESULT.ERROR:
          Alert.alert("Error", "An error occurred");
          break;
      }
    } catch (err) {
      Alert.alert(
        "Error",
        err instanceof Error ? err.message : "Unknown error",
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1F87FE" />
        <Text style={styles.loadingText}>Loading offerings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ Error</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Text style={styles.instructionText}>
          Please configure your RevenueCat API keys in RevenueCatTestScreen.tsx
        </Text>
      </View>
    );
  }

  if (!offerings || Object.keys(offerings).length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No offerings available</Text>
        <Text style={styles.instructionText}>
          Configure offerings in your RevenueCat dashboard
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {isConfigured ? "✅ RevenueCat Configured" : "⚠️ Not Configured"}
        </Text>
        <Text style={styles.subHeaderText}>
          Tap an offering to present the paywall
        </Text>
      </View>

      {Object.entries(offerings).map(([name, offering]) => (
        <TouchableOpacity
          key={name}
          style={styles.offeringItem}
          onPress={() => presentPaywall(offering)}
        >
          <Text style={styles.offeringName}>{name}</Text>
          <Text style={styles.offeringId}>ID: {offering.identifier}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 14,
    color: "#666",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  offeringItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  offeringName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1F87FE",
  },
  offeringId: {
    fontSize: 14,
    color: "#666",
  },
});
