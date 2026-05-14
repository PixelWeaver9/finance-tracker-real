"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Wallet,
  Mail,
  Lock,
  User,
  UserPlus,
  Brain,
  Eye,
  EyeOff,
  TrendingUp,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Kunci scroll halaman saat register page aktif
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/login?registered=true");
      } else {
        setError(data.message || "Registrasi gagal.");
      }
    } catch {
      setError("Terjadi kesalahan server.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL: Hero Image ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
        {/* Background Image */}
        <Image
          src="/finance-hero.png"
          alt="Finance background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(49,46,129,0.60) 50%, rgba(15,23,42,0.80) 100%)",
          }}
        />

        {/* Left panel content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
          {/* Brand logo top-left */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl p-2.5"
              style={{ background: "rgba(99,102,241,0.9)" }}
            >
              <Wallet size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Finance Tracker
            </span>
          </div>

          {/* Center feature highlights */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-extrabold leading-tight mb-3">
                Mulai perjalanan
                <br />
                <span style={{ color: "#a5b4fc" }}>finansial Anda.</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-xs">
                Bergabunglah bersama ribuan pengguna yang sudah mengelola
                keuangan lebih cerdas dengan bantuan AI.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: <Brain size={18} />,
                  title: "AI Auto-Kategorisasi",
                  desc: "Transaksi terklasifikasi otomatis",
                },
                {
                  icon: <BarChart3 size={18} />,
                  title: "Analitik Real-time",
                  desc: "Dashboard laporan interaktif",
                },
                {
                  icon: <ShieldCheck size={18} />,
                  title: "Keamanan Tinggi",
                  desc: "Data dienkripsi end-to-end",
                },
              ].map((f) => (
                <div key={f.title} className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center rounded-lg p-2 flex-shrink-0"
                    style={{ background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.4)" }}
                  >
                    <span style={{ color: "#a5b4fc" }}>{f.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-white/55">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stat strip */}
          <div
            className="flex gap-6 rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {[
              { label: "Pengguna Aktif", value: "12K+" },
              { label: "Transaksi/Hari", value: "50K+" },
              { label: "Akurasi AI", value: "98%" },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center">
                <p className="text-2xl font-bold" style={{ color: "#a5b4fc" }}>
                  {s.value}
                </p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Register Form ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 relative h-full"
        style={{ background: "#0f172a" }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="w-full max-w-sm relative z-10">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-6">
            <div
              className="flex items-center justify-center rounded-xl p-2.5"
              style={{ background: "rgba(99,102,241,0.9)" }}
            >
              <Wallet size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Finance Tracker
            </span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1
              className="text-3xl font-extrabold mb-2"
              style={{ color: "#f1f5f9" }}
            >
              Buat akun baru ✨
            </h1>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Daftar gratis dan mulai kelola keuangan Anda.
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4 text-sm"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5",
              }}
            >
              <span>⚠</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#94a3b8" }}
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#4f5a6e" }}
                >
                  <User size={16} />
                </span>
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(99,102,241,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="Nama lengkap"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#94a3b8" }}
              >
                Email
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#4f5a6e" }}
                >
                  <Mail size={16} />
                </span>
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(99,102,241,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#94a3b8" }}
              >
                Password
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#4f5a6e" }}
                >
                  <Lock size={16} />
                </span>
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(99,102,241,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="Minimal 6 karakter"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#4f5a6e" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#94a3b8")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#4f5a6e")
                  }
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#94a3b8" }}
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#4f5a6e" }}
                >
                  <Lock size={16} />
                </span>
                <input
                  id="register-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(99,102,241,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="Ulangi password"
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all mt-2"
              style={{
                background: loading
                  ? "rgba(99,102,241,0.5)"
                  : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: loading
                  ? "none"
                  : "0 4px 24px rgba(99,102,241,0.35)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 32px rgba(99,102,241,0.55)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 24px rgba(99,102,241,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {loading ? (
                <div
                  className="w-5 h-5 rounded-full border-2 animate-spin"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                  }}
                />
              ) : (
                <>
                  <UserPlus size={17} />
                  Buat Akun
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <span className="text-xs" style={{ color: "#334155" }}>
              atau
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          </div>

          {/* Login link */}
          <p className="text-center text-sm" style={{ color: "#64748b" }}>
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold transition-colors"
              style={{ color: "#818cf8" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#a5b4fc")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#818cf8")
              }
            >
              Masuk
            </Link>
          </p>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <TrendingUp size={13} style={{ color: "#1e293b" }} />
            <p className="text-xs" style={{ color: "#1e293b" }}>
              Finance Tracker · AI Powered · 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
