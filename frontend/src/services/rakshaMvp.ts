import { API_BASE_URL } from '@/config';

const baseUrl = API_BASE_URL || 'http://localhost:8000';
const apiPrefix = `${baseUrl}/api/v1/raksha`;

export type TrustedContact = {
  id?: string;
  name: string;
  walletAddress?: string;
  phone?: string;
};

export type SosEvent = {
  id: string;
  walletAddress: string;
  eventType: string;
  contextHash: string;
  locationHint: string;
  status: 'active' | 'acknowledged';
  timestamp: string;
  acknowledgments: Array<{
    contactWallet: string;
    note: string;
    timestamp: string;
  }>;
};

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      message = body.message || body.error || message;
    } catch {
      // Ignore parse errors and keep fallback message.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function saveProfile(walletAddress: string, name: string) {
  const response = await fetch(`${apiPrefix}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress, name }),
  });

  return parseResponse<{ profile: { walletAddress: string; name: string } }>(response);
}

export async function getProfile(walletAddress: string) {
  const response = await fetch(`${apiPrefix}/profile/${encodeURIComponent(walletAddress)}`);
  return parseResponse<{ profile: { walletAddress: string; name: string } }>(response);
}

export async function saveTrustedContacts(walletAddress: string, contacts: TrustedContact[]) {
  const response = await fetch(`${apiPrefix}/trusted-contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress, contacts }),
  });

  return parseResponse<{ contacts: TrustedContact[] }>(response);
}

export async function getTrustedContacts(walletAddress: string) {
  const response = await fetch(`${apiPrefix}/trusted-contacts/${encodeURIComponent(walletAddress)}`);
  return parseResponse<{ contacts: TrustedContact[] }>(response);
}

export async function triggerSos(payload: {
  walletAddress: string;
  eventType: string;
  contextText: string;
  locationHint: string;
}) {
  const response = await fetch(`${apiPrefix}/sos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse<{ event: SosEvent }>(response);
}

export async function acknowledgeEvent(eventId: string, contactWallet: string, note: string) {
  const response = await fetch(`${apiPrefix}/acknowledge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, contactWallet, note }),
  });

  return parseResponse<{ event: SosEvent }>(response);
}

export async function getEvents(walletAddress: string) {
  const response = await fetch(`${apiPrefix}/events/${encodeURIComponent(walletAddress)}`);
  return parseResponse<{ events: SosEvent[] }>(response);
}