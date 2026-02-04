# Setup Instructions for Birda Hello World

## ✅ What's Been Done

1. **Created project structure** with the same Expo/React Native versions as the main Birda app
2. **Installed dependencies** including RevenueCat SDK
3. **Created basic navigation** with React Navigation
4. **Implemented RevenueCat test screen** similar to the main app's Team Settings
5. **Copied assets** from the main Birda app

## 📋 Version Matching

This app uses the **exact same versions** as the main Birda app:

| Package | Version |
|---------|---------|
| Expo | 53.0.0 |
| React Native | 0.79.6 |
| React | 19.0.0 |
| RevenueCat | 9.7.1 |
| RevenueCat UI | 9.7.1 |
| React Navigation | 6.1.18 |

## 🚀 Next Steps

### 1. Configure RevenueCat API Keys

Edit `src/screens/RevenueCatTestScreen.tsx` and replace:

```typescript
const IOS_API_KEY = 'YOUR_IOS_API_KEY';
const ANDROID_API_KEY = 'YOUR_ANDROID_API_KEY';
```

With your actual RevenueCat API keys from:
https://app.revenuecat.com/settings/api-keys

### 2. Build the Development Client

Since RevenueCat uses native modules, you need to build a development client:

**For iOS (requires Mac with Xcode):**
```bash
npx expo run:ios
```

**For Android:**
```bash
npx expo run:android
```

**Or use EAS Build (recommended):**
```bash
# Install EAS CLI if you haven't
npm install -g eas-cli

# Login to Expo
eas login

# Build development client
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

### 3. Start the Development Server

```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go (won't work with native modules, need dev client)

## 🧪 Testing RevenueCat

### Setup in RevenueCat Dashboard

1. **Create a project** in RevenueCat dashboard
2. **Add your app** (iOS bundle ID: `com.birda.helloworld`, Android package: `com.birda.helloworld`)
3. **Create products** in App Store Connect / Google Play Console
4. **Create offerings** in RevenueCat dashboard
5. **Configure paywalls** in RevenueCat dashboard

### Testing Flow

1. Launch the app
2. Tap "🐱 Test RevenueCat Paywalls"
3. You should see a list of offerings
4. Tap any offering to present the paywall
5. Test the purchase flow (uses sandbox mode)

### Sandbox Testing

**iOS:**
- Sign out of your Apple ID in Settings
- When prompted during purchase, use a sandbox test account
- Create sandbox accounts in App Store Connect

**Android:**
- Add test accounts in Google Play Console
- Use a test account on your device

## 📁 Project Structure

```
birda-hello-world/
├── App.tsx                 # Main app with navigation
├── src/
│   └── screens/
│       ├── HomeScreen.tsx           # Home screen with menu
│       └── RevenueCatTestScreen.tsx # RevenueCat testing screen
├── assets/                 # App icons and images
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── README.md              # General documentation
```

## 🔧 Troubleshooting

### "RevenueCat not configured" error
- Make sure you've added your API keys in `RevenueCatTestScreen.tsx`
- Check that you're using the correct key for your platform

### "No offerings available"
- Create offerings in RevenueCat dashboard
- Make sure products are configured in App Store Connect / Google Play Console
- Wait a few minutes for RevenueCat to sync

### Build errors
- Make sure you have the correct Node version (18.18.0 - 20.x)
- Clear cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📚 Resources

- [RevenueCat Documentation](https://docs.revenuecat.com/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)

