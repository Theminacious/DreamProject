import dbConnect from "@/lib/dbConnect";
import DeliverydetailModel from "@/model/Deliverydetails";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { pickupLocation, dropoffLocation, deliveryTime, dimensions, weight } = await request.json();

        if (!pickupLocation || !dropoffLocation || !deliveryTime || !dimensions || !weight) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const deliverydetail = await DeliverydetailModel.create({
            pickupLocation,
            dropoffLocation,
            deliveryTime,
            dimensions,
            weight
        });

        // Convert the document to JSON to include virtual fields
        const deliverydetailJson = deliverydetail.toJSON();

        return new Response(JSON.stringify(deliverydetailJson), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
