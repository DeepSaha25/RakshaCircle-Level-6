import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import DashboardLayout from '@/components/DashboardLayout';
import { saveTrustedContacts, TrustedContact } from '@/services/rakshaMvp';
import { Users, Plus, Save, CheckCircle } from 'lucide-react';

const EMPTY_CONTACT: TrustedContact = { name: '', walletAddress: '', phone: '' };

function isValidStellarWallet(wallet: string) {
  return /^G[A-Z2-7]{55}$/.test(wallet.trim().toUpperCase());
}

export const Contacts: React.FC = () => {
  const { walletAddress, contacts, setContacts, triggerRefresh, isBusy, setIsBusy } = useWallet();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleContactChange = (index: number, key: keyof TrustedContact, value: string) => {
    setContacts((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    );
  };

  const handleAddContactRow = () => {
    setContacts((current) => [...current, { ...EMPTY_CONTACT, id: `contact-${current.length + 1}` }]);
  };

  const handleSaveContacts = async () => {
    if (!walletAddress) {
      setError('Please connect your Freighter wallet first.');
      return;
    }

    setIsBusy(true);
    setSuccess(false);
    setError('');

    try {
      const cleaned = contacts.filter((item) => item.name?.trim());
      
      const invalidWalletContact = cleaned.find(
        (item) => item.walletAddress?.trim() && !isValidStellarWallet(item.walletAddress)
      );
      if (invalidWalletContact) {
        throw new Error(
          `Invalid Stellar address for "${invalidWalletContact.name}". Wallet addresses must start with 'G' and contain 56 characters.`
        );
      }

      await saveTrustedContacts(walletAddress, cleaned);
      setSuccess(true);
      triggerRefresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to save trusted circle details.');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-zinc-900 pb-4">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">MODULE 02</span>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">Trusted Circle</h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">Emergency contacts circle authorization database.</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-white">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white">Circle Contacts</h2>
                <p className="text-[11px] text-zinc-500">Designated responders receive emergency broadcast alerts.</p>
              </div>
            </div>
            <button
              onClick={handleAddContactRow}
              disabled={isBusy || !walletAddress}
              className="inline-flex h-8 items-center gap-1.5 rounded border border-zinc-850 bg-zinc-900 px-3 text-xs text-zinc-300 hover:border-zinc-550 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Contact Row
            </button>
          </div>

          {success && (
            <div className="rounded border border-zinc-850 bg-zinc-900/20 p-4 text-xs text-zinc-300 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-zinc-300" />
              <span>Emergency contacts list updated successfully.</span>
            </div>
          )}

          {error && (
            <div className="rounded border border-zinc-850 bg-zinc-900 p-4 text-xs text-zinc-450 font-mono">
              {error}
            </div>
          )}

          {!walletAddress ? (
            <div className="rounded border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-500 font-mono">
              WALLET CONNECTION REQUIRED
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                {contacts.map((contact, index) => (
                  <div key={contact.id || index} className="grid gap-2 grid-cols-1 sm:grid-cols-3 border border-zinc-900 rounded p-3 bg-zinc-950">
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">Contact Name</span>
                      <input
                        value={contact.name || ''}
                        onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                        placeholder="John Doe"
                        className="field-input text-xs"
                        disabled={isBusy}
                      />
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">Stellar Wallet</span>
                      <input
                        value={contact.walletAddress || ''}
                        onChange={(e) => handleContactChange(index, 'walletAddress', e.target.value)}
                        placeholder="G..."
                        className="field-input font-mono text-xs"
                        disabled={isBusy}
                      />
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">Phone Number</span>
                      <input
                        value={contact.phone || ''}
                        onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                        placeholder="+919999999999"
                        className="field-input text-xs"
                        disabled={isBusy}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSaveContacts}
                disabled={isBusy || contacts.length === 0}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-white px-4 text-xs font-semibold text-black hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                <Save className="h-4 w-4" />
                Save Contacts Circle
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Contacts;
