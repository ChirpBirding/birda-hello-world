import React from "react";
import { Alert } from "react-native";
import { PurchasesOffering } from "react-native-purchases";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

import { OfferingsList } from "../components/OfferingsList";

/** Uses RevenueCatUI.presentPaywall() to show the paywall imperatively. */
export const PaywallInPresentPaywallScreen = () => {
  const presentPaywall = async (offering: PurchasesOffering) => {
    const result = await RevenueCatUI.presentPaywall({ offering });

    const messages: Record<PAYWALL_RESULT, string> = {
      [PAYWALL_RESULT.PURCHASED]: "Purchase completed!",
      [PAYWALL_RESULT.RESTORED]: "Purchases restored!",
      [PAYWALL_RESULT.CANCELLED]: "Paywall was cancelled",
      [PAYWALL_RESULT.NOT_PRESENTED]: "Paywall could not be presented",
      [PAYWALL_RESULT.ERROR]: "An error occurred",
    };

    Alert.alert(
      result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED
        ? "Success"
        : "Info",
      messages[result],
    );
  };

  return (
    <OfferingsList
      subtitle="Tap an offering to present the paywall"
      onSelectOffering={presentPaywall}
    />
  );
};

