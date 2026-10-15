import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import AppProviders from "./providers";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "Stockroom — Product management",
  description: "A simple, thoughtful workspace to manage your product catalog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Suspense fallback={<div className="app-shell" aria-busy="true" />}>
          <AppProviders><AppShell>{children}</AppShell></AppProviders>
        </Suspense>
      </body>
    </html>
  );
}