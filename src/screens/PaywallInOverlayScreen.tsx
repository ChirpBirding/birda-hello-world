import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PurchasesOffering } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

import { useRevenueCatOfferings } from "../hooks/useRevenueCatOfferings";

export const PaywallInOverlayScreen = () => {
  const { offerings, loading, isConfigured, error } = useRevenueCatOfferings();
  const [selectedOffering, setSelectedOffering] = useState<PurchasesOffering | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleOfferingPress = (offering: PurchasesOffering) => {
    setSelectedOffering(offering);
    setOverlayVisible(true);
  };

  const handleDismiss = () => {
    setOverlayVisible(false);
    setSelectedOffering(null);
  };

  const handlePurchaseCompleted = () => {
    Alert.alert("Success", "Purchase completed!", [
      { text: "OK", onPress: handleDismiss },
    ]);
  };

  const handlePurchaseError = ({ error }: { error: any }) => {
    Alert.alert("Error", error?.message ?? "Purchase failed");
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {isConfigured ? "✅ RevenueCat Configured" : "⚠️ Not Configured"}
          </Text>
          <Text style={styles.subHeaderText}>
            Tap to show paywall in full screen overlay
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

      {overlayVisible && selectedOffering && (
        <View style={styles.overlay}>
          <Pressable style={styles.overlayBackground} onPress={handleDismiss} />
          <View style={styles.overlayContent}>
            <RevenueCatUI.Paywall
              onPurchaseCompleted={handlePurchaseCompleted}
              onPurchaseError={handlePurchaseError}
              onDismiss={handleDismiss}
              options={{ offering: selectedOffering }}
            />
          </View>
        </View>
      )}
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
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 1000 },
  overlayBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" },
  overlayContent: { flex: 1, marginTop: 50, backgroundColor: "#fff", borderTopLeftRadius: 16, borderTopRightRadius: 16 },
});

