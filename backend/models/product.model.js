import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		details: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
