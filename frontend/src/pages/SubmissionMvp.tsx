import { FormEvent, useMemo, useState } from 'react';
import {
  acknowledgeEvent,
  getEvents,
  getProfile,
  getTrustedContacts,
  saveProfile,
  saveTrustedContacts,
  triggerSos,
  TrustedContact,
  SosEvent,
} from '@/services/rakshaMvp';
import './SubmissionMvp.css';

const EMPTY_CONTACT: TrustedContact = { name: '', walletAddress: '', phone: '' };

function shortenWallet(walletAddress: string) {
  if (walletAddress.length < 12) {
    return walletAddress;
  }

  return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}`;
}

const SubmissionMvp = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [profileName, setProfileName] = useState('');
  const [contacts, setContacts] = useState<TrustedContact[]>([
    { ...EMPTY_CONTACT, id: 'contact-1' },
    { ...EMPTY_CONTACT, id: 'contact-2' },
  ]);
  const [eventType, setEventType] = useState('SOS');
  const [contextText, setContextText] = useState('');
  const [locationHint, setLocationHint] = useState('');
  const [events, setEvents] = useState<SosEvent[]>([]);
  const [ackWallet, setAckWallet] = useState('');
  const [ackNote, setAckNote] = useState('I received your alert and I am on the way.');
  const [statusMessage, setStatusMessage] = useState('Connect wallet to begin.');
  const [isBusy, setIsBusy] = useState(false);

  const canUseApi = useMemo(() => walletAddress.trim().length > 0, [walletAddress]);

  const setMessage = (message: string, isError = false) => {
    setStatusMessage(isError ? `Error: ${message}` : message);
  };

  const withBusy = async (task: () => Promise<void>) => {
    setIsBusy(true);
    try {
      await task();
    } finally {
      setIsBusy(false);
    }
  };

  const handleConnectWallet = async () => {
    await withBusy(async () => {
      if (window.freighterApi?.getPublicKey) {
        try {
          const publicKey = await window.freighterApi.getPublicKey();
          setWalletAddress(publicKey);
          setAckWallet(publicKey);
          setMessage(`Wallet connected: ${shortenWallet(publicKey)}`);
          await loadAll(publicKey);
          return;
        } catch {
          setMessage('Freighter was detected but the connection was rejected.', true);
          return;
        }
      }

      const demoWallet = 'GDEMOUSER1234567890SUBMISSIONREADYWALLET';
      setWalletAddress(demoWallet);
      setAckWallet(demoWallet);
      setMessage('Freighter not found, connected with demo wallet for submission testing.');
      await loadAll(demoWallet);
    });
  };

  const loadAll = async (wallet: string) => {
    const [profileResult, contactsResult, eventsResult] = await Promise.allSettled([
      getProfile(wallet),
      getTrustedContacts(wallet),
      getEvents(wallet),
    ]);

    if (profileResult.status === 'fulfilled') {
      setProfileName(profileResult.value.profile.name);
    }

    if (contactsResult.status === 'fulfilled' && contactsResult.value.contacts.length > 0) {
      setContacts(
        contactsResult.value.contacts.map((item, index) => ({
          ...item,
          id: item.id || `contact-${index + 1}`,
        }))
      );
    }

    if (eventsResult.status === 'fulfilled') {
      setEvents(eventsResult.value.events);
    }
  };

  const handleSaveProfile = async (event: FormEvent) => {
    event.preventDefault();
    if (!canUseApi) {
      setMessage('Please connect a wallet first.', true);
      return;
    }

    await withBusy(async () => {
      await saveProfile(walletAddress, profileName);
      setMessage('Profile saved successfully.');
    });
  };

  const handleContactChange = (index: number, key: keyof TrustedContact, value: string) => {
    setContacts((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    );
  };

  const handleAddContactRow = () => {
    setContacts((current) => [...current, { ...EMPTY_CONTACT, id: `contact-${current.length + 1}` }]);
  };

  const handleSaveContacts = async () => {
    if (!canUseApi) {
      setMessage('Please connect a wallet first.', true);
      return;
    }

    await withBusy(async () => {
      const cleaned = contacts.filter((item) => item.name?.trim());
      await saveTrustedContacts(walletAddress, cleaned);
      setMessage(`Saved ${cleaned.length} trusted contacts.`);
    });
  };

  const handleTriggerSos = async () => {
    if (!canUseApi) {
      setMessage('Please connect a wallet first.', true);
      return;
    }

    await withBusy(async () => {
      await triggerSos({
        walletAddress,
        eventType,
        contextText,
        locationHint,
      });

      const latest = await getEvents(walletAddress);
      setEvents(latest.events);
      setMessage('SOS triggered and recorded successfully.');
      setContextText('');
    });
  };

  const handleAcknowledge = async (eventId: string) => {
    if (!ackWallet.trim()) {
      setMessage('Enter a contact wallet for acknowledgment.', true);
      return;
    }

    await withBusy(async () => {
      await acknowledgeEvent(eventId, ackWallet, ackNote);
      const latest = await getEvents(walletAddress);
      setEvents(latest.events);
      setMessage('Acknowledgment added.');
    });
  };

  const handleRefreshHistory = async () => {
    if (!canUseApi) {
      setMessage('Please connect a wallet first.', true);
      return;
    }

    await withBusy(async () => {
      const result = await getEvents(walletAddress);
      setEvents(result.events);
      setMessage(`Loaded ${result.events.length} events.`);
    });
  };

  return (
    <main className="submission-page">
      <section className="submission-card hero-card">
        <p className="eyebrow">RakshaCircle</p>
        <h1>Submission MVP Dashboard</h1>
        <p className="muted">
          Lean end-to-end flow: wallet connect, profile setup, trusted circle, SOS trigger, acknowledgment,
          and tamper-proof style event history.
        </p>
        <div className="wallet-row">
          <button className="primary" onClick={handleConnectWallet} disabled={isBusy}>
            Connect Freighter Wallet
          </button>
          <span>{walletAddress ? shortenWallet(walletAddress) : 'No wallet connected'}</span>
        </div>
        <p className="status-text">{statusMessage}</p>
      </section>

      <section className="submission-grid">
        <article className="submission-card">
          <h2>1. Profile</h2>
          <form onSubmit={handleSaveProfile} className="stack">
            <label>
              Name
              <input
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                placeholder="Enter your name"
                required
              />
            </label>
            <button className="primary" type="submit" disabled={isBusy || !walletAddress}>
              Save Profile
            </button>
          </form>
        </article>

        <article className="submission-card">
          <h2>2. Trusted Circle</h2>
          <div className="stack">
            {contacts.map((contact, index) => (
              <div key={contact.id || index} className="contact-row">
                <input
                  value={contact.name || ''}
                  onChange={(event) => handleContactChange(index, 'name', event.target.value)}
                  placeholder="Contact name"
                />
                <input
                  value={contact.walletAddress || ''}
                  onChange={(event) => handleContactChange(index, 'walletAddress', event.target.value)}
                  placeholder="Contact wallet"
                />
                <input
                  value={contact.phone || ''}
                  onChange={(event) => handleContactChange(index, 'phone', event.target.value)}
                  placeholder="Phone"
                />
              </div>
            ))}
            <div className="actions-row">
              <button className="ghost" onClick={handleAddContactRow} type="button" disabled={isBusy}>
                Add Contact
              </button>
              <button className="primary" onClick={handleSaveContacts} type="button" disabled={isBusy || !walletAddress}>
                Save Contacts
              </button>
            </div>
          </div>
        </article>

        <article className="submission-card">
          <h2>3. Trigger SOS</h2>
          <div className="stack">
            <label>
              Event Type
              <select value={eventType} onChange={(event) => setEventType(event.target.value)}>
                <option value="SOS">SOS</option>
                <option value="MEDICAL">Medical Emergency</option>
                <option value="ROUTE_RISK">Route Risk</option>
              </select>
            </label>
            <label>
              Location Hint
              <input
                value={locationHint}
                onChange={(event) => setLocationHint(event.target.value)}
                placeholder="Near Park Street Metro"
              />
            </label>
            <label>
              Context
              <textarea
                value={contextText}
                onChange={(event) => setContextText(event.target.value)}
                placeholder="Optional details for off-chain context hash"
              />
            </label>
            <button className="danger" onClick={handleTriggerSos} type="button" disabled={isBusy || !walletAddress}>
              Trigger SOS
            </button>
          </div>
        </article>

        <article className="submission-card">
          <h2>4. Alert History</h2>
          <div className="stack">
            <div className="actions-row">
              <input
                value={ackWallet}
                onChange={(event) => setAckWallet(event.target.value)}
                placeholder="Acknowledging wallet"
              />
              <button className="ghost" onClick={handleRefreshHistory} type="button" disabled={isBusy || !walletAddress}>
                Refresh
              </button>
            </div>
            <textarea value={ackNote} onChange={(event) => setAckNote(event.target.value)} />
            <div className="events-list">
              {events.length === 0 && <p className="muted">No alerts yet.</p>}
              {events.map((item) => (
                <div key={item.id} className="event-card">
                  <p>
                    <strong>{item.eventType}</strong> · {new Date(item.timestamp).toLocaleString()}
                  </p>
                  <p className="muted">Status: {item.status}</p>
                  <p className="muted">Hash: {item.contextHash.slice(0, 24)}...</p>
                  <p className="muted">Acks: {item.acknowledgments.length}</p>
                  <button className="primary" onClick={() => handleAcknowledge(item.id)} type="button" disabled={isBusy}>
                    Acknowledge Event
                  </button>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default SubmissionMvp;