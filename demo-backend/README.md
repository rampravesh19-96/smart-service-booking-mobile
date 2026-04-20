# Payments Demo Backend

This small local server provides the backend-style contract required for Razorpay:

- `POST /payments/order`
- `POST /payments/verify`

It keeps Razorpay secret keys off the React Native client while still allowing real Razorpay test-mode checkout.

## Run

1. Add your Razorpay backend keys either to the project root `.env` or to `demo-backend/.env`.
2. Start the server from the project root:

```bash
npm run payments:server
```

3. Print your machine LAN IP if needed:

```bash
npm run payments:lan-ip
```

4. Set `EXPO_PUBLIC_PAYMENTS_API_BASE_URL` in the app to your machine's LAN IP and port, for example:

```bash
EXPO_PUBLIC_PAYMENTS_API_BASE_URL=http://10.151.193.226:8787
```

5. Verify reachability from your laptop or phone browser:

```bash
http://10.151.193.226:8787/health
```

Your Android device and your machine must be on the same network, and the backend must be reachable on the LAN URL rather than `localhost`.
