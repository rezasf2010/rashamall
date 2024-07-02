import { Schema, model, models } from "mongoose";

// Specification Schema
const SpecificationSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: Schema.Types.Mixed, // Mixed type to accommodate various data types
    required: true,
  },
});

// Product Schema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    main_category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sub_category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    specifications: [SpecificationSchema], // Array of key-value pairs for specifications
    features: [
      {
        type: String,
      },
    ],
    services: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    is_onSale: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
    _stock: {
      type: Number,
    },
    _stock_status: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
