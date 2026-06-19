import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ProductionReadinessPanel from '@/components/ProductionReadinessPanel';
import { useWallet } from '@/context/WalletContext';

export const Monitoring: React.FC = () => {
  const { walletAddress, dashboardRefreshKey } = useWallet();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-4">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">MODULE 04</span>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">System Monitoring</h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">Live health checking parameters and indexing statuses.</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
          <ProductionReadinessPanel walletAddress={walletAddress} refreshToken={dashboardRefreshKey} />
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Monitoring;
