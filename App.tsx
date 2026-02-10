import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PurchasesOffering } from "react-native-purchases";

import { HomeScreen } from "./src/screens/HomeScreen";
import { PaywallInBottomSheetScreen } from "./src/screens/PaywallInBottomSheetScreen";
import { PaywallInModalScreen } from "./src/screens/PaywallInModalScreen";
import { PaywallInOverlayScreen } from "./src/screens/PaywallInOverlayScreen";
import {
  PaywallInStackScreen,
  PaywallStackViewScreen,
} from "./src/screens/PaywallInStackScreen";
import { PaywallInPresentPaywallScreen } from "./src/screens/PaywallInPresentPaywallScreen";

export type RootStackParamList = {
  Home: undefined;
  PaywallInPresentPaywall: undefined;
  PaywallInStack: undefined;
  PaywallStackView: { offering: PurchasesOffering };
  PaywallInModal: undefined;
  PaywallInBottomSheet: undefined;
  PaywallInOverlay: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const screens: {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  title: string;
}[] = [
  { name: "Home", component: HomeScreen, title: "Birda Hello World" },
  {
    name: "PaywallInPresentPaywall",
    component: PaywallInPresentPaywallScreen,
    title: "presentPaywall()",
  },
  {
    name: "PaywallInStack",
    component: PaywallInStackScreen,
    title: "Paywall in Stack",
  },
  {
    name: "PaywallStackView",
    component: PaywallStackViewScreen,
    title: "Paywall",
  },
  {
    name: "PaywallInModal",
    component: PaywallInModalScreen,
    title: "Paywall in Modal",
  },
  {
    name: "PaywallInBottomSheet",
    component: PaywallInBottomSheetScreen,
    title: "Paywall in Bottom Sheet",
  },
  {
    name: "PaywallInOverlay",
    component: PaywallInOverlayScreen,
    title: "Paywall in Overlay",
  },
];

export default function App() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {screens.map(({ name, component, title }) => (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={{ title }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
