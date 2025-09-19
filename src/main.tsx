import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./auth/AuthContext";
import "./i18n";
import "./index.css";

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [err, setErr] = React.useState<Error | null>(null);
  React.useEffect(() => {
    const onErr = (e: ErrorEvent) => setErr(e.error ?? new Error(String(e.message)));
    const onRej = (e: PromiseRejectionEvent) =>
      setErr(e.reason instanceof Error ? e.reason : new Error(String(e.reason)));
    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRej);
    return () => {
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
    };
  }, []);
  if (err) {
    return (
      <pre style={{ padding: 16, color: "#b91c1c", background: "#fef2f2", whiteSpace: "pre-wrap" }}>
        {String(err.stack || err.message || err)}
      </pre>
    );
  }
  return <>{children}</>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
