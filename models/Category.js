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
        parent: {
            type: Schema.Types.ObjectId,
            ref: "Category",
          },
    },
    {
        timestamps: true,
    }, 
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;