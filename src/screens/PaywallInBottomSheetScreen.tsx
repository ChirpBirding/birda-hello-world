import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
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

import { useRevenueCatOfferings } from "../hooks/useRevenueCatOfferings";

export const PaywallInBottomSheetScreen = () => {
  const { offerings, loading, isConfigured, error } = useRevenueCatOfferings();
  const [selectedOffering, setSelectedOffering] = useState<PurchasesOffering | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const handleOfferingPress = (offering: PurchasesOffering) => {
    setSelectedOffering(offering);
    bottomSheetRef.current?.expand();
  };

  const handleDismiss = useCallback(() => {
    bottomSheetRef.current?.close();
    setSelectedOffering(null);
  }, []);

  const handlePurchaseCompleted = useCallback(() => {
    Alert.alert("Success", "Purchase completed!", [
      { text: "OK", onPress: handleDismiss },
    ]);
  }, [handleDismiss]);

  const handlePurchaseError = useCallback(({ error }: { error: any }) => {
    Alert.alert("Error", error?.message ?? "Purchase failed");
  }, []);

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
            Tap to show paywall in bottom sheet
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => setSelectedOffering(null)}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {selectedOffering && (
            <RevenueCatUI.Paywall
              onPurchaseCompleted={handlePurchaseCompleted}
              onPurchaseError={handlePurchaseError}
              onDismiss={handleDismiss}
              options={{ offering: selectedOffering }}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
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
  bottomSheetContent: { flex: 1 },
});

