# EAS Secrets Setup Guide

This guide explains how to configure RevenueCat API keys using EAS Secrets, matching the main Birda app's approach.

## Why EAS Secrets?

The main Birda app uses EAS Secrets to:
- Keep sensitive API keys out of the codebase
- Manage different keys for different environments (development, preview, production)
- Automatically inject secrets during EAS builds
- Share secrets across team members without exposing them in version control

## Prerequisites

1. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```

2. Login to your Expo account:
   ```bash
   eas login
   ```

## Setting Up Secrets

### 1. Get Your RevenueCat API Keys

1. Go to [RevenueCat Dashboard](https://app.revenuecat.com/)
2. Navigate to your project
3. Go to Settings → API Keys
4. Copy both iOS and Android API keys

### 2. Create EAS Secrets

Run these commands to create project-level secrets:

```bash
# iOS API Key
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY --value your_ios_key_here --type string

# Android API Key
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY --value your_android_key_here --type string
```

**Important Notes:**
- Replace `your_ios_key_here` and `your_android_key_here` with your actual keys
- The `--scope project` flag makes these secrets available to all builds in this project
- The `EXPO_PUBLIC_` prefix makes these variables accessible at runtime in the app

### 3. Verify Secrets

List all secrets for your project:
```bash
eas secret:list --scope project
```

You should see both RevenueCat secrets listed.

## How It Works

### Build Time (EAS Builds)

1. When you run `eas build`, EAS automatically injects the secrets as environment variables
2. The `app.config.ts` file reads these variables via `process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`
3. They're embedded into the app's Expo config under `extra.revenueCat`

### Runtime

1. The app uses `getExpoConfigExtra()` to access the config
2. RevenueCat is initialized with the appropriate key based on the platform

### Local Development

For local development (when not using EAS builds), you still need a `.env` file:

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your keys:
   ```bash
   EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=your_ios_key_here
   EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=your_android_key_here
   ```

3. The `.env` file is gitignored and won't be committed

## Environment-Specific Secrets (Advanced)

If you need different keys for different environments (like the main app does), you can create environment-specific secrets:

```bash
# Development environment
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY --value dev_ios_key --type string --environment development

# Production environment
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY --value prod_ios_key --type string --environment production
```

The `eas.json` file already has `environment` fields configured for each build profile.

## Troubleshooting

### "RevenueCat API keys not configured" error

1. **For EAS builds:** Verify secrets are set with `eas secret:list --scope project`
2. **For local development:** Check that `.env` file exists and contains the keys
3. **After changing secrets:** Restart your development server or rebuild

### Updating Secrets

To update an existing secret:
```bash
eas secret:delete --scope project --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY --value new_value --type string
```

### Viewing Secret Values

For security, EAS doesn't allow viewing secret values after creation. If you need to verify:
1. Check your RevenueCat dashboard for the correct keys
2. Delete and recreate the secret if needed

## Best Practices

1. **Never commit API keys** to version control
2. **Use project-scoped secrets** for team collaboration
3. **Use environment-specific secrets** for production vs development keys
4. **Document which secrets are required** in your README
5. **Rotate keys periodically** for security

## Related Documentation

- [EAS Secrets Documentation](https://docs.expo.dev/build-reference/variables/)
- [RevenueCat API Keys](https://docs.revenuecat.com/docs/authentication)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)

