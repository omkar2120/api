import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  mobile: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: new Date().toISOString() },
});

export default mongoose.model("students", studentSchema);
