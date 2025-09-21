// src/pages/VerifyEmailPage.tsx
import { useEffect, useMemo, useState } from "react";

const ID_BASE =
  import.meta.env.VITE_ID_BASE ??
  import.meta.env.VITE_API_BASE ??                // fallback ако имаш старо име
  "http://127.0.0.1:18082";                       // локален дефолт за identity

export default function VerifyEmailPage() {
  const url = new URL(window.location.href);
  const tokenFromUrl = url.searchParams.get("token") ?? "";
  const [token, setToken]   = useState(tokenFromUrl);
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle"|"verifying"|"ok"|"error"|"resent">("idle");
  const [message, setMessage] = useState("");

  // helper за четене на (евентуално) JSON грешка без да чупи при празно тяло
  const parseMaybeJson = async (res: Response) => {
    try { return await res.clone().json(); } catch { return undefined; }
  };

  useEffect(() => {
    if (!tokenFromUrl) return;
    setStatus("verifying");
    fetch(`${ID_BASE}/api/v1/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: tokenFromUrl }),
    })
      .then(async (r) => {
        if (r.ok) {
          setStatus("ok");
          setMessage("Имейлът е потвърден успешно.");
        } else {
          const body = await parseMaybeJson(r);
          throw new Error(body?.message || "Невалиден или изтекъл код.");
        }
      })
      .catch((e: any) => { setStatus("error"); setMessage(e.message || "Грешка."); });
  }, [tokenFromUrl]);

  const canResend = useMemo(() => email.includes("@"), [email]);

  const onSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setStatus("verifying");
    try {
      const r = await fetch(`${ID_BASE}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!r.ok) {
        const body = await parseMaybeJson(r);
        throw new Error(body?.message || "Невалиден или изтекъл код.");
      }
      setStatus("ok");
      setMessage("Имейлът е потвърден успешно.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message || "Грешка.");
    }
  };

  const resend = async () => {
    if (!canResend) return;
    setStatus("verifying");
    try {
      const r = await fetch(`${ID_BASE}/api/v1/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error("Неуспешно изпращане. Опитай пак след малко.");
      setStatus("resent");
      setMessage("Изпратихме нов имейл за потвърждение.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message || "Грешка.");
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui, Roboto, Arial" }}>
      <h1>Потвърди имейла си</h1>

      {status === "verifying" && <p>Потвърждаваме...</p>}
      {status !== "idle" && status !== "verifying" && <p>{message}</p>}

      {(status === "idle" || status === "error") && !tokenFromUrl && (
        <form onSubmit={onSubmitCode} style={{ marginTop: 16 }}>
          <label>Код от имейла</label>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="въведи кода тук"
            style={{ display: "block", width: "100%", padding: "10px", marginTop: 6 }}
          />
          <button style={{ marginTop: 12, padding: "10px 16px" }} type="submit">Потвърди</button>
        </form>
      )}

      {(status === "error" || status === "idle") && (
        <div style={{ marginTop: 24 }}>
          <label>Имейл за повторно изпращане</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ display: "block", width: "100%", padding: "10px", marginTop: 6 }}
          />
          <button style={{ marginTop: 12, padding: "10px 16px" }} onClick={resend} disabled={!canResend}>
            Изпрати нов имейл
          </button>
        </div>
      )}

      {status === "ok" && (
        <div style={{ marginTop: 24 }}>
          <a href="/login">Към вход</a>
        </div>
      )}
    </div>
  );
}
