import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchName: {
      type: String,
      required: true,
    },
    batchAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    studentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const batch = mongoose.model("batch", batchSchema);

export default batch;
