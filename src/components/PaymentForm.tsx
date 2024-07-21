// components/PaymentForm.tsx
import { useState, useEffect } from 'react';
import { loadStripe, PaymentRequest } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface PaymentFormProps {
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canMakePayment, setCanMakePayment] = useState<boolean>(false);

  useEffect(() => {
    if (stripe && paymentMethod === 'upi') {
      const pr = stripe.paymentRequest({
        country: 'IN',
        currency: 'inr',
        total: {
          label: 'Total',
          amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        setCanMakePayment(!!result);
      });

      setPaymentRequest(pr);
    }
  }, [stripe, amount, paymentMethod]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { data: { clientSecret } } = await axios.post('/api/create-payment-intent', { amount, paymentMethodType: paymentMethod });

    let result;
    if (paymentMethod === 'card') {
      result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });
    } else if (paymentRequest) {
      // Ensure paymentRequest is not null
      result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
      });
    } else {
      setErrorMessage('UPI payment is not available.');
      return;
    }

    if (result.error) {
      setErrorMessage(result.error.message || 'Payment failed');
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        alert('Payment succeeded!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'upi')}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      {paymentMethod === 'card' && <CardElement className="p-4 border border-gray-300 rounded-lg" />}
      {paymentMethod === 'upi' && canMakePayment && paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      )}
      {paymentMethod === 'upi' && !canMakePayment && (
        <div className="text-red-500">UPI payment is not available on this device/browser.</div>
      )}

      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 w-full bg-black text-white rounded-full shadow-md hover:bg-gray-800 focus:ring focus:ring-gray-700 px-6 py-3 text-lg"
      >
        Pay ₹{amount / 100}
      </button>
    </form>
  );
};

const StripeWrapper: React.FC<PaymentFormProps> = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} />
    </Elements>
  );
};

export default StripeWrapper;
