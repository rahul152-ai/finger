import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },

    fingerPrint: {
      type: [String],
      required: true,
    },

    mobileNumber: {
      type: Number,
      requiredf: true,
    },
    address: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const student = mongoose.model("Student", studentSchema);

export default student;
