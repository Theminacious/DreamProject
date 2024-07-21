// components/PaymentForm.tsx

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

interface PaymentFormProps {
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await axios.post('/api/create-payment-intent', {
        amount,
      });

      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'Customer Name',
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message || 'Payment failed');
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          alert('Payment succeeded!');
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred while processing your payment. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <CardElement className="p-4 border border-gray-300 rounded-lg" />
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
