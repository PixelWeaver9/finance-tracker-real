"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Wallet, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
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
          background: 'radial-gradient(circle at top right, rgba(203,233,53,0.18), transparent 55%)'
        }}
      />
      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.5 }} />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
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
            Welcome back — sign in to continue
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
                className="mb-6 p-4 rounded-lg text-sm font-medium animate-scale-in"
                style={{
                  background: 'oklch(65% 0.19 18 / 0.12)',
                  borderLeft: '3px solid var(--error-red)',
                  color: 'var(--error-red)',
                }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    placeholder="Enter your password"
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
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6" />

            {/* Register Link */}
            <p className="text-center text-caption">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="transition-all hover:underline uppercase"
                style={{
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  textDecoration: 'underline'
                }}
              >
                Create account
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
