import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    fa_name: {
      type: String,
    },
    fa_slug: {
      type: String,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    date_added: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
