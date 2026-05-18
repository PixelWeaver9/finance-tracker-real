"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Zap, ArrowRight, UserPlus } from "lucide-react";

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
      className="h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Scan line effect */}
      <div className="scan-line" />
      
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" style={{ opacity: 0.3 }} />
      
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float animate-float-delay-${i % 3 + 1}`}
            style={{
              background: 'var(--cyan-500)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10 animate-page-transition max-h-screen overflow-y-auto py-4">
        {/* Logo */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="flex items-center justify-center gap-2 mb-3">
            <UserPlus 
              size={32} 
              className="glow-cyan animate-pulse-glow animate-rotate-in" 
              style={{ color: 'var(--cyan-500)' }}
              strokeWidth={2.5}
            />
            <h1 className="text-4xl font-bold tracking-tight">
              <span style={{ color: 'var(--text-primary)' }}>FINANCE</span>
              <span style={{ color: 'var(--cyan-500)' }} className="font-mono-tabular">.AI</span>
            </h1>
          </div>
          <p className="text-sm font-medium tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
            CREATE YOUR ACCOUNT
          </p>
        </div>

        {/* Card */}
        <div 
          className="rounded-lg border p-8 animate-slide-in-up animate-delay-100 hover-lift-glow"
          style={{
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-default)',
          }}
        >
          {/* Error */}
          {error && (
            <div 
              className="mb-6 p-3 rounded-lg text-sm font-medium animate-slide-in-bottom"
              style={{
                background: 'var(--neon-red-dim)',
                borderColor: 'var(--neon-red)',
                color: 'var(--neon-red)',
                border: '1px solid',
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="animate-slide-in-up animate-delay-150">
              <label 
                className="block text-xs font-semibold tracking-wider mb-2"
                style={{ color: 'var(--text-tertiary)' }}
              >
                FULL NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div className="animate-slide-in-up animate-delay-200">
              <label 
                className="block text-xs font-semibold tracking-wider mb-2"
                style={{ color: 'var(--text-tertiary)' }}
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div className="animate-slide-in-up animate-delay-250">
              <label 
                className="block text-xs font-semibold tracking-wider mb-2"
                style={{ color: 'var(--text-tertiary)' }}
              >
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 border rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Min. 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-all hover:scale-110"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="animate-slide-in-up animate-delay-300">
              <label 
                className="block text-xs font-semibold tracking-wider mb-2"
                style={{ color: 'var(--text-tertiary)' }}
              >
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2"
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
                placeholder="Repeat password"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-semibold tracking-wide transition-all hover-scale glow-cyan animate-slide-in-up animate-delay-350 flex items-center justify-center gap-2 mt-6"
              style={{
                background: 'var(--cyan-600)',
                color: 'var(--bg-primary)',
                border: '1px solid var(--cyan-500)',
              }}
            >
              {loading ? (
                <>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-typing" style={{ background: 'var(--bg-primary)' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-typing animate-typing-delay-1" style={{ background: 'var(--bg-primary)' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-typing animate-typing-delay-2" style={{ background: 'var(--bg-primary)' }} />
                  </div>
                  <span>CREATING ACCOUNT</span>
                </>
              ) : (
                <>
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 animate-fade-in animate-delay-400">
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            <span className="text-xs font-medium tracking-wider" style={{ color: 'var(--text-disabled)' }}>OR</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm animate-fade-in animate-delay-450" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold transition-all hover:underline"
              style={{ color: 'var(--cyan-500)' }}
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p 
          className="text-center text-xs font-medium tracking-wider mt-8 animate-fade-in animate-delay-500"
          style={{ color: 'var(--text-disabled)' }}
        >
          FINANCE TRACKER · 2026
        </p>
      </div>
    </div>
  );
}
