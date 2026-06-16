"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Wallet, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
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
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Server error occurred");
    }
    setLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center px-4 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Subtle acid overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at top left, rgba(203,233,53,0.18), transparent 55%)'
        }}
      />
      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.5 }} />

      <div className="w-full max-w-md relative z-10 animate-fade-in max-h-screen overflow-y-auto py-4">
        {/* Logo */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="flex items-center justify-center mb-4">
            <div
              className="flex items-center justify-center"
              style={{ width: 58, height: 58, background: 'var(--accent-500)', border: '2.5px solid var(--ink)', boxShadow: 'var(--shadow-accent)' }}
            >
              <Wallet size={28} strokeWidth={2.5} style={{ color: 'var(--ink)' }} />
            </div>
          </div>
          <h1 style={{
            fontSize: 'var(--text-3xl)',
            letterSpacing: 'var(--tracking-tighter)',
            lineHeight: 'var(--leading-tight)',
            marginBottom: '0.5rem'
          }}>
            <span style={{ color: 'var(--text-primary)' }}>LEDGR</span>
            <span style={{ color: 'var(--error-red)' }}>*</span>
          </h1>
          <p className="text-caption" style={{ fontWeight: 500 }}>
            Create your account to get started
          </p>
        </div>

        {/* Card */}
        <div
          className="card accent-bar animate-slide-up animate-delay-200"
        >
          <div className="p-8">
            {/* Error */}
            {error && (
              <div
                className="mb-6 p-4 text-sm font-semibold animate-scale-in"
                style={{
                  background: '#fdecea',
                  border: '2px solid var(--ink)',
                  borderLeft: '6px solid var(--error-red)',
                  color: 'var(--ink)',
                }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-label block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field px-4 py-3"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-label block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field px-4 py-3"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-label block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="field px-4 py-3 pr-12"
                    placeholder="Min. 6 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-all hover:scale-110"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-label block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="field px-4 py-3"
                  placeholder="Repeat password"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 transition-all hover-scale flex items-center justify-center gap-2 mt-6 uppercase"
                style={{
                  background: 'var(--accent-500)',
                  color: 'var(--ink)',
                  border: '2px solid var(--ink)',
                  boxShadow: 'var(--shadow-accent)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  letterSpacing: 'var(--tracking-wide)'
                }}
              >
                {loading ? (
                  <span>Creating account...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6" />

            {/* Login Link */}
            <p className="text-center text-caption">
              Already have an account?{" "}
              <Link
                href="/login"
                className="transition-all hover:underline uppercase"
                style={{
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-micro mt-8 animate-fade-in animate-delay-400">
          LEDGR · AI-Powered Money Management
        </p>
      </div>
    </div>
  );
}
