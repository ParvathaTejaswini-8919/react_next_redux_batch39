export default function SettingsPage() {
  return (
    <main className="page-content">
      <div className="page-heading">
        <div><div className="eyebrow">Workspace</div><h1>Settings</h1><p>Local development configuration for this product workspace.</p></div>
      </div>
      <section className="form-card">
        <h2 className="form-section-title">Product API</h2>
        <p className="detail-meta mb-3">Products are stored in json-server during local development. Set <code>NEXT_PUBLIC_API_URL</code> to change the API origin.</p>
        <div className="mb-3">
          <div className="detail-stat-label">API endpoint</div>
          <div className="detail-stat-value fs-6"><code>{process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/products</code></div>
        </div>
        <div>
          <div className="detail-stat-label">To run the local API</div>
          <div className="detail-stat-value fs-6"><code>npm run server</code></div>
        </div>
      </section>
    </main>
  );
}