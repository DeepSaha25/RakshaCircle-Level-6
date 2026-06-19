import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { Shield, User, Users, AlertOctagon, Activity, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Shield },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/contacts', label: 'Trusted Circle', icon: Users },
  { path: '/sos', label: 'SOS Trigger', icon: AlertOctagon },
  { path: '/monitoring', label: 'Monitoring', icon: Activity },
];

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { walletAddress, connectWallet, disconnectWallet, isBusy } = useWallet();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col antialiased">
      {/* Global loading spinner linked to wallet context */}
      {isBusy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
        </div>
      )}

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-white text-black font-bold">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono tracking-widest text-sm font-semibold uppercase text-white block">
                  RAKSHA // CIRCLE
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block -mt-1 font-mono">
                  Decentralized Personal Safety
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition duration-150 ease-in-out ${
                      active
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Wallet Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {walletAddress ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-300">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="p-2 rounded-md border border-zinc-800 text-zinc-400 hover:text-white transition"
                    title="Disconnect Wallet"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded bg-white px-4 text-xs font-semibold text-black hover:bg-zinc-200 transition"
                >
                  Connect Wallet
                </button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="flex md:hidden items-center gap-2">
              {!walletAddress && (
                <button
                  onClick={connectWallet}
                  className="inline-flex h-8 items-center justify-center rounded bg-white px-3 text-[11px] font-semibold text-black hover:bg-zinc-200 transition"
                >
                  Connect
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded border border-zinc-800 text-zinc-400"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-900 bg-zinc-950 p-4 space-y-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                    active
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            {walletAddress && (
              <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-400">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </span>
                <button
                  onClick={() => {
                    disconnectWallet();
                    setMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Disconnect
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        RAKSHA // CIRCLE &copy; 2026 // ALL SECURE ON STELLAR TESTNET
      </footer>
    </div>
  );
};
export default DashboardLayout;
