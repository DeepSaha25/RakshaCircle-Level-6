import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  getEvents,
  getProfile,
  getTrustedContacts,
  TrustedContact,
  SosEvent,
} from '@/services/rakshaMvp';
import { connectFreighterWallet } from '@/services/freighter';

interface WalletContextType {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  profileName: string;
  setProfileName: (name: string) => void;
  contacts: TrustedContact[];
  setContacts: React.Dispatch<React.SetStateAction<TrustedContact[]>>;
  events: SosEvent[];
  setEvents: (events: SosEvent[]) => void;
  isBusy: boolean;
  setIsBusy: (busy: boolean) => void;
  statusMessage: string;
  setStatusMessage: (msg: string) => void;
  dashboardRefreshKey: number;
  triggerRefresh: () => void;
  loadAll: (wallet: string) => Promise<void>;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddressState] = useState<string>('');
  const [profileName, setProfileName] = useState<string>('');
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [events, setEvents] = useState<SosEvent[]>([]);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [statusMessage, setStatusMessageState] = useState<string>('Connect your wallet to begin.');
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState<number>(0);

  useEffect(() => {
    const savedWallet = localStorage.getItem('raksha_wallet');
    if (savedWallet) {
      setWalletAddressState(savedWallet);
      loadAll(savedWallet);
    }
  }, []);

  const setWalletAddress = (addr: string) => {
    setWalletAddressState(addr);
    if (addr) {
      localStorage.setItem('raksha_wallet', addr);
    } else {
      localStorage.removeItem('raksha_wallet');
    }
  };

  const setStatusMessage = (msg: string) => {
    setStatusMessageState(msg);
  };

  const triggerRefresh = () => {
    setDashboardRefreshKey((prev) => prev + 1);
  };

  const loadAll = async (wallet: string) => {
    setIsBusy(true);
    try {
      const [profileResult, contactsResult, eventsResult] = await Promise.allSettled([
        getProfile(wallet),
        getTrustedContacts(wallet),
        getEvents(wallet),
      ]);

      if (profileResult.status === 'fulfilled') {
        setProfileName(profileResult.value.profile?.name || '');
      }

      if (contactsResult.status === 'fulfilled' && contactsResult.value.contacts.length > 0) {
        setContacts(
          contactsResult.value.contacts.map((item, index) => ({
            ...item,
            id: item.id || `contact-${index + 1}`,
          }))
        );
      } else {
        setContacts([
          { name: '', walletAddress: '', phone: '', id: 'contact-1' },
          { name: '', walletAddress: '', phone: '', id: 'contact-2' },
        ]);
      }

      if (eventsResult.status === 'fulfilled') {
        setEvents(eventsResult.value.events);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBusy(false);
    }
  };

  const connectWallet = async () => {
    setIsBusy(true);
    try {
      setStatusMessage('Connecting to Freighter...');
      const publicKey = await connectFreighterWallet();
      setWalletAddress(publicKey);
      setStatusMessage(`Wallet connected: ${publicKey.slice(0, 6)}...${publicKey.slice(-6)}`);
      await loadAll(publicKey);
    } catch (err: any) {
      const errMsg = err?.message || 'Wallet connection failed.';
      setStatusMessage(`Connection error: ${errMsg}`);
    } finally {
      setIsBusy(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setProfileName('');
    setContacts([]);
    setEvents([]);
    setStatusMessage('Connect your wallet to begin.');
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        profileName,
        setProfileName,
        contacts,
        setContacts,
        events,
        setEvents,
        isBusy,
        setIsBusy,
        statusMessage,
        setStatusMessage,
        dashboardRefreshKey,
        triggerRefresh,
        loadAll,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
