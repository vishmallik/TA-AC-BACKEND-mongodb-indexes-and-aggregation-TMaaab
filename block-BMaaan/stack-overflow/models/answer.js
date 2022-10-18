const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    content: { type: String, required: true },
    votes: { type: Number, default: 0 },
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
    questionId: { type: Schema.Types.ObjectId, ref: "Question" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//Total answers count overall and question specific as well
answerSchema.aggregate([
  {
    $group: {
      _id: null,
      totalAnswers: {
        $sum: 1,
      },
    },
  },
]);

answerSchema.aggregate([
  {
    $group: {
      _id: "$questionId",
      totalAnswers: {
        $sum: 1,
      },
    },
  },
]);

//Count total answer by a particular user
answerSchema.aggregate([
  {
    $group: {
      _id: "$userId",
      totalAnswers: {
        $sum: 1,
      },
    },
  },
]);

module.exports = mongoose.model("Answer", answerSchema);
