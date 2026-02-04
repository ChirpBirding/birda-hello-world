import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Birda Hello World</Text>
      <Text style={styles.subtitle}>
        This is a test app to showcase isolated features
      </Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('RevenueCatTest')}
        >
          <Text style={styles.menuItemText}>🐱 Test RevenueCat Paywalls</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  menuContainer: {
    gap: 15,
  },
  menuItem: {
    backgroundColor: '#1F87FE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

