# That's My Gurl (Expo SDK 57)

Simple, installable community app: Home, Reels, Chat, Groups, Profile, plus Create, Events, Learn, Mind check, Journal, and Safety & privacy. Data is saved on-device (AsyncStorage). No backend.

## Run (Node 22.13+)
```bash
npm install
npx expo install --fix     # aligns every package to the exact SDK 57 versions
npx expo-doctor            # optional health check
npx expo start             # scan the QR code with Expo Go (SDK 57)
```

## Install on a phone (Android APK)
```bash
npm i -g eas-cli
eas login
eas build:configure        # first time only
npm run apk                # eas build -p android --profile preview
```
Open the link EAS gives you on the phone and install the APK. For iOS or the Play Store use `--profile production` (needs developer accounts).

## Before publishing
- Change `com.thatsmygurl.app` in app.json (ios.bundleIdentifier and android.package) to your own id.
- Replace the placeholder heart icons in `assets/` with the real logo (1024x1024; the adaptive icon keeps its subject centred).
