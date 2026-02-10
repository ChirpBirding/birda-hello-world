import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import RevenueCatUI from "react-native-purchases-ui";

import { RootStackParamList } from "../../App";
import { OfferingsList } from "../components/OfferingsList";

/** Navigates to a new stack screen that renders the Paywall component inline. */
export const PaywallInStackScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "PaywallInStack">>();

  return (
    <OfferingsList
      subtitle="Tap to navigate to paywall in stack"
      onSelectOffering={(offering) =>
        navigation.navigate("PaywallStackView", { offering })
      }
    />
  );
};

/** The actual paywall rendered inside the navigation stack. */
export const PaywallStackViewScreen = () => {
  const { offering } =
    useRoute<RouteProp<RootStackParamList, "PaywallStackView">>().params;
  const navigation = useNavigation();

  return (
    <View style={styles.flex}>
      <RevenueCatUI.Paywall
        options={{ offering, displayCloseButton: false }}
        onDismiss={() => navigation.goBack()}
        onPurchaseCompleted={() =>
          Alert.alert("Success", "Purchase completed!", [
            { text: "OK", onPress: () => navigation.goBack() },
          ])
        }
        onPurchaseError={({ error }) =>
          Alert.alert("Error", error?.message ?? "Purchase failed")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
});

