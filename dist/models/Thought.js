import mongoose, { Schema } from "mongoose";
import reactionSchema from "./Reaction.js";
const thoughtSchema = new Schema({
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
}, {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
});
// Virtual for formatted date
thoughtSchema.virtual("formattedDate").get(function () {
    return this.createdAt.toLocaleString();
});
// Virtual for reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
const Thought = mongoose.model("Thought", thoughtSchema);
export default Thought;
