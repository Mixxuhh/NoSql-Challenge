import mongoose, { Schema, Document } from "mongoose";
import reactionSchema from "./Reaction.js";

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: any[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

// Virtual for formatted date
thoughtSchema.virtual("formattedDate").get(function (this: IThought) {
  return this.createdAt.toLocaleString();
});

// Virtual for reactionCount
thoughtSchema.virtual("reactionCount").get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = mongoose.model<IThought>("Thought", thoughtSchema);

export default Thought;
