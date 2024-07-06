// Import required modules and dependencies
import { Request, Response } from 'express'; // Assuming use of Express.js
import dbConnect from '@/lib/dbConnect';
import DeliverydetailModel from '@/model/Deliverydetails';

export async function POST(request: Request) {
    await dbConnect(); // Connect to MongoDB

    try {
        // Destructure required fields from request body
        const { pickupLocation, dropoffLocation, deliveryTime, dimensions, weight } = await request.json();

        // Validate presence of required fields
        if (!pickupLocation || !dropoffLocation || !deliveryTime || !dimensions || !weight) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // Create a new delivery detail document
        const deliverydetail = await DeliverydetailModel.create({
            pickupLocation,
            dropoffLocation,
            deliveryTime,
            dimensions,
            weight
        });

        // Convert the document to JSON to include virtual fields
        const deliverydetailJson = deliverydetail.toJSON();

        // Return success response with the created delivery detail
        return new Response(JSON.stringify(deliverydetailJson), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        // Handle any errors and return an appropriate response
        return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
