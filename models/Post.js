import { Schema, model, models } from "mongoose";

// Section Schema
const SectionSchema = new Schema({
  title: {
    type: String,
  },
  paragraph: {
    type: String,
  },
});

const PostSchema = new Schema(
  {
    mainTitle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    intro: {
      type: String,
    },
    sections: [SectionSchema], // Array of key-value pairs for sections
    tags: [
      {
        type: String,
      },
    ],
    outro: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
