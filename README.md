# Smart Service Booking App

Production-style React Native portfolio project scaffold for a service-booking app focused on strong frontend engineering, polished mobile UX, and interview-ready architecture.

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
- Reanimated
- Gesture Handler

## Architecture Summary

- Feature-oriented `src/features` direction expressed through modular `screens`, `navigation`, `components`, `store`, `mocks`, and `theme` folders
- Shared design tokens for colors, spacing, radius, typography, and card shadows
- React Navigation structure with auth flow, tab shell, nested booking/history/profile stacks, and modal routes
- TanStack Query configured for server-state-ready mock service integration
- Zustand stores scaffolded for auth session and booking draft persistence
- Mock data and mock service layer prepared to support incremental feature delivery

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
  - Home tab with booking discovery flow
  - Bookings tab with history and detail flow
  - Profile tab with settings/support flow
- Nested booking flow
  - Home
  - Search
  - Category Listing
  - Service Detail
  - Address List
  - Add Address
  - Slot Selection
  - Booking Summary
  - Payment Method
  - Booking Success

## Available Screens

- Splash / onboarding
- Login
- OTP verify
- Home
- Search
- Category listing
- Service detail
- Address list
- Add address
- Slot selection
- Booking summary
- Payment method
- Booking success
- Upcoming booking detail
- Booking history
- Reschedule booking
- Cancel booking
- Profile
- Edit profile
- Settings
- Help / support
- Notifications
- Search modal
- Confirmation modal

## How To Run Locally

```bash
npm install
npm start
```

Then open the Expo project in an emulator or Expo Go.

## Current Phase

Phase 1 scaffolding is complete:

- Project config and Expo app shell
- Navigation setup
- Shared layout and UI primitives
- Placeholder screens for all major flows
- Theme tokens and utility helpers
- Query provider and Zustand stores
- Realistic mock data for services, addresses, and bookings

Phase 2 should focus on feature implementation, form validation, booking logic, and richer async states.
