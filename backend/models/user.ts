import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { ImageSchema } from "./image";

const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
  email: string;
  moderator?: boolean;
  image?: typeof ImageSchema;
  following: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  moderator: {
    type: Boolean,
  },
  image: ImageSchema,
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;