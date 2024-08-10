import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface PaymentFormProps {
  amount: number;
  deliveryDetails: {
    pickupLocation: string;
    dropoffLocation: string;
    deliveryTime: string;
    dimensions: string;
    weight: string;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, deliveryDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    try {
      const { data } = await axios.post('/api/create-payment-intent', {
        amount,
        deliveryDetails,
      });

      const { clientSecret, trackingId } = data;

      setTrackingId(trackingId);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message || 'Payment failed');
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          alert('Payment succeeded!');
          // Display tracking ID to the user
          alert(`Your tracking ID is: ${trackingId}`);
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred while processing the payment.');
      console.error('Payment Error:', error);
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

const StripeWrapper: React.FC<PaymentFormProps> = ({ amount, deliveryDetails }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} deliveryDetails={deliveryDetails} />
    </Elements>
  );
};

export default StripeWrapper;
