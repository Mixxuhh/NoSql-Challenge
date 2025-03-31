import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address",
        ],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// Virtual for friendCount
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});
const User = mongoose.model("User", userSchema);
export default User;
