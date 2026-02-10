import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import { PurchasesOffering } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

import { OfferingsList } from "../components/OfferingsList";

/** Shows the Paywall component inside a full-screen React Native Modal. */
export const PaywallInModalScreen = () => {
  const [selectedOffering, setSelectedOffering] =
    useState<PurchasesOffering | null>(null);

  const dismiss = () => setSelectedOffering(null);

  return (
    <OfferingsList
      subtitle="Tap to show paywall in modal"
      onSelectOffering={setSelectedOffering}
    >
      <Modal
        visible={!!selectedOffering}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={dismiss}
      >
        {selectedOffering && (
          <View style={styles.flex}>
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
        )}
      </Modal>
    </OfferingsList>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
});

