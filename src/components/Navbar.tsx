"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Crown } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <nav 
      className="sticky top-0 z-40 border-b backdrop-blur-luxury" 
      style={{ 
        background: 'oklch(15% 0.008 30 / 0.95)',
        borderColor: 'var(--border-default)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Luxury with Crown */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Crown 
              size={24} 
              className="animate-subtle-glow" 
              style={{ color: 'var(--gold-500)' }}
              strokeWidth={2}
              fill="var(--gold-600)"
            />
          </div>
          <h1 className="text-xl font-serif font-semibold tracking-tight">
            <span style={{ color: 'var(--text-primary)' }}>Finance</span>
            <span style={{ color: 'var(--gold-500)' }} className="font-serif italic"> Royale</span>
          </h1>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {session.user?.name}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {session.user?.email}
            </span>
          </div>
          
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 rounded-lg border transition-all hover-gold text-sm font-medium flex items-center gap-2"
            style={{
              borderColor: 'var(--border-default)',
              background: 'transparent',
              color: 'var(--text-secondary)'
            }}
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
