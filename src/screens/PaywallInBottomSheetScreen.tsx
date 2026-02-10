import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { PurchasesOffering } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

import { OfferingsList } from "../components/OfferingsList";

/** Shows the Paywall component inside a @gorhom/bottom-sheet. */
export const PaywallInBottomSheetScreen = () => {
  const [selectedOffering, setSelectedOffering] =
    useState<PurchasesOffering | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const dismiss = useCallback(() => {
    bottomSheetRef.current?.close();
    setSelectedOffering(null);
  }, []);

  return (
    <OfferingsList
      subtitle="Tap to show paywall in bottom sheet"
      onSelectOffering={(offering) => {
        setSelectedOffering(offering);
        bottomSheetRef.current?.expand();
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["90%"]}
        enablePanDownToClose
        enableDynamicSizing={false}
        onClose={() => setSelectedOffering(null)}
      >
        <View style={styles.flex}>
          {selectedOffering && (
            <RevenueCatUI.Paywall
              options={{
                offering: selectedOffering,
                displayCloseButton: false,
              }}
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
          )}
        </View>
      </BottomSheet>
    </OfferingsList>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
