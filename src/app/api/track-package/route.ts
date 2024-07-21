import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import DeliverydetailModel, { Deliverydetail } from '@/model/Deliverydetails';

interface PackageStatus {
  currentLocation: string;
  deliveryLocation: string;
  estimatedDeliveryTime: string;
}

const trackPackage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing package ID' });
  }

  try {
    // Adjust according to your actual Mongoose model structure
    const deliverydetail = await DeliverydetailModel.findById(id);

    if (!deliverydetail) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const packageStatus: PackageStatus = {
      currentLocation: deliverydetail.pickupLocation || 'Unknown Location',
      deliveryLocation: deliverydetail.dropoffLocation,
      estimatedDeliveryTime: deliverydetail.deliveryTime.toISOString(),
    };

    res.status(200).json(packageStatus);
  } catch (error) {
    console.error('Error fetching package status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default trackPackage;
