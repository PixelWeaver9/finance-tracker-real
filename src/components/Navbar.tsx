"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Wallet } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <nav
      className="sticky top-0 z-40"
      style={{
        background: '#ffffff',
        borderBottom: '2px solid var(--ink)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center"
            style={{
              width: 38,
              height: 38,
              background: 'var(--accent-500)',
              border: '2px solid var(--ink)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Wallet size={20} strokeWidth={2.5} style={{ color: 'var(--ink)' }} />
          </div>
          <h1 style={{
            fontSize: 'var(--text-lg)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 1,
          }}>
            <span style={{ color: 'var(--text-primary)' }}>LEDGR</span>
            <span style={{ color: 'var(--error-red)' }}>*</span>
          </h1>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-body-emphasis" style={{ fontSize: 'var(--text-sm)' }}>
              {session.user?.name}
            </span>
            <span className="text-caption">
              {session.user?.email}
            </span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-3.5 py-2 border transition-all hover-scale flex items-center gap-2 uppercase"
            style={{
              borderColor: 'var(--ink)',
              borderWidth: 2,
              background: '#ffffff',
              boxShadow: 'var(--shadow-sm)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-wide)',
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
