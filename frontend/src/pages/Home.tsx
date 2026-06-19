import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Shield, User, Users, AlertOctagon, Activity, Check, X, ExternalLink } from 'lucide-react';

export const Home: React.FC = () => {
  const { walletAddress, profileName, contacts } = useWallet();

  const activeContactsCount = React.useMemo(() => {
    return contacts.filter((c) => c.name?.trim() && c.walletAddress?.trim()).length;
  }, [contacts]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Banner Section */}
        <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 rounded-lg relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase block mb-2">
              STELLAR EMERGENCY DISPATCH
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-normal text-white mb-3">
              RakshaCircle: Decentralized Circle of Safety
            </h1>
            <p className="text-sm leading-relaxed text-zinc-400">
              Protect yourself and late-night commuters by establishing your trusted personal safety circle. Anchor verification hashes securely on the Stellar network, broadcast alert messages to designated contact addresses, and coordinate fast emergency responses.
            </p>
          </div>
        </div>

        {/* Overview Stats & Checklist */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Status Panel */}
          <div className="md:col-span-1 border border-zinc-800 bg-zinc-950 p-5 rounded-lg space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-900 pb-2">
              Setup Progress
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">1. Freighter Connection</span>
                {walletAddress ? (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <Check className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-600">
                    <X className="h-3 w-3" />
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">2. Profile Settings</span>
                {profileName ? (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <Check className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-600">
                    <X className="h-3 w-3" />
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">3. Circle Verification ({activeContactsCount}/2)</span>
                {activeContactsCount >= 1 ? (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <Check className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-600">
                    <X className="h-3 w-3" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Nav Modules */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-900 pb-2">
              Action Modules
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              
              <Link to="/profile" className="group rounded-lg border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-500 transition duration-150 ease-in-out">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white mb-3 group-hover:border-zinc-500 transition">
                  <User className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-1">
                  1. Setup Profile &rarr;
                </h3>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Configure your identity profile. Profile data is kept safe, and off-chain hashes verify safety triggers.
                </p>
              </Link>

              <Link to="/contacts" className="group rounded-lg border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-500 transition duration-150 ease-in-out">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white mb-3 group-hover:border-zinc-500 transition">
                  <Users className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-1">
                  2. Trusted Circle &rarr;
                </h3>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  List names, phone numbers, and keys for emergency contacts to receive alerts.
                </p>
              </Link>

              <Link to="/sos" className="group rounded-lg border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-500 transition duration-150 ease-in-out">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white mb-3 group-hover:border-zinc-500 transition">
                  <AlertOctagon className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-1">
                  3. Emergency Dispatch &rarr;
                </h3>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Broadcast high-priority distress alerts to your trusted circle in real-time.
                </p>
              </Link>

              <Link to="/monitoring" className="group rounded-lg border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-500 transition duration-150 ease-in-out">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white mb-3 group-hover:border-zinc-500 transition">
                  <Activity className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-1">
                  4. System Monitoring &rarr;
                </h3>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Verify the testnet API connection status, indexing logs, and production checklist items.
                </p>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Home;
