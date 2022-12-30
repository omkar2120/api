const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  mobile: { type: String },
  createdAt: { type: Date, default: new Date().toISOString },
  updatedAt: { type: Date, default: new Date().toISOString },
});

module.exports = mongoose.model("students", studentSchema);
