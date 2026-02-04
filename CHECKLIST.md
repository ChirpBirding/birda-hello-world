# Setup Checklist for Birda Hello World

## ✅ Completed

- [x] Created project structure
- [x] Installed all dependencies (npm install completed successfully)
- [x] Configured package.json with exact same versions as main Birda app
- [x] Created app.json with Expo configuration
- [x] Set up TypeScript configuration
- [x] Set up Babel configuration
- [x] Created navigation structure with React Navigation
- [x] Implemented HomeScreen with menu
- [x] Implemented RevenueCatTestScreen (similar to main app's Team Settings)
- [x] Copied assets from main Birda app
- [x] Created .gitignore
- [x] Created EAS build configuration
- [x] Created comprehensive documentation (README, SETUP, PROJECT_SUMMARY)

## 🔧 To Do Before First Run

### 1. Configure RevenueCat API Keys

The app uses EAS Secrets (same as the main Birda app) to manage API keys securely.

**Option A: For EAS Builds (Recommended)**

Set secrets in EAS for each environment:

```bash
# For development builds
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY --value your_ios_key --type string
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY --value your_android_key --type string
```

These secrets will be automatically injected during EAS builds.

**Option B: For Local Development**

Create a `.env` file in the project root (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` file and add your RevenueCat API keys:
```bash
EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=your_ios_api_key_here
EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=your_android_api_key_here
```

**Where to find keys**:
1. Go to https://app.revenuecat.com/
2. Navigate to your project
3. Go to Settings → API Keys
4. Copy the iOS and Android keys

**Note**: The app uses the same configuration pattern as the main Birda app:
- API keys are stored in EAS Secrets (for builds) or local .env (for development)
- They're loaded via `app.config.ts` into the Expo config
- Runtime code accesses them via `getExpoConfigExtra()`

📖 **For detailed instructions, see [EAS_SECRETS_SETUP.md](./EAS_SECRETS_SETUP.md)**

### 2. Build Development Client

Choose one of these methods:

**Option A: Local Build (requires Xcode for iOS)**
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

**Option B: EAS Build (recommended, works without Xcode)**
```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS (first time only)
eas build:configure

# Build development client
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

### 3. Set Up RevenueCat Dashboard

1. **Create Project** in RevenueCat
2. **Add App**:
   - iOS Bundle ID: `com.birda.helloworld`
   - Android Package: `com.birda.helloworld`
3. **Create Products** in App Store Connect / Google Play Console
4. **Create Offerings** in RevenueCat dashboard
5. **Configure Paywalls** (optional, for testing UI)

### 4. Set Up Sandbox Testing

**For iOS**:
1. Go to App Store Connect
2. Navigate to Users and Access → Sandbox Testers
3. Create a sandbox test account
4. On your device, sign out of App Store
5. When testing purchases, sign in with sandbox account

**For Android**:
1. Go to Google Play Console
2. Navigate to Setup → License Testing
3. Add test accounts
4. Use test account on your device

## 🚀 Running the App

### Start Development Server
```bash
npm start
```

### Launch on Device/Simulator
After building the development client:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with dev client app on physical device

## 🧪 Testing RevenueCat

1. Launch the app
2. Tap "🐱 Test RevenueCat Paywalls"
3. You should see:
   - "✅ RevenueCat Configured" if API keys are correct
   - List of offerings from your RevenueCat dashboard
4. Tap any offering to present the paywall
5. Test purchase flow (uses sandbox, no real charges)

## ⚠️ Common Issues

### "RevenueCat not configured" or "RevenueCat API keys not configured"
- Check that you created a `.env` file from `.env.example`
- Verify API keys are set in `.env` file
- Restart the development server after changing `.env`
- Verify you're using the correct key for your platform
- Check RevenueCat dashboard for project status

### "No offerings available"
- Create offerings in RevenueCat dashboard
- Ensure products exist in App Store Connect / Google Play Console
- Wait a few minutes for RevenueCat to sync

### Build errors
- Verify Node version: `node --version` (should be 18.18.0 - 20.x)
- Clear cache: `npx expo start -c`
- Reinstall: `rm -rf node_modules && npm install`

### "Expo Go" doesn't work
- This app uses native modules (RevenueCat)
- You MUST use a development client build
- Expo Go only works with apps that don't use custom native code

## 📊 Version Verification

Run this to verify versions match the main app:
```bash
npm list expo react react-native react-native-purchases
```

Expected output:
```
birda-hello-world@1.0.0
├── expo@53.0.0
├── react@19.0.0
├── react-native@0.79.6
└── react-native-purchases@9.7.1
```

## 📝 Next Steps After Setup

1. Test the RevenueCat integration
2. Add more isolated features as needed
3. Use this app to test new features before adding to main app
4. Share with team for testing specific functionality

## 🔗 Helpful Links

- [RevenueCat Docs](https://docs.revenuecat.com/)
- [Expo Docs](https://docs.expo.dev/)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [React Navigation Docs](https://reactnavigation.org/)

