import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

import { useState, useEffect } from 'react';

interface FormData {
  pickupLocation: string;
  dropoffLocation: string;
  deliveryTime: string;
  dimensions: string;
  weight: string;
}

const schema = z.object({
  pickupLocation: z.string().nonempty({ message: "Pickup location is required" }),
  dropoffLocation: z.string().nonempty({ message: "Dropoff location is required" }),
  deliveryTime: z.string().nonempty({ message: "Delivery time is required" }),
  dimensions: z.string().nonempty({ message: "Dimensions are required" }),
  weight: z.string().refine(value => {
    const parsedWeight = parseFloat(value);
    return !isNaN(parsedWeight) && parsedWeight > 0;
  }, { message: "Weight must be a positive number" }),
});

const DeliveryForm = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const watchedFields = useWatch({ control });

  useEffect(() => {
    const calculatePrice = async () => {
      if (watchedFields.pickupLocation && watchedFields.dropoffLocation && watchedFields.deliveryTime && watchedFields.dimensions && watchedFields.weight) {
        try {
          const deliveryTime = new Date(watchedFields.deliveryTime).toISOString();
          const parsedWeight = parseFloat(watchedFields.weight);

          const requestData = {
            ...watchedFields,
            deliveryTime,
            weight: parsedWeight,
          };

          const response = await axios.post('/api/calculate-price', requestData);
          setPrice(response.data.price);
        } catch (error) {
          console.error("Error calculating price:", error);
        }
      }
    };

    calculatePrice();
  }, [watchedFields]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      data.deliveryTime = new Date(data.deliveryTime).toISOString();
      const parsedWeight = parseFloat(data.weight);

      const requestData = {
        ...data,
        weight: parsedWeight,
      };

      const response = await axios.post('/api/delivery-detail', requestData);
      setSuccessMessage("Delivery details successfully submitted.");
      setPrice(response.data.price);
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data.message || "An error occurred while submitting the form.");
        } else if (error.request) {
          setErrorMessage("Network error. Please try again later.");
        } else {
          setErrorMessage("An unexpected error occurred. Please try again later.");
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
    {/* <h1 className="text-center text-white mb-4">Get Your Service At Low Cost</h1> */}
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <input placeholder='Enter Pickup Location' {...register('pickupLocation')} id="pickupLocation" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.pickupLocation && <p className="text-red-500">{errors.pickupLocation.message}</p>}
        </div>
        <div>
          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700">Dropoff Location</label>
          <input {...register('dropoffLocation')} placeholder='Enter Drop Location' id="dropoffLocation" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.dropoffLocation && <p className="text-red-500">{errors.dropoffLocation.message}</p>}
        </div>
        <div>
          <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">Delivery Time</label>
          <input type="datetime-local" {...register('deliveryTime')} id="deliveryTime" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.deliveryTime && <p className="text-red-500">{errors.deliveryTime.message}</p>}
        </div>
        <div>
          <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions</label>
          <input {...register('dimensions')} placeholder='Enter Item Dimension ' id="dimensions" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.dimensions && <p className="text-red-500">{errors.dimensions.message}</p>}
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
          <input type="number" {...register('weight')} placeholder='Enter Item Weight' id="weight" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
        </div>
      
      <div className="mt-4">
        <button type="submit" disabled={loading} className="w-full bg-black text-white rounded-lg shadow-md hover:bg-black focus:ring focus:ring-black disabled:opacity-50 p-2 text-center">
          {loading ? "Loading..." : price !== null ? `Price: ₹${price.toFixed(2)}` : "Calculate Price"}
        </button>
      </div>
      </div>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
    </form>
    </>
  );
};

export default DeliveryForm;
