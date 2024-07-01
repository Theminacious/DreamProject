import mongoose, { Schema, Document } from 'mongoose';

export interface Deliverydetail extends Document {
    pickupLocation: string;
    dropoffLocation: string;
    deliveryTime: Date;
    dimensions: string;
    weight: number;
    // price is removed from the interface
}

const DeliverydetailSchema: Schema<Deliverydetail> = new Schema({
    pickupLocation: {
        type: String,
        required: [true, "Pickup location is required"],
        trim: true
    },
    dropoffLocation: {
        type: String,
        required: [true, "Dropoff location is required"],
        trim: true
    },
    deliveryTime: {
        type: Date,
        required: [true, "Delivery time is required"]
    },
    dimensions: {
        type: String,
        required: [true, "Dimensions is required"],
        trim: true
    },
    weight: {
        type: Number,
        required: [true, "Weight is required"]
    }
});

// Add a virtual property to calculate the price
DeliverydetailSchema.virtual('price').get(function (this: Deliverydetail) {
    // Example price calculation logic
    const basePrice = 50; // base price
    const weightFactor = 0.5; // price per kg
    const dimensionFactor = 0.2; // price per dimension unit
    const deliveryTimeFactor = 1.5; // price factor based on delivery time urgency

    // Calculate price
    const price = basePrice + (this.weight * weightFactor) + (parseFloat(this.dimensions) * dimensionFactor) + (deliveryTimeFactor);

    return price;
});

// Ensure virtual fields are included when converting to JSON
DeliverydetailSchema.set('toJSON', { virtuals: true });
DeliverydetailSchema.set('toObject', { virtuals: true });

const DeliverydetailModel = (mongoose.models.Deliverydetail as mongoose.Model<Deliverydetail>) || mongoose.model('Deliverydetail', DeliverydetailSchema);

export default DeliverydetailModel;
