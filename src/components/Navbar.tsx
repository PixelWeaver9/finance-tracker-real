"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo - Text Only, Clean */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Finance<span className="text-blue-600">.</span>
          </h1>
        </div>

        {session?.user && (
          <>
            {/* Desktop: Clean User Info */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{session.user?.name}</p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <span>Logout</span>
                <LogOut size={16} />
              </button>
            </div>

            {/* Mobile: Menu */}
            <div className="md:hidden relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                aria-label="Menu"
              >
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </button>

              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 bg-black/10 z-40"
                    onClick={() => setShowMenu(false)}
                  />
                  
                  <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate mt-1">{session.user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        signOut({ callbackUrl: "/login" });
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
