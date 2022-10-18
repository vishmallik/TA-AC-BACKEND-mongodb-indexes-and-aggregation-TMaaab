const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  email: { type: String },
  address: {
    city: String,
    state: String,
    country: String,
    pin: String,
  },
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: -1 }, { unique: true });

userSchema.index({ country: 1, state: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
