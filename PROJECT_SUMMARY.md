# Birda Hello World - Project Summary

## 🎯 Purpose

This is a **test/demo app** created to showcase isolated features from the main Birda app in a clean, minimal environment. It uses the **exact same versions** of Expo, React Native, and key libraries as the main Birda app to ensure consistency and accurate testing.

## ✅ What's Included

### 1. RevenueCat Paywall Testing
- **Screen**: `src/screens/RevenueCatTestScreen.tsx`
- **Functionality**: Similar to the "Test Revenue Cat" section in the main app's Team Settings
- **Features**:
  - Initialize RevenueCat SDK
  - Fetch all available offerings
  - Present paywalls for testing
  - Handle purchase results (purchased, restored, cancelled, error)

### 2. Basic Navigation
- React Navigation Stack Navigator
- Home screen with menu
- Easy to add more test screens

## 📦 Version Compatibility

All versions match the main Birda app (`app/package.json`):

```json
{
  "expo": "^53.0.0",
  "react": "19.0.0",
  "react-native": "0.79.6",
  "react-native-purchases": "^9.7.1",
  "react-native-purchases-ui": "^9.7.1",
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/stack": "^6.4.1",
  "react-native-gesture-handler": "~2.24.0",
  "react-native-reanimated": "~3.17.4",
  "react-native-safe-area-context": "5.4.0",
  "react-native-screens": "~4.11.1"
}
```

## 🏗️ Project Structure

```
birda-hello-world/
├── App.tsx                          # Main app entry with navigation setup
├── src/
│   └── screens/
│       ├── HomeScreen.tsx           # Home screen with feature menu
│       └── RevenueCatTestScreen.tsx # RevenueCat testing interface
├── assets/                          # App icons (copied from main app)
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── README.md                        # User documentation
├── SETUP.md                         # Detailed setup instructions
└── PROJECT_SUMMARY.md              # This file
```

## 🚀 Quick Start

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Configure RevenueCat**:
   - Edit `src/screens/RevenueCatTestScreen.tsx`
   - Add your RevenueCat API keys

3. **Build development client**:
   ```bash
   npx expo run:ios
   # or
   npx expo run:android
   ```

4. **Start development server**:
   ```bash
   npm start
   ```

## 🎨 Design Decisions

### Why This Approach?

1. **Version Matching**: Using the exact same library versions ensures that any behavior observed in this test app will match the main app
2. **Minimal Dependencies**: Only includes what's needed for the specific features being tested
3. **Easy to Extend**: Simple structure makes it easy to add more isolated feature tests
4. **No Shared Code**: Completely independent from the main app to avoid conflicts

### What's Different from Main App?

- **No GraphQL/Apollo**: Not needed for RevenueCat testing
- **No Complex State Management**: Uses simple React state instead of Jotai
- **No i18n**: Hardcoded English strings for simplicity
- **No Tailwind**: Uses StyleSheet for simpler setup
- **No Firebase/Sentry/Analytics**: Focus on core feature testing

## 🔄 Adding More Features

To add another isolated feature test:

1. **Create a new screen** in `src/screens/`
2. **Add route** to `App.tsx`:
   ```typescript
   <Stack.Screen 
     name="NewFeature" 
     component={NewFeatureScreen}
     options={{ title: 'New Feature Test' }}
   />
   ```
3. **Add menu item** in `HomeScreen.tsx`:
   ```typescript
   <TouchableOpacity
     style={styles.menuItem}
     onPress={() => navigation.navigate('NewFeature')}
   >
     <Text style={styles.menuItemText}>🎯 New Feature</Text>
   </TouchableOpacity>
   ```

## 📝 Notes

- This app requires a **development client** build because RevenueCat uses native modules
- Assets are copied from the main Birda app
- The app uses the same bundle IDs with `.helloworld` suffix to avoid conflicts
- RevenueCat configuration is separate from the main app (different API keys can be used)

## 🔗 Related Files

- **Main App**: `../app/` - The production Birda app
- **RevenueCat in Main App**: `../app/src/screens/RevenueCatPaywalls/RevenueCatPaywalls.tsx`
- **Team Settings in Main App**: `../app/src/molecules/SettingsTeamMenu/SettingsTeamMenu.tsx`

## 📚 Documentation

- See `README.md` for general information
- See `SETUP.md` for detailed setup instructions
- See RevenueCat docs: https://docs.revenuecat.com/

