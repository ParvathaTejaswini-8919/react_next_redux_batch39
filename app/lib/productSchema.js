import * as Yup from "yup";

export const productSchema = Yup.object({
  name: Yup.string().trim().required("Product name is required").max(80, "Use 80 characters or fewer"),
  sku: Yup.string().trim().required("SKU is required").max(32, "Use 32 characters or fewer"),
  category: Yup.string().required("Choose a category"),
  price: Yup.number().typeError("Enter a valid price").min(0, "Price cannot be negative").required("Price is required"),
  stock: Yup.number().typeError("Enter a valid quantity").integer("Quantity must be a whole number").min(0, "Quantity cannot be negative").required("Quantity is required"),
  description: Yup.string().trim().max(500, "Use 500 characters or fewer"),
});

export const productCategories = ["Accessories", "Apparel", "Home & Living", "Technology", "Stationery"];