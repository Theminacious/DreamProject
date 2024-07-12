import dbConnect from '@/lib/dbConnect';
import DeliverydetailModel from '@/model/Deliverydetails';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    await dbConnect(); // Connect to MongoDB

    try {
        // Destructure required fields from request body
        const { pickupLocation, dropoffLocation, deliveryTime, dimensions, weight } = await request.json();

        // Validate presence of required fields
        if (!pickupLocation || !dropoffLocation || !deliveryTime || !dimensions || !weight) {
            return new NextResponse(JSON.stringify({ message: "All fields are required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
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
        return new NextResponse(JSON.stringify(deliverydetailJson), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        // Handle any errors and return an appropriate response
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function GET(request: NextRequest) {
    await dbConnect(); // Connect to MongoDB

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            // Fetch the specific delivery detail by ID
            const deliverydetail = await DeliverydetailModel.findById(id);

            if (!deliverydetail) {
                return new NextResponse(JSON.stringify({ message: 'Details not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
            }

            // Convert the document to JSON to include virtual fields
            const deliverydetailJson = deliverydetail.toJSON();

            // Return success response with the fetched delivery detail
            return new NextResponse(JSON.stringify(deliverydetailJson), { status: 200, headers: { 'Content-Type': 'application/json' } });

        } else {
            // Fetch all delivery details from the database
            const deliverydetails = await DeliverydetailModel.find({});

            // Convert the documents to JSON to include virtual fields
            const deliverydetailsJson = deliverydetails.map(detail => detail.toJSON());

            // Return success response with the fetched delivery details
            return new NextResponse(JSON.stringify(deliverydetailsJson), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

    } catch (error: any) {
        // Handle any errors and return an appropriate response
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
