import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  days: { type: Number, required: true },
  currentStreak: { type: Number, default: 0 },
});

export default mongoose.model("Mission", missionSchema);
