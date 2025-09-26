import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  language: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("QuizResult", quizResultSchema);
