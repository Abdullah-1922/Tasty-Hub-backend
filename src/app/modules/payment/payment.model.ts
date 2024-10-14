import mongoose, { model, Schema } from "mongoose";

const paymentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  sessionId: {
    type: String,
    required: true,
  },
  paymentIntentId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  });
  
 export const Payment = model('Payment', paymentSchema);
  
