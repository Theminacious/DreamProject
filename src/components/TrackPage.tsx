import { useState } from 'react';
import axios from 'axios';

const TrackPackage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [packageStatus, setPackageStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrackPackage = async () => {
    try {
      const { data } = await axios.get(`/api/track-package?trackingId=${trackingId}`);
      setPackageStatus(data);
      setError(null);
    } catch (err) {
      setError('Package not found');
      setPackageStatus(null);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Track Your Package</h1>
      <input
        type="text"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Enter your tracking ID"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleTrackPackage}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Track Package
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {packageStatus && (
        <div className="mt-4">
          <p><strong>Current Location:</strong> {packageStatus.currentLocation}</p>
          <p><strong>Delivery Location:</strong> {packageStatus.deliveryLocation}</p>
          <p><strong>Estimated Delivery Time:</strong> {new Date(packageStatus.estimatedDeliveryTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TrackPackage;
