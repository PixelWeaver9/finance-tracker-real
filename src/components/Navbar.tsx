"use client";

import { signOut, useSession } from "next-auth/react";
import { Wallet, LogOut, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3 animate-slide-in">
          <div className="bg-black p-2 md:p-2.5 rounded-lg shadow-lg shadow-black/20">
            <Wallet size={20} className="text-white md:w-6 md:h-6" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-black tracking-tight">Finance Tracker</h1>
            <p className="hidden md:block text-xs text-black/50 font-medium uppercase tracking-wider">Professional</p>
          </div>
        </div>

        {session?.user && (
          <>
            {/* Desktop User Info */}
            <div className="hidden md:flex items-center gap-3 animate-fade-in">
              <div className="flex items-center gap-3 bg-black/5 backdrop-blur-sm pl-3 pr-4 py-2 rounded-lg border border-black/10 hover:border-black/20 transition-all duration-200">
                <div className="bg-black/10 p-1.5 rounded-md">
                  <User size={14} className="text-black" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-black">{session.user?.name}</p>
                  <p className="text-xs text-black/50">{session.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-black/70 hover:text-black transition-all duration-200 bg-black/5 backdrop-blur-sm hover:bg-black/10 p-2.5 rounded-lg border border-black/10 hover:border-black/20"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-black/70 hover:text-black transition-all duration-200 bg-black/5 backdrop-blur-sm hover:bg-black/10 p-2 rounded-lg border border-black/10"
              >
                <Menu size={20} />
              </button>

              {/* Mobile Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl border border-black/10 overflow-hidden animate-fade-in">
                  <div className="p-4 bg-black/5 border-b border-black/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-black/10 p-1.5 rounded-md">
                        <User size={16} className="text-black" />
                      </div>
                      <p className="text-sm font-semibold text-black">{session.user?.name}</p>
                    </div>
                    <p className="text-xs text-black/50">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
