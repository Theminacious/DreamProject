'use client'
import { useState, useEffect, Suspense } from 'react'; // Import Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from 'axios';

interface DetailsPageProps {
  pickupLocation: string;
  dropoffLocation: string;
  deliveryTime: string;
  dimensions: string;
  weight: string;
  price: string;
}

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [details, setDetails] = useState<DetailsPageProps | null>(null);
  const [paymentClicked, setPaymentClicked] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch delivery detail by ID from the API
      axios.get(`/api/delivery-detail?id=${id}`)
        .then(response => {
          setDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching delivery details:', error);
        });
    }
  }, [id]);

  const handlePayment = () => {
    // Implement payment logic here
    alert("Payment functionality to be implemented");
    // Example: Redirect to another page after payment
    // window.location.href = '/payment';
  };

  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src="/loading.gif" alt="Loading" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-screen-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-center text-4xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Delivery Details
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.8,
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.3,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[
          { label: "Pickup Location", value: details.pickupLocation, icon: "/pickup.png" },
          { label: "Dropoff Location", value: details.dropoffLocation, icon: "/dropoff.png" },
          { label: "Delivery Time", value: new Date(details.deliveryTime).toLocaleString(), icon: "/time.png" },
          { label: "Dimensions", value: details.dimensions, icon: "/dimensions.png" },
          { label: "Weight", value: `${details.weight} kg`, icon: "/weight.png" },
          { label: "Price", value: `₹${details.price}`, icon: "/price.png" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img src={item.icon} alt={item.label} className="w-12 h-12 mr-4" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
              <p className="text-gray-800">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {!paymentClicked && (
        <div className="mt-6 flex justify-center">
          <motion.button
            onClick={() => setPaymentClicked(true)}
            className="bg-black text-white rounded-full shadow-md hover:bg-gray-800 focus:ring focus:ring-gray-700 px-6 py-3 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Payment
          </motion.button>
        </div>
      )}
      {paymentClicked && (
        <div className="mt-6 flex justify-center">
          <motion.button
            onClick={handlePayment}
            className="bg-black text-white rounded-full shadow-md hover:bg-gray-800 focus:ring focus:ring-gray-700 px-6 py-3 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Confirm Payment
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

const DetailsPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsPage />
    </Suspense>
  );
};

export default DetailsPageWithSuspense;
