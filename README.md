# Smart Service Booking App

`Smart Service Booking App` is a production-style React Native portfolio project built to showcase senior-friendly mobile frontend engineering across discovery, trust, booking, payment UX, lifecycle management, support, and polished product thinking.

## Why This Project Matters

This project is designed to look and feel like a serious startup MVP rather than a tutorial clone.

- It demonstrates real mobile product architecture, not just isolated screens
- It shows depth in booking flows, async UX, form validation, state separation, and reusable components
- It includes one practical AI-assisted feature without turning the app into an AI gimmick
- It is structured to create good recruiter screenshots and strong interview discussion points

## Stack

- React Native
- Expo
- TypeScript
- React Navigation
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Expo Secure Store
- Expo Image
- React Native Reanimated
- Gesture Handler

## Key Features

- Intentional onboarding and phone-first auth flow
- Validated login and OTP verification
- Home discovery with categories, offers, featured services, and nearby recommendations
- Search with category filtering plus Smart Service Finder AI assist
- Rich service detail with provider trust indicators, add-ons, and review depth
- Multi-step booking flow with persisted draft state
- Real Razorpay test-mode checkout through a demo backend contract
- Booking history, booking detail, cancel, reschedule, and rebook actions
- Profile, edit profile, settings, notifications, and support flows
- Global toast feedback for important actions

## AI Feature Summary

The app includes one scoped AI-assisted feature: `Smart Service Finder`.

- Users can type a real-world need like `AC not cooling` or `need deep cleaning before guests`
- A mock AI service maps the intent to the most relevant service
- The result also suggests a useful add-on and a booking tip
- This keeps AI practical, product-friendly, and interview-relevant without adding a chatbot

## Architecture Summary

- `src/navigation`: root stacks, tab navigation, nested booking/history/profile flows
- `src/screens`: screen-level UI for auth, discovery, booking, bookings, profile, and modal surfaces
- `src/components`: shared UI primitives, layout shells, feedback components, and reusable product cards
- `src/hooks`: TanStack Query hooks for catalog, bookings, reviews, support, notifications, and AI assist
- `src/store`: Zustand stores for auth, booking draft, and persisted user preferences
- `src/mocks`: realistic mock data and service-layer functions with async behavior
- `src/features`: form schemas and feature-level validation logic
- `src/theme`: design tokens for colors, spacing, typography, radius, and shadows

The project keeps server state, local workflow state, form state, and UI components clearly separated.

## Navigation Summary

- Root stack
  - Splash
  - Auth stack
  - App stack
  - Modal routes
- Auth stack
  - Onboarding
  - Login
  - OTP Verify
- Main tabs
  - Home / discovery stack
  - Bookings stack
  - Profile stack
- Booking flow
  - Home
  - Search
  - Category Listing
  - Service Detail
  - Reviews
  - Address List
  - Add Address
  - Slot Selection
  - Booking Summary
  - Payment Method
  - Booking Success
- Booking management flow
  - Booking History
  - Upcoming Booking Detail
  - Reschedule Booking
  - Cancel Booking
  - Notifications
- Profile flow
  - Profile
  - Edit Profile
  - Settings
  - Help & Support
  - Support Issue
  - Notifications

## How To Run Locally

```bash
npm install
npm start
```

For native Razorpay payment testing, use an Expo development build instead of Expo Go.

Set your app env like this before starting Metro:

```bash
EXPO_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
EXPO_PUBLIC_PAYMENTS_API_BASE_URL=https://smart-service-booking-mobile.onrender.com
```

Important Expo env note:

- `EXPO_PUBLIC_*` values are read into the client bundle, not fetched live from `.env` at runtime
- if you change `.env` while Metro is already running, restart Metro
- if your installed dev build / APK was created before the env was present, make a fresh build after updating the env

Before triggering an EAS build, run:

```bash
npm run payments:preflight
```

It validates that the Razorpay public key exists, the payments base URL resolves, and the app is not pointing at localhost.

Then start the app:

```bash
npm run start:dev-client
```

## Suggested Demo Sections

Use these sections for screenshots, a portfolio case study, or recruiter demo clips:

1. Onboarding and auth
2. Home discovery and search
3. Smart Service Finder AI assist
4. Service detail and reviews
5. Multi-step booking flow
6. Payment confirmation and success state
7. Booking history and lifecycle management
8. Profile, settings, notifications, and support

## Good Interview Talking Points

- Why Expo was the right product decision for a frontend-first portfolio build
- How TanStack Query and Zustand are separated by responsibility
- How the booking draft persists across steps
- How the app handles loading, empty, success, and error states
- How trust signals were designed into service detail and reviews
- Why the AI feature was intentionally scoped to a useful, product-focused assist

## Current Scope

This project intentionally stays frontend-first.

- Payment uses real Razorpay test checkout with a deployed Render backend for order creation and verification
- Support is mock-based
- AI is mock-assisted and limited to one feature
- The architecture is ready for backend integration without needing a UI rewrite
