import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { PurchasesOffering } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

import { OfferingsList } from "../components/OfferingsList";

/** Shows the Paywall component in a custom full-screen overlay with a dimmed backdrop. */
export const PaywallInOverlayScreen = () => {
  const [selectedOffering, setSelectedOffering] =
    useState<PurchasesOffering | null>(null);

  const dismiss = () => setSelectedOffering(null);

  return (
    <OfferingsList
      subtitle="Tap to show paywall in full screen overlay"
      onSelectOffering={setSelectedOffering}
    >
      {selectedOffering && (
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={dismiss} />
          <View style={styles.content}>
            <RevenueCatUI.Paywall
              options={{ offering: selectedOffering }}
              onDismiss={dismiss}
              onPurchaseCompleted={() =>
                Alert.alert("Success", "Purchase completed!", [
                  { text: "OK", onPress: dismiss },
                ])
              }
              onPurchaseError={({ error }) =>
                Alert.alert("Error", error?.message ?? "Purchase failed")
              }
            />
          </View>
        </View>
      )}
    </OfferingsList>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 1000 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

