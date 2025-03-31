import mongoose, { Schema } from "mongoose";

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toLocaleString(),
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
    _id: false,
  }
);

export default reactionSchema;
