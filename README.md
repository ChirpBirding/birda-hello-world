# Birda Hello World

A test app to showcase isolated features from the main Birda app using the same Expo/React Native versions.

## Versions

This app uses the same versions as the main Birda app:
- **Expo**: 53.0.0
- **React Native**: 0.79.6
- **React**: 19.0.0
- **RevenueCat**: 9.7.1

## Features

### 1. Test RevenueCat Paywalls
Similar to the "Test Revenue Cat" section in the main app's Team Settings, this feature allows you to:
- View all available RevenueCat offerings
- Present paywalls for testing
- Test purchase flows without actual charges (using RevenueCat sandbox)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure RevenueCat

The app uses EAS Secrets (same as the main Birda app) to manage API keys.

**For EAS Builds:**
```bash
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY --value your_ios_key --type string
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY --value your_android_key --type string
```

**For Local Development:**
Create a `.env` file (copy from `.env.example`) and add your keys:
```bash
cp .env.example .env
# Edit .env and add your RevenueCat API keys
```

Find your keys in RevenueCat dashboard: Project Settings → API Keys

### 3. Build Development Client

Since this app uses native modules (RevenueCat), you need to build a development client:

**For iOS:**
```bash
npx expo run:ios
```

**For Android:**
```bash
npx expo run:android
```

### 4. Start the Development Server

```bash
npm start
```

## Usage

1. Launch the app on your device/simulator
2. Tap "Test RevenueCat Paywalls" from the home screen
3. View available offerings from your RevenueCat dashboard
4. Tap any offering to present the paywall
5. Test the purchase flow (uses sandbox mode)

## Testing RevenueCat

To test RevenueCat properly:

1. **Set up test users** in RevenueCat dashboard
2. **Create offerings** in RevenueCat dashboard
3. **Use sandbox accounts**:
   - iOS: Use a sandbox Apple ID
   - Android: Use a test account in Google Play Console

## Notes

- This app requires a development client build because RevenueCat uses native modules
- Make sure you have configured products in App Store Connect / Google Play Console
- The app uses the same RevenueCat SDK version as the main Birda app for consistency

## Adding More Features

To add more isolated features from the main app:

1. Create a new screen in `src/screens/`
2. Add navigation route in `App.tsx`
3. Add a menu item in `HomeScreen.tsx`

