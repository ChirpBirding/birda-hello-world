import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PurchasesOffering } from "react-native-purchases";

import { useRevenueCatOfferings } from "../hooks/useRevenueCatOfferings";

interface OfferingsListProps {
  subtitle: string;
  onSelectOffering: (offering: PurchasesOffering) => void;
  children?: React.ReactNode;
}

/**
 * Shared component that loads RevenueCat offerings and displays them as a
 * tappable list. Handles loading, error, and empty states automatically.
 *
 * Each paywall screen wraps this component and provides its own presentation
 * logic (modal, bottom sheet, overlay, etc.) via `onSelectOffering`.
 *
 * Pass optional `children` to render additional UI (e.g. a Modal or BottomSheet)
 * alongside the list.
 */
export const OfferingsList = ({
  subtitle,
  onSelectOffering,
  children,
}: OfferingsListProps) => {
  const { offerings, loading, isConfigured, error } =
    useRevenueCatOfferings();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F87FE" />
        <Text style={styles.secondaryText}>Loading offerings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Error</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!offerings || Object.keys(offerings).length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>No offerings available</Text>
        <Text style={styles.secondaryText}>
          Configure offerings in your RevenueCat dashboard
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isConfigured ? "RevenueCat Configured" : "Not Configured"}
          </Text>
          <Text style={styles.secondaryText}>{subtitle}</Text>
        </View>

        {Object.entries(offerings).map(([name, offering]) => (
          <TouchableOpacity
            key={name}
            style={styles.row}
            onPress={() => onSelectOffering(offering)}
          >
            <Text style={styles.offeringName}>{name}</Text>
            <Text style={styles.secondaryText}>
              ID: {offering.identifier}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
  center: {
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
  headerTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  secondaryText: { fontSize: 14, color: "#666" },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  offeringName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1F87FE",
  },
});

