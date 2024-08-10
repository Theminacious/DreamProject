import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import DeliverydetailModel from '@/model/Deliverydetails';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { trackingId } = req.query;

  if (!trackingId || Array.isArray(trackingId)) {
    return res.status(400).json({ message: 'Tracking ID is required' });
  }

  try {
    const deliveryDetail = await DeliverydetailModel.findOne({ trackingId });

    if (!deliveryDetail) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json({
      trackingId,
      currentLocation: deliveryDetail.pickupLocation,
      deliveryLocation: deliveryDetail.dropoffLocation,
      estimatedDeliveryTime: deliveryDetail.deliveryTime,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
