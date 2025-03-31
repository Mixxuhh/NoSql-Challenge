import { Router, Request, Response } from "express";
import Thought from "../models/Thought.js";
import User from "../models/User.js";
import { RequestHandler } from "../types/express.js";

const router = Router();

// GET all thoughts
router.get("/", (async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find().populate("reactions");
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}) as unknown as RequestHandler);

// GET single thought by ID
router.get("/:id", (async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.id }).populate(
      "reactions"
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
}) as unknown as RequestHandler);

// POST new thought
router.post("/", (async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user found with this id!" });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
}) as unknown as RequestHandler);

// PUT update thought
router.put("/:id", (async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
}) as unknown as RequestHandler);

// DELETE thought
router.delete("/:id", (async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id });

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    // Remove thought ID from user's thoughts array
    await User.findOneAndUpdate(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } }
    );

    return res.json({ message: "Thought deleted!" });
  } catch (err) {
    return res.status(500).json(err);
  }
}) as unknown as RequestHandler);

// POST create reaction
router.post("/:thoughtId/reactions", (async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
}) as unknown as RequestHandler);

// DELETE reaction
router.delete("/:thoughtId/reactions/:reactionId", (async (
  req: Request,
  res: Response
) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
}) as unknown as RequestHandler);

export default router;
