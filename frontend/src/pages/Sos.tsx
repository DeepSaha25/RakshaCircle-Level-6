import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import DashboardLayout from '@/components/DashboardLayout';
import { triggerSos, getEvents, acknowledgeEvent } from '@/services/rakshaMvp';
import { AlertOctagon, CheckCircle, Volume2, RefreshCw, ExternalLink, PhoneCall } from 'lucide-react';

export const Sos: React.FC = () => {
  const { walletAddress, events, setEvents, triggerRefresh, isBusy, setIsBusy, setStatusMessage } = useWallet();
  const [eventType, setEventType] = useState('SOS');
  const [locationHint, setLocationHint] = useState('');
  const [contextText, setContextText] = useState('');
  const [ackWallet, setAckWallet] = useState(walletAddress);
  const [ackNote, setAckNote] = useState('I received your alert and I am on the way.');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (walletAddress && !ackWallet) {
      setAckWallet(walletAddress);
    }
  }, [walletAddress, ackWallet]);

  const handleTriggerSos = async () => {
    if (!walletAddress) {
      setError('Please connect your Freighter wallet in the header.');
      return;
    }

    setIsBusy(true);
    setSuccess(false);
    setError('');

    try {
      await triggerSos({
        walletAddress,
        eventType,
        contextText,
        locationHint,
      });

      const latest = await getEvents(walletAddress);
      setEvents(latest.events);
      setSuccess(true);
      setContextText('');
      setLocationHint('');
      triggerRefresh();
      
      if (navigator.vibrate) {
        navigator.vibrate([250, 120, 250]);
      }
    } catch (err: any) {
      setError(err?.message || 'Emergency SOS trigger dispatch failed.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleAcknowledge = async (eventId: string) => {
    if (!ackWallet.trim()) {
      setError('Enter a contact wallet to submit acknowledgment.');
      return;
    }

    setIsBusy(true);
    setError('');

    try {
      await acknowledgeEvent(eventId, ackWallet, ackNote);
      const latest = await getEvents(walletAddress);
      setEvents(latest.events);
      setStatusMessage('Acknowledgment added successfully.');
      triggerRefresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to submit acknowledgment.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleRefreshHistory = async () => {
    if (!walletAddress) return;
    setIsBusy(true);
    setError('');

    try {
      const result = await getEvents(walletAddress);
      setEvents(result.events);
    } catch (err: any) {
      setError(err?.message || 'Failed to sync events.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleTestAlertTone = () => {
    const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextCtor) {
      setError('Audio context is not supported in this browser.');
      return;
    }

    const audioContext = new AudioContextCtor();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.value = 1040;
    gainNode.gain.value = 0.12;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    window.setTimeout(() => {
      oscillator.stop();
      void audioContext.close();
    }, 600);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-4">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">MODULE 03</span>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">SOS dispatcher</h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">Real-time emergency alert broadcaster on Stellar.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          {/* Column 1: SOS Trigger */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white">
                <AlertOctagon className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white">Trigger Emergency</h2>
                <p className="text-[11px] text-zinc-500">Broadcasting will log immediate event hashes on the ledger.</p>
              </div>
            </div>

            {success && (
              <div className="rounded border border-zinc-800 bg-zinc-900/20 p-4 text-xs text-zinc-300 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-zinc-300" />
                <span>SOS Alert successfully sent and dispatched. Responders notified.</span>
              </div>
            )}

            {error && (
              <div className="rounded border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-400 font-mono">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Event Classification
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="field-input text-xs"
                    disabled={isBusy}
                  >
                    <option value="SOS">SOS Alert</option>
                    <option value="MEDICAL">Medical Emergency</option>
                    <option value="ROUTE_RISK">Route Risk</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Location Landmark Hint
                  </label>
                  <input
                    value={locationHint}
                    onChange={(e) => setLocationHint(e.target.value)}
                    placeholder="Near Central Square Metro"
                    className="field-input text-xs"
                    disabled={isBusy}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Off-Chain Context Note (Optional)
                </label>
                <textarea
                  value={contextText}
                  onChange={(e) => setContextText(e.target.value)}
                  placeholder="Provide context for dispatch log hashing..."
                  className="w-full min-h-[80px] rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-zinc-400 focus:outline-none placeholder:text-zinc-500 transition"
                  disabled={isBusy}
                />
              </div>

              <button
                onClick={handleTriggerSos}
                disabled={isBusy || !walletAddress}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded bg-white px-4 text-sm font-semibold text-black hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                Trigger SOS Alert
              </button>

              <div className="pt-4 border-t border-zinc-900 grid gap-2 grid-cols-2">
                <button
                  onClick={handleTestAlertTone}
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-300 hover:border-zinc-500 transition"
                >
                  <Volume2 className="h-4 w-4" />
                  Test Alarm Sound
                </button>
                <a
                  href="tel:112"
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-300 hover:border-zinc-500 transition"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  Call Emergency (112)
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Alert History & Acknowledger */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Active Alerts Log</h3>
              </div>
              <button
                onClick={handleRefreshHistory}
                disabled={isBusy || !walletAddress}
                className="p-2 rounded border border-zinc-800 text-zinc-400 hover:text-white transition"
                title="Refresh logs"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isBusy ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Ack Responder Wallet Address
                </label>
                <input
                  value={ackWallet}
                  onChange={(e) => setAckWallet(e.target.value)}
                  placeholder="G..."
                  className="field-input font-mono text-[10px]"
                  disabled={isBusy}
                />
              </div>

              <div>
                <label className="block mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Acknowledgment Dispatch Memo
                </label>
                <input
                  value={ackNote}
                  onChange={(e) => setAckNote(e.target.value)}
                  placeholder="Acknowledgment message details..."
                  className="field-input text-xs"
                  disabled={isBusy}
                />
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {events.length === 0 ? (
                  <p className="text-xs text-zinc-500 font-mono text-center py-6">NO SOS EVENTS RECORDED FOR ACCOUNT</p>
                ) : (
                  events.map((item) => (
                    <div key={item.id} className="rounded border border-zinc-900 bg-zinc-950 p-3 text-xs space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white uppercase font-mono text-[10px]">{item.eventType}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-normal font-mono">
                        Hash: {item.contextHash.slice(0, 16)}...
                      </p>
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[10px] text-zinc-500">Acks: {item.acknowledgments?.length || 0}</span>
                        <button
                          onClick={() => handleAcknowledge(item.id)}
                          disabled={isBusy}
                          className="inline-flex h-6 items-center rounded border border-zinc-800 bg-zinc-900 px-2 text-[10px] font-medium text-zinc-300 hover:border-zinc-500 transition"
                        >
                          Acknowledge
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Sos;
