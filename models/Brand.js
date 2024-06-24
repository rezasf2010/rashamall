import { Schema, model, models } from "mongoose";

// Brand Schema
const BrandSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        categories: [{
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        }],
        description: {
            type: String,
        },
        country_of_origin: {
            type: String,
        },
        established_year: {
            type: Number,
        },
        website: {
            type: String,
        },
        logo_url: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Brand = models.Brand || model("Brand", BrandSchema);

export default Brand;
