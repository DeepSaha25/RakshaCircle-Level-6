import { useCallback, useEffect, useState } from 'react';
import { getProductionReadiness, ProductionReadinessResponse } from '@/services/rakshaMvp';
import { Activity, RefreshCw, CheckCircle, Shield } from 'lucide-react';

type Props = {
  walletAddress?: string;
  refreshToken?: number;
};

const initialState: ProductionReadinessResponse | null = null;

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export default function ProductionReadinessPanel({ walletAddress, refreshToken = 0 }: Props) {
  const [readiness, setReadiness] = useState<ProductionReadinessResponse | null>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [manualRefreshCounter, setManualRefreshCounter] = useState(0);

  const loadReadiness = useCallback(async () => {
    try {
      const result = await getProductionReadiness();
      setReadiness(result);
      setError('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load production readiness');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const refreshDashboard = async () => {
      setIsLoading(true);
      await loadReadiness();
    };

    refreshDashboard();
    const interval = window.setInterval(refreshDashboard, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [loadReadiness, manualRefreshCounter, refreshToken]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white">
            <Activity className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">Live Node Metrics</h2>
            <p className="text-[10px] text-zinc-500 font-mono">Indexing rates and security status updates.</p>
          </div>
        </div>
        <button
          onClick={() => setManualRefreshCounter((current) => current + 1)}
          disabled={isLoading}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-zinc-800 px-3 text-xs font-medium text-zinc-300 hover:border-zinc-500 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-400 font-mono">
          {error}
        </div>
      )}

      {readiness && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-4 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase block">Verified Users</span>
              <strong className="text-xl font-bold text-white mt-1 block">{formatNumber(readiness.metrics.verifiedUsers)}</strong>
              <small className="text-[9px] text-zinc-500 block mt-1">WALLET PROFILE INDEX</small>
            </div>
            <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-4 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase block">DAU (24H)</span>
              <strong className="text-xl font-bold text-white mt-1 block">{formatNumber(readiness.metrics.activeUsers24h)}</strong>
              <small className="text-[9px] text-zinc-500 block mt-1">ACTIVE WALLETS</small>
            </div>
            <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-4 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase block">30D RETENTION</span>
              <strong className="text-xl font-bold text-white mt-1 block">{readiness.metrics.retentionRate30d}%</strong>
              <small className="text-[9px] text-zinc-500 block mt-1">RETENTION FREQUENCY</small>
            </div>
            <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-4 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase block">TRANSACTIONS</span>
              <strong className="text-xl font-bold text-white mt-1 block">{formatNumber(readiness.metrics.transactions)}</strong>
              <small className="text-[9px] text-zinc-500 block mt-1">TOTAL ACTIONS LOGGED</small>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* System details */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white font-mono border-b border-zinc-900 pb-2">
                Operational Status
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">SYSTEM STATUS</span>
                  <span className="text-zinc-200">{readiness.monitoring.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">UPTIME</span>
                  <span className="text-zinc-200">{formatDuration(readiness.monitoring.uptimeSeconds)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">NODE RUNTIME</span>
                  <span className="text-zinc-200">{readiness.monitoring.nodeVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">HEAP MEMORY</span>
                  <span className="text-zinc-200">
                    {readiness.monitoring.memoryUsageMb.heapUsedMb} MB / {readiness.monitoring.memoryUsageMb.heapTotalMb} MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">SOROBAN LINK</span>
                  <span className="text-zinc-200">
                    {String(readiness.monitoring.soroban.status || readiness.monitoring.soroban.isConfigured || 'unknown')}
                  </span>
                </div>
              </div>
            </div>

            {/* Index summary */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white font-mono border-b border-zinc-900 pb-2">
                Data Index Database
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">PROFILES INDEXED</span>
                  <span className="text-zinc-200">{formatNumber(readiness.indexing.totalProfilesIndexed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">CONTACTS INDEXED</span>
                  <span className="text-zinc-200">{formatNumber(readiness.indexing.totalContactsIndexed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">EVENTS INDEXED</span>
                  <span className="text-zinc-200">{formatNumber(readiness.indexing.totalEventsIndexed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-505">TOTAL RECORDS</span>
                  <span className="text-zinc-200">{formatNumber(readiness.metrics.indexedRecords)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security checklist */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white font-mono border-b border-zinc-900 pb-2">
              Security Integrity Checklist
            </h3>
            <div className="space-y-3">
              {readiness.securityChecklist.map((item) => (
                <div key={item.item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-zinc-900 rounded p-3 bg-zinc-950">
                  <div>
                    <span className="font-semibold text-xs text-white block">{item.item}</span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">{item.evidence}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-semibold font-mono uppercase tracking-wider border ${
                    item.status === 'complete'
                      ? 'border-zinc-800 text-zinc-300'
                      : 'border-zinc-800 text-zinc-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}