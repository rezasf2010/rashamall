import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
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
    isNewOrder: {
      type: Boolean,
      default: true,
    },
    orderNum: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = models.Order || model('Order', OrderSchema);

export default Order;
