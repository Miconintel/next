import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exist"],
    required: [true, "email is required"],
  },
  username: {
    type: String,
    unique: [true, "username already exist"],
    required: [true, "username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "email should contain alpha numeric letters and be unique",
    ],
  },
  image: {
    type: String,
  },
});

// moodify the schema
// check if model.user = updatedUser, if true, then use model.user, else, use the updated schema.
// this code willl help keep your schema updated, inacase there is an update.
// closing the server and openiong it again can solve this issue.
// const updatedUSer = model("User", userSchema);
const User = models.User || model("User", userSchema);
// const User =
//   models.User == updatedUSer ? models.user : model("User", userSchema);

export default User;
