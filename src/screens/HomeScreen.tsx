import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface MenuItem {
  label: string;
  screen: keyof RootStackParamList;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    label: "🐱 presentPaywall()",
    screen: "RevenueCatTest",
    description: "Imperative method to present paywall",
  },
  {
    label: "📱 Paywall in Stack",
    screen: "PaywallInStack",
    description: "Paywall component in navigation stack",
  },
  {
    label: "🪟 Paywall in Modal",
    screen: "PaywallInModal",
    description: "Paywall component in a Modal",
  },
  {
    label: "📋 Paywall in Bottom Sheet",
    screen: "PaywallInBottomSheet",
    description: "Paywall component in a bottom sheet",
  },
  {
    label: "🖥️ Paywall in Overlay",
    screen: "PaywallInOverlay",
    description: "Paywall component in full screen overlay",
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to Birda Hello World</Text>
      <Text style={styles.subtitle}>
        Test different paywall presentation methods
      </Text>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen as any)}
          >
            <Text style={styles.menuItemText}>{item.label}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  menuContainer: {
    gap: 15,
  },
  menuItem: {
    backgroundColor: "#1F87FE",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  menuItemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  menuItemDescription: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
});

