import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PurchasesOffering } from "react-native-purchases";

import { HomeScreen } from './src/screens/HomeScreen';
import { PaywallInBottomSheetScreen } from "./src/screens/PaywallInBottomSheetScreen";
import { PaywallInModalScreen } from "./src/screens/PaywallInModalScreen";
import { PaywallInOverlayScreen } from "./src/screens/PaywallInOverlayScreen";
import {
  PaywallInStackScreen,
  PaywallStackViewScreen,
} from "./src/screens/PaywallInStackScreen";
import { RevenueCatTestScreen } from './src/screens/RevenueCatTestScreen';

export type RootStackParamList = {
  Home: undefined;
  RevenueCatTest: undefined;
  PaywallInStack: undefined;
  PaywallStackView: { offering: PurchasesOffering };
  PaywallInModal: undefined;
  PaywallInBottomSheet: undefined;
  PaywallInOverlay: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Birda Hello World" }}
          />
          <Stack.Screen
            name="RevenueCatTest"
            component={RevenueCatTestScreen}
            options={{ title: "presentPaywall()" }}
          />
          <Stack.Screen
            name="PaywallInStack"
            component={PaywallInStackScreen}
            options={{ title: "Paywall in Stack" }}
          />
          <Stack.Screen
            name="PaywallStackView"
            component={PaywallStackViewScreen}
            options={{ title: "Paywall" }}
          />
          <Stack.Screen
            name="PaywallInModal"
            component={PaywallInModalScreen}
            options={{ title: "Paywall in Modal" }}
          />
          <Stack.Screen
            name="PaywallInBottomSheet"
            component={PaywallInBottomSheetScreen}
            options={{ title: "Paywall in Bottom Sheet" }}
          />
          <Stack.Screen
            name="PaywallInOverlay"
            component={PaywallInOverlayScreen}
            options={{ title: "Paywall in Overlay" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

