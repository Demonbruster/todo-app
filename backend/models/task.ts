import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	name: { type: String, required: true },
	isCompleted: { type: Boolean, default: false },
	targetDate: { type: Date },
},{
  timestamps: true // Saves createdAt and updatedAt as dates 
});

export default mongoose.model("Task",taskSchema);
