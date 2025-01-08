import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/dbConnect';
import DeliverydetailModel from '@/model/Deliverydetails';
import { v4 as uuidv4 } from 'uuid';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const { amount, deliveryDetails } = await req.json();

    // Create a new payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'], // Only card payment is allowed
    });

    // Create a tracking ID
    const trackingId = uuidv4();

    // Save delivery details and tracking ID in the database
    const newDeliveryDetail = new DeliverydetailModel({
      ...deliveryDetails,
      trackingId,
    });

    await newDeliveryDetail.save();

    // Simulate payment success for testing purposes
    const paymentSuccess = true; // You can modify this as needed

    if (paymentSuccess) {
      // Return client secret and tracking ID
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        trackingId,
        message: 'Payment successful and tracking ID generated',
      });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({ error: errorMessage });
  }
}
