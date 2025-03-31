import { Router } from "express";
import User from "../models/User.js";
import Thought from "../models/Thought.js";
const router = Router();
// GET all users
router.get("/", (async (_req, res) => {
    try {
        const users = await User.find().populate("thoughts").populate("friends");
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// GET single user by ID
router.get("/:id", (async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
            .populate("thoughts")
            .populate("friends");
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// POST new user
router.post("/", (async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// PUT update user
router.put("/:id", (async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// DELETE user
router.delete("/:id", (async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        // BONUS: Remove user's associated thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        return res.json({ message: "User and associated thoughts deleted!" });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// POST add friend
router.post("/:userId/friends/:friendId", (async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
// DELETE remove friend
router.delete("/:userId/friends/:friendId", (async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
export default router;
