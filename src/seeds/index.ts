import mongoose from "mongoose";
import User from "../models/User.js";
import Thought from "../models/Thought.js";

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/socialNetworkDB");
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const users = await User.create([
      {
        username: "lernantino",
        email: "lernantino@gmail.com",
      },
      {
        username: "amiko",
        email: "amiko2k20@aol.com",
      },
      {
        username: "jordan",
        email: "jordan99@msn.com",
      },
    ]);
    console.log("Created users");

    // Create thoughts
    const thoughts = await Thought.create([
      {
        thoughtText: "Just made a new friend!",
        username: users[0].username,
      },
      {
        thoughtText: "I love to code!",
        username: users[1].username,
      },
      {
        thoughtText: "JavaScript is awesome!",
        username: users[2].username,
      },
    ]);
    console.log("Created thoughts");

    // Update users with thoughts
    await User.findOneAndUpdate(
      { username: users[0].username },
      { $push: { thoughts: thoughts[0]._id } }
    );
    await User.findOneAndUpdate(
      { username: users[1].username },
      { $push: { thoughts: thoughts[1]._id } }
    );
    await User.findOneAndUpdate(
      { username: users[2].username },
      { $push: { thoughts: thoughts[2]._id } }
    );
    console.log("Updated users with thoughts");

    // Add friends
    await User.findOneAndUpdate(
      { username: users[0].username },
      { $push: { friends: users[1]._id } }
    );
    await User.findOneAndUpdate(
      { username: users[0].username },
      { $push: { friends: users[2]._id } }
    );
    await User.findOneAndUpdate(
      { username: users[1].username },
      { $push: { friends: users[0]._id } }
    );
    await User.findOneAndUpdate(
      { username: users[2].username },
      { $push: { friends: users[0]._id } }
    );
    console.log("Added friends");

    // Add reactions
    await Thought.findOneAndUpdate(
      { _id: thoughts[0]._id },
      {
        $push: {
          reactions: {
            reactionBody: "That is cool!",
            username: users[1].username,
          },
        },
      }
    );
    await Thought.findOneAndUpdate(
      { _id: thoughts[1]._id },
      {
        $push: {
          reactions: {
            reactionBody: "I agree!",
            username: users[0].username,
          },
        },
      }
    );
    console.log("Added reactions");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
