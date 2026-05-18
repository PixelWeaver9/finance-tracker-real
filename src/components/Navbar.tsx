"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Zap } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <>
      {/* Scan line effect */}
      <div className="scan-line" />
      
      <nav className="sticky top-0 z-40 border-b backdrop-blur-futuristic" 
           style={{ 
             background: 'oklch(12% 0.015 210 / 0.8)',
             borderColor: 'var(--border-default)'
           }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo - Futuristic */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Zap 
                size={24} 
                className="glow-cyan animate-pulse-glow" 
                style={{ color: 'var(--cyan-500)' }}
                strokeWidth={2.5}
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span style={{ color: 'var(--text-primary)' }}>FINANCE</span>
              <span style={{ color: 'var(--cyan-500)' }} className="font-mono-tabular">.AI</span>
            </h1>
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {session.user?.name}
              </span>
              <span className="text-xs font-mono-tabular" style={{ color: 'var(--text-tertiary)' }}>
                {session.user?.email}
              </span>
            </div>
            
            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              variant="outline"
              size="sm"
              className="gap-2 border hover:border-opacity-100 transition-all"
              style={{
                borderColor: 'var(--border-default)',
                background: 'transparent',
                color: 'var(--text-secondary)'
              }}
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
