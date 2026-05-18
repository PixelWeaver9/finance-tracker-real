"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Crown, ArrowRight } from "lucide-react";

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
      className="h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at top right, oklch(70% 0.12 85 / 0.1), transparent 50%)'
        }}
      />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown 
              size={40} 
              className="animate-subtle-glow" 
              style={{ color: 'var(--gold-500)' }}
              strokeWidth={1.5}
              fill="var(--gold-600)"
            />
          </div>
          <h1 className="text-4xl font-serif font-semibold tracking-tight mb-2">
            <span style={{ color: 'var(--text-primary)' }}>Finance</span>
            <span style={{ color: 'var(--gold-500)' }} className="font-serif italic"> Royale</span>
          </h1>
          <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
            Welcome back to your financial kingdom
          </p>
        </div>

        {/* Card */}
        <div 
          className="card-luxury accent-gold animate-slide-up animate-delay-200"
        >
          <div className="p-8">
            {/* Error */}
            {error && (
              <div 
                className="mb-6 p-4 rounded-lg text-sm font-medium animate-scale-in"
                style={{
                  background: 'oklch(60% 0.18 25 / 0.1)',
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
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none"
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
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg border transition-all focus:outline-none"
                    style={{
                      background: 'var(--bg-tertiary)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)',
                    }}
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
                className="w-full py-3.5 rounded-lg text-sm font-semibold transition-all hover-scale shadow-gold flex items-center justify-center gap-2 mt-6"
                style={{
                  background: 'var(--gradient-gold)',
                  color: 'var(--bg-primary)',
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
            <div className="divider-luxury my-6" />

            {/* Register Link */}
            <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold transition-all hover:underline"
                style={{ color: 'var(--gold-500)' }}
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p 
          className="text-center text-xs font-medium mt-8 animate-fade-in animate-delay-400"
          style={{ color: 'var(--text-disabled)' }}
        >
          Finance Royale · Premium Financial Management
        </p>
      </div>
    </div>
  );
}
