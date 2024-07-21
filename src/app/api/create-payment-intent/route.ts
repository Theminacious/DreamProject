// pages/api/create-payment-intent.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20', // Ensure this matches your Stripe API version
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const createPaymentIntent = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const buf = await buffer(req);
  const { amount } = JSON.parse(buf.toString());

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default createPaymentIntent;
