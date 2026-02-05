import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PurchasesOffering } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

import { RootStackParamList } from "../../App";
import { useRevenueCatOfferings } from "../hooks/useRevenueCatOfferings";

type NavigationProp = StackNavigationProp<RootStackParamList, "PaywallInStack">;

export const PaywallInStackScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { offerings, loading, isConfigured, error } = useRevenueCatOfferings();

  const handleOfferingPress = (offering: PurchasesOffering) => {
    navigation.navigate("PaywallStackView", { offering });
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
      </View>
    );
  }

  if (!offerings || Object.keys(offerings).length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No offerings available</Text>
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
          Tap to navigate to paywall in stack
        </Text>
      </View>

      {Object.entries(offerings).map(([name, offering]) => (
        <TouchableOpacity
          key={name}
          style={styles.offeringItem}
          onPress={() => handleOfferingPress(offering)}
        >
          <Text style={styles.offeringName}>{name}</Text>
          <Text style={styles.offeringId}>ID: {offering.identifier}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Paywall view screen that shows in the navigation stack
type PaywallStackViewRouteProp = RouteProp<RootStackParamList, "PaywallStackView">;

export const PaywallStackViewScreen = () => {
  const route = useRoute<PaywallStackViewRouteProp>();
  const navigation = useNavigation();
  const { offering } = route.params;

  const handlePurchaseCompleted = () => {
    Alert.alert("Success", "Purchase completed!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const handleDismiss = () => {
    navigation.goBack();
  };

  const handlePurchaseError = ({ error }: { error: any }) => {
    Alert.alert("Error", error?.message ?? "Purchase failed");
  };

  return (
    <View style={styles.paywallContainer}>
      <RevenueCatUI.Paywall
        onPurchaseCompleted={handlePurchaseCompleted}
        onPurchaseError={handlePurchaseError}
        onDismiss={handleDismiss}
        options={{ offering, displayCloseButton: false }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  header: { padding: 20, backgroundColor: "#f5f5f5", borderBottomWidth: 1, borderBottomColor: "#e0e0e0" },
  headerText: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subHeaderText: { fontSize: 14, color: "#666" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#666" },
  errorText: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  errorMessage: { fontSize: 16, color: "#d32f2f", textAlign: "center" },
  emptyText: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  offeringItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#e0e0e0", backgroundColor: "#fff" },
  offeringName: { fontSize: 18, fontWeight: "600", marginBottom: 4, color: "#1F87FE" },
  offeringId: { fontSize: 14, color: "#666" },
  paywallContainer: { flex: 1, backgroundColor: "#fff" },
});

