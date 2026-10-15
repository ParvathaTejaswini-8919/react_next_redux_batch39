import ProductDetail from "../../../../components/ProductDetail";

export const instant = false;

export default async function EditProductPage({ params }) {
  const { id } = await params;
  return <ProductDetail id={id} mode="edit" />;
}