const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    tags: [{ type: String }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    votes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

questionSchema.index({ title: "text" });
questionSchema.index({ tags: "text" });

//Get array of all the tags used in the questions
questionSchema.aggregate([
  {
    $unwind: "$tags",
  },
  {
    $group: {
      _id: "$tags",
    },
  },
]);

//Get total questions count
questionSchema.aggregate([
  {
    $group: {
      _id: null,
      totalQuestions: {
        $sum: 1,
      },
    },
  },
]);

//total views on a particular day
questionSchema.aggregate([
  {
    $group: {
      _id: { views: "$views", dayOfMonth: "$updatedAt" },
      count: { $sum: 1 },
    },
  },
]);

module.exports = mongoose.model("Question", questionSchema);
