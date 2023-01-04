import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  country: {
    type: String,
    trim: true,
    uppercase: true,
  },
  state: {
    type: String,
    trim: true,
    uppercase: true,
  },
  city: {
    type: String,
    trim: true,
    uppercase: true,
  },
  pincode: {
    type: Number,
    trim: true,
    require: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

export default mongoose.model("addresses", addressSchema);
