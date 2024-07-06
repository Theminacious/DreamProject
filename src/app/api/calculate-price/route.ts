import { z } from 'zod';
import dbConnect from '@/lib/dbConnect';
import axios from 'axios';
import DeliverydetailModel from '@/model/Deliverydetails';

const CalculatePriceQuerySchema = z.object({
    pickupLocation: z.string().nonempty({ message: "Pickup location is required" }),
    dropoffLocation: z.string().nonempty({ message: "Dropoff location is required" }),
    deliveryTime: z.string().nonempty({ message: "Delivery time is required" }),
    dimensions: z.string().nonempty({ message: "Dimensions are required" }),
    weight: z.string().refine(value => {
        const parsedWeight = parseFloat(value);
        return !isNaN(parsedWeight) && parsedWeight > 0;
    }, { message: "Weight must be a positive number" }),
});

export async function POST(request: Request) {
    await dbConnect();

    try {
        const requestData = await request.json();
        const result = CalculatePriceQuerySchema.safeParse(requestData);

        if (!result.success) {
            const formattedErrors = result.error.format();

            const errorMessage = 
                formattedErrors.pickupLocation?._errors.join(', ') ||
                formattedErrors.dropoffLocation?._errors.join(', ') ||
                formattedErrors.deliveryTime?._errors.join(', ') ||
                formattedErrors.dimensions?._errors.join(', ') ||
                formattedErrors.weight?._errors.join(', ') ||
                'Invalid query parameters';

            return new Response(JSON.stringify({ success: false, message: errorMessage }), { status: 400 });
        }

        const { pickupLocation, dropoffLocation, deliveryTime, dimensions, weight } = result.data;

        const response = await axios.post('/api/calculate-price', {
            pickupLocation,
            dropoffLocation,
            deliveryTime,
            dimensions,
            weight,
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("Error in calculate price route:", error);

        return new Response(JSON.stringify({
            success: false,
            message: 'An unexpected error occurred. Please try again later.'
        }), { status: 500 });
    }
}
