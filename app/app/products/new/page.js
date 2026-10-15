import Link from "next/link";
import ProductForm from "../../../components/ProductForm";

export default function NewProductPage() {
  return (
    <main className="page-content">
      <Link href="/products" className="back-link">← &nbsp;Back to products</Link>
      <div className="page-heading">
        <div><div className="eyebrow">Your catalog</div><h1>Add a product</h1><p>Fill in the details to add a new product to your catalog.</p></div>
      </div>
      <ProductForm />
    </main>
  );
}