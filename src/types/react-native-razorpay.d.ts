declare module "react-native-razorpay" {
  type RazorpaySuccess = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };

  type RazorpayError = {
    code?: string | number;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
    metadata?: {
      payment_id?: string;
      order_id?: string;
    };
  };

  const RazorpayCheckout: {
    open(options: Record<string, unknown>): Promise<RazorpaySuccess>;
    onExternalWalletSelection(callback: (wallet: { external_wallet: string }) => void): void;
  };

  export default RazorpayCheckout;
}
