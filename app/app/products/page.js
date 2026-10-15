"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../lib/productsSlice";

const productEmojis = {
  Accessories: "👜",
  Apparel: "👕",
  "Home & Living": "🪴",
  Technology: "🎧",
  Stationery: "📓",
};

function getStatus(product) {
  if (product.status === "archived") return { label: "Archived", className: "status-out" };
  if (product.stock === 0) return { label: "Out of stock", className: "status-out" };
  if (product.stock <= 10) return { label: "Low stock", className: "status-low" };
  return { label: "In stock", className: "status-active" };
}

function StatCard({ label, value, note, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top"><span>{label}</span><span className="stat-icon" aria-hidden="true">{icon}</span></div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </div>
  );
}

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error, mutationStatus } = useSelector((state) => state.products);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((product) => {
      const matchesQuery = !normalizedQuery
        || product.name.toLowerCase().includes(normalizedQuery)
        || product.sku.toLowerCase().includes(normalizedQuery);
      return matchesQuery && (!category || product.category === category);
    });
  }, [items, query, category]);

  const categories = useMemo(() => [...new Set(items.map((product) => product.category))].filter(Boolean).sort(), [items]);
  const lowStock = items.filter((product) => product.stock > 0 && product.stock <= 10).length;
  const inventoryValue = items.reduce((sum, product) => sum + Number(product.price) * Number(product.stock), 0);

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This action cannot be undone.`)) return;
    setDeleteError("");
    const result = await dispatch(deleteProduct(product.id));
    if (!deleteProduct.fulfilled.match(result)) {
      setDeleteError(result.payload || "Could not delete this product.");
    }
  }

  return (
    <main className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">Your catalog</div>
          <h1>Products</h1>
          <p>Manage and keep track of your product inventory.</p>
        </div>
        <Link href="/products/new" className="btn btn-brand"><span aria-hidden="true">＋</span> &nbsp;Add product</Link>
      </div>

      <section className="stats-grid" aria-label="Inventory summary">
        <StatCard label="Total products" value={items.length} note="Products in your catalog" icon="▦" />
        <StatCard label="Low stock" value={lowStock} note="Products need a restock" icon="◷" />
        <StatCard label="Inventory value" value={inventoryValue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} note="Based on current stock" icon="$" />
        <StatCard label="Categories" value={categories.length} note="Unique product groups" icon="◇" />
      </section>

      <section className="table-card" aria-labelledby="product-list-title">
        <div className="table-toolbar">
          <div><span className="table-title" id="product-list-title">All products</span><span className="table-count">{items.length} total</span></div>
          <div className="toolbar-controls">
            <label className="search-wrap">
              <span aria-hidden="true">⌕</span>
              <input className="search-input" type="search" aria-label="Search products" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <select className="filter-select" aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
        {error && <Alert variant="danger" className="m-3" role="alert">{error}</Alert>}
        {deleteError && <Alert variant="danger" className="m-3" role="alert" dismissible onClose={() => setDeleteError("")}>{deleteError}</Alert>}
        {status === "loading" ? (
          <div className="loading-box" role="status"><Spinner animation="border" size="sm" className="me-2" />Loading products...</div>
        ) : status === "failed" ? (
          <div className="empty-state"><div className="empty-icon" aria-hidden="true">!</div><h3>We couldn&apos;t load your products</h3><p>{error}</p><Button className="btn-light-custom" onClick={() => dispatch(fetchProducts())}>Try again</Button></div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">▦</div>
            <h3>{items.length ? "No products match your search" : "Your catalog is ready"}</h3>
            <p>{items.length ? "Try a different name or category." : "Add your first product to start organizing your inventory."}</p>
            {items.length ? <Button className="btn-light-custom" onClick={() => { setQuery(""); setCategory(""); }}>Clear filters</Button> : <Link href="/products/new" className="btn btn-brand">Add your first product</Link>}
          </div>
        ) : (
          <div className="table-responsive">
            <Table className="product-table" hover>
              <thead><tr><th scope="col">Product</th><th scope="col">Category</th><th scope="col">Price</th><th scope="col">Stock</th><th scope="col">Status</th><th scope="col" className="text-end">Actions</th></tr></thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const productStatus = getStatus(product);
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="product-cell">
                          <span className="product-thumb" aria-hidden="true">{productEmojis[product.category] || "📦"}</span>
                          <span><Link className="product-name" href={`/products/${encodeURIComponent(product.id)}`}>{product.name}</Link><span className="product-sku">SKU {product.sku}</span></span>
                        </div>
                      </td>
                      <td><span className="category-chip">{product.category}</span></td>
                      <td className="fw-semibold text-dark">{Number(product.price).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td>{product.stock} units</td>
                      <td><span className={`status-pill ${productStatus.className}`}>{productStatus.label}</span></td>
                      <td>
                        <div className="row-actions">
                          <Link className="row-action" href={`/products/${encodeURIComponent(product.id)}`} aria-label={`View ${product.name}`} title="View">↗</Link>
                          <Link className="row-action" href={`/products/${encodeURIComponent(product.id)}/edit`} aria-label={`Edit ${product.name}`} title="Edit">✎</Link>
                          <button type="button" className="row-action danger" onClick={() => handleDelete(product)} disabled={mutationStatus === "loading"} aria-label={`Delete ${product.name}`} title="Delete">×</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
        <div className="table-footer"><span>Showing {filteredProducts.length} of {items.length} products</span><span>Inventory workspace</span></div>
      </section>
    </main>
  );
}