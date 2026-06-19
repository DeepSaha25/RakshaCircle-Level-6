import React, { FormEvent, useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import DashboardLayout from '@/components/DashboardLayout';
import { saveProfile } from '@/services/rakshaMvp';
import { User, CheckCircle } from 'lucide-react';

export const Profile: React.FC = () => {
  const { walletAddress, profileName, setProfileName, triggerRefresh, isBusy, setIsBusy } = useWallet();
  const [nameInput, setNameInput] = useState(profileName);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setNameInput(profileName);
  }, [profileName]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      setError('Please connect your Freighter wallet in the header.');
      return;
    }

    setIsBusy(true);
    setSuccess(false);
    setError('');

    try {
      await saveProfile(walletAddress, nameInput.trim());
      setProfileName(nameInput.trim());
      setSuccess(true);
      triggerRefresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to save profile details.');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border-b border-zinc-900 pb-4">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">MODULE 01</span>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">Profile Setup</h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">Decentralized user profile identity management.</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white">
              <User className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white">Personal Information</h2>
              <p className="text-[11px] text-zinc-500">Only cryptographic proof is recorded on-chain.</p>
            </div>
          </div>

          {success && (
            <div className="rounded border border-zinc-800 bg-zinc-900/20 p-4 text-xs text-zinc-300 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-zinc-300" />
              <span>Identity profile registered and saved successfully.</span>
            </div>
          )}

          {error && (
            <div className="rounded border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-400 font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Full Name
              </label>
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="field-input text-xs"
                disabled={isBusy || !walletAddress}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Authorized Wallet Key
              </label>
              <input
                value={walletAddress || 'WALLET NOT CONNECTED'}
                className="field-input font-mono text-xs opacity-60 cursor-not-allowed"
                disabled
              />
            </div>

            <button
              type="submit"
              disabled={isBusy || !walletAddress}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-white px-4 text-xs font-semibold text-black hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              Save Identity Settings
            </button>
          </form>

          <p className="text-[10px] text-zinc-500 leading-normal">
            <strong>Privacy Note:</strong> Profile name is stored off-chain on secure database endpoints. No name records or private data are published directly to the public ledger logs.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Profile;
