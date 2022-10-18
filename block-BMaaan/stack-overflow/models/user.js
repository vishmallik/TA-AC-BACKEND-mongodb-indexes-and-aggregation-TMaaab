const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, match: /@/ },
    password: { type: String, minlength: 8 },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

//Count total reputation of a user
userSchema.aggregate([
  {
    $group: {
      _id: null,
      totalReputation: {
        $sum: 1,
      },
    },
  },
]);
module.exports = mongoose.model("User", userSchema);
