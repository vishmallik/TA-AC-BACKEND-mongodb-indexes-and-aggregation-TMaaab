const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    content: { type: String, required: true },
    votes: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    questionId: { type: Schema.Types.ObjectId, ref: "Question" },
    answerId: { type: Schema.Types.ObjectId, ref: "Answer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
