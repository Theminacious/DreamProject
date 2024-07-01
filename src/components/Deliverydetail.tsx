'use client'
// components/DeliveryForm.js
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';

interface FormData {
  pickupLocation: string;
  dropoffLocation: string;
  deliveryTime: string; // Assuming datetime-local returns a string
  dimensions: string;
  weight: string; // Keep weight as string in form data
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
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Format datetime-local input value for server-side compatibility
      data.deliveryTime = new Date(data.deliveryTime).toISOString();
      // Convert weight to number
      const parsedWeight = parseFloat(data.weight);

      const requestData = {
        ...data,
        weight: parsedWeight,
      };

      const response = await axios.post('/api/delivery-detail', requestData);
      setSuccessMessage("Delivery details successfully submitted.");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-8 md:mt-0">
      <div className="md:flex md:space-x-6">
        <div className="w-full md:w-1/2">
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <input {...register('pickupLocation')} id="pickupLocation" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.pickupLocation && <p className="text-red-500">{errors.pickupLocation.message}</p>}
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700">Dropoff Location</label>
          <input {...register('dropoffLocation')} id="dropoffLocation" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.dropoffLocation && <p className="text-red-500">{errors.dropoffLocation.message}</p>}
        </div>
      </div>
      <div className="md:flex md:space-x-6 mt-4">
        <div className="w-full md:w-1/2">
          <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">Delivery Time</label>
          <input type="datetime-local" {...register('deliveryTime')} id="deliveryTime" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.deliveryTime && <p className="text-red-500">{errors.deliveryTime.message}</p>}
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions</label>
          <input {...register('dimensions')} id="dimensions" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.dimensions && <p className="text-red-500">{errors.dimensions.message}</p>}
        </div>
      </div>
      <div className="md:flex md:space-x-6 mt-4">
        <div className="w-full md:w-1/2">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
          <input type="number" {...register('weight')} id="weight" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black" />
          {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="w-full md:w-1/2">
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300 disabled:opacity-50 p-2">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DeliveryForm;
