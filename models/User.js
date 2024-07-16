import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    mobile: {
      type: Number,
      required: [true, "mobile is required"],
    },
    phone: {
      type: Number,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
      },
    },
    details: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    receiptImage: {
      type: String,
    },
    image: {
      type: String,
    },
    savedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = models.User || model("User", UserSchema);

export default User;
