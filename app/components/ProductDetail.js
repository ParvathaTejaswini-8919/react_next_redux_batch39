"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Alert, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedProduct, deleteProduct, fetchProduct } from "../lib/productsSlice";
import ProductForm from "./ProductForm";

const productEmojis = {
  Accessories: "👜",
  Apparel: "👕",
  "Home & Living": "🪴",
  Technology: "🎧",
  Stationery: "📓",
};

export default function ProductDetail({ id, mode = "view" }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedProduct: product, detailStatus, detailError, mutationStatus, mutationError } = useSelector((state) => state.products);
  const productId = product?.id;
  const productName = product?.name;

  useEffect(() => {
    if (id) dispatch(fetchProduct(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  async function handleDelete() {
    if (productId == null || !window.confirm(`Delete "${productName}"? This action cannot be undone.`)) return;
    const result = await dispatch(deleteProduct(productId));
    if (deleteProduct.fulfilled.match(result)) {
      router.push("/products");
    }
  }

  if (detailStatus === "loading" || detailStatus === "idle") {
    return <main className="page-content"><div className="loading-box" role="status"><Spinner animation="border" size="sm" className="me-2" />Loading product...</div></main>;
  }

  if (detailStatus === "failed" || !product) {
    return (
      <main className="page-content">
        <Link href="/products" className="back-link">← &nbsp;Back to products</Link>
        <Alert variant="danger" role="alert">{detailError || "Product not found."}</Alert>
        <Link href="/products" className="btn btn-light-custom">Return to products</Link>
      </main>
    );
  }

  if (mode === "edit") {
    return (
      <main className="page-content">
        <Link href={`/products/${encodeURIComponent(product.id)}`} className="back-link">← &nbsp;Back to product</Link>
        <div className="page-heading">
          <div><div className="eyebrow">Your catalog</div><h1>Edit product</h1><p>Update product details and inventory.</p></div>
        </div>
        <ProductForm product={product} mode="edit" />
      </main>
    );
  }

  const stockValue = Number(product.stock);
  const productStatus = product.status === "archived"
    ? { label: "Archived", className: "status-out" }
    : stockValue === 0
      ? { label: "Out of stock", className: "status-out" }
      : stockValue <= 10
        ? { label: "Low stock", className: "status-low" }
        : { label: "In stock", className: "status-active" };

  return (
    <main className="page-content">
      <Link href="/products" className="back-link">← &nbsp;Back to products</Link>
      <div className="page-heading">
        <div><div className="eyebrow">Product details</div><h1>{product.name}</h1><p>SKU {product.sku}</p></div>
        <div className="d-flex gap-2">
          <Link href={`/products/${encodeURIComponent(product.id)}/edit`} className="btn btn-light-custom">Edit product</Link>
          <Button variant="outline-danger" size="sm" onClick={handleDelete} disabled={mutationStatus === "loading"}>Delete</Button>
        </div>
      </div>
      <section className="detail-card" aria-label={`Details for ${product.name}`}>
        {mutationStatus === "failed" && <Alert variant="danger" role="alert">{mutationError || "Could not delete this product. Please try again."}</Alert>}
        <div className="detail-top">
          <div className="detail-art" aria-hidden="true">{productEmojis[product.category] || "📦"}</div>
          <div>
            <span className="category-chip">{product.category}</span>
            <h2 className="detail-name">{product.name}</h2>
            <div className="detail-meta">SKU {product.sku} &nbsp;·&nbsp; <span className={`status-pill ${productStatus.className}`}>{productStatus.label}</span></div>
            {product.description && <p className="detail-meta mt-3">{product.description}</p>}
          </div>
        </div>
        <div className="detail-stats">
          <div><div className="detail-stat-label">Unit price</div><div className="detail-stat-value">{Number(product.price).toLocaleString("en-US", { style: "currency", currency: "USD" })}</div></div>
          <div><div className="detail-stat-label">Available stock</div><div className="detail-stat-value">{stockValue.toLocaleString()} <span className="text-muted fs-6 fw-normal">units</span></div></div>
          <div><div className="detail-stat-label">Inventory value</div><div className="detail-stat-value">{(Number(product.price) * stockValue).toLocaleString("en-US", { style: "currency", currency: "USD" })}</div></div>
        </div>
      </section>
    </main>
  );
}