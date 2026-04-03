const DAY_MS = 24 * 60 * 60 * 1000;
const STAR_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

const firstNames = [
  'Aarav',
  'Aisha',
  'Ananya',
  'Arjun',
  'Diya',
  'Ishita',
  'Kabir',
  'Kavya',
  'Meera',
  'Mira',
  'Neha',
  'Nikhil',
  'Pranav',
  'Priya',
  'Rahul',
  'Riya',
  'Saanvi',
  'Sameer',
  'Sara',
  'Tanvi',
  'Varun',
  'Vikram',
  'Aditi',
  'Ankit',
  'Bhavna',
  'Gauri',
  'Harsha',
  'Ira',
  'Karan',
  'Naina',
  'Pooja',
  'Rohan',
  'Shreya',
  'Tanya',
  'Yash'
];

const lastNames = [
  'Bose',
  'Chandra',
  'Desai',
  'Gupta',
  'Iyer',
  'Jain',
  'Kapoor',
  'Khan',
  'Kulkarni',
  'Malhotra',
  'Mehta',
  'Nair',
  'Patel',
  'Rao',
  'Sharma',
  'Singh',
  'Srinivasan',
  'Verma',
  'Yadav'
];

const cityHints = [
  'MG Road metro entrance',
  'Near central bus terminal',
  'Evening market lane',
  'Hospital side road',
  'College gate corner',
  'Office district plaza',
  'Residential tower lobby',
  'Late-night cab stand',
  'Park perimeter walkway',
  'Food court exit'
];

const eventTypes = ['emergency', 'check-in', 'route-risk'];
const contactNamePrefixes = ['Aunt', 'Brother', 'Colleague', 'Friend', 'Neighbor', 'Cousin', 'Partner'];

function createSeededRandom(seed) {
  let value = 0;

  for (let index = 0; index < seed.length; index += 1) {
    value = (value * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function pick(random, items) {
  return items[Math.floor(random() * items.length)];
}

function daysAgo(random, maxDays = 30) {
  return Math.floor(random() * maxDays);
}

function offsetTimestamp(random, options = {}) {
  const {
    days = 0,
    maxHours = 24,
    hourSpread = false,
  } = options;

  const base = Date.now() - (days * DAY_MS);
  const hours = hourSpread ? Math.floor(random() * maxHours) : 0;
  const minutes = Math.floor(random() * 60);
  const seconds = Math.floor(random() * 60);

  return new Date(base - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000) - (seconds * 1000)).toISOString();
}

function generateWallet(random, seedLabel) {
  let wallet = 'G';
  const localRandom = createSeededRandom(seedLabel + random().toString(36));

  while (wallet.length < 56) {
    wallet += STAR_ALPHABET[Math.floor(localRandom() * STAR_ALPHABET.length)];
  }

  return wallet.slice(0, 56);
}

function generatePhone(random, index) {
  const suffix = String(index).padStart(4, '0');
  return `+91-98${Math.floor(random() * 10)}-${Math.floor(random() * 1000).toString().padStart(3, '0')}-${suffix}`;
}

function buildContact(random, index, userIndex, name) {
  const contactWallet = generateWallet(random, `contact-${userIndex}-${index}`);
  return {
    id: `demo-contact-${userIndex + 1}-${index + 1}`,
    name: `${pick(random, contactNamePrefixes)} ${name.split(' ')[0]}`,
    walletAddress: contactWallet,
    phone: generatePhone(random, userIndex * 10 + index + 1),
    createdAt: offsetTimestamp(random, { days: daysAgo(random, 20) })
  };
}

function buildEvent(random, userWallet, userIndex, eventIndex, contactWallets) {
  const eventDay = eventIndex === 0 && userIndex < 12 ? Math.floor(random() * 1) : daysAgo(random, 30);
  const timestamp = offsetTimestamp(random, { days: eventDay, maxHours: eventDay === 0 ? 12 : 5, hourSpread: true });
  const eventType = eventTypes[(userIndex + eventIndex) % eventTypes.length];
  const acknowledgments = [];
  const acknowledgmentCount = Math.min(contactWallets.length, eventIndex === 0 && userIndex < 14 ? 1 + Math.floor(random() * 2) : Math.floor(random() * 3));

  for (let index = 0; index < acknowledgmentCount; index += 1) {
    acknowledgments.push({
      contactWallet: contactWallets[index],
      note: index === 0 ? 'Received and responding.' : 'Heading over now.',
      timestamp: new Date(new Date(timestamp).getTime() + ((index + 1) * 11 * 60 * 1000)).toISOString()
    });
  }

  return {
    id: `demo-event-${userIndex + 1}-${eventIndex + 1}`,
    walletAddress: userWallet,
    eventType,
    contextHash: `demo-hash-${userIndex + 1}-${eventIndex + 1}-${Math.abs(Math.floor(random() * 100000))}`,
    locationHint: pick(random, cityHints),
    status: acknowledgments.length > 0 ? 'acknowledged' : 'active',
    timestamp,
    acknowledgments
  };
}

export function generateDemoScenario(userCount = 30) {
  const safeUserCount = Math.max(30, Number(userCount) || 30);
  const random = createSeededRandom(`raksha-demo-${safeUserCount}`);
  const profiles = [];
  const contactsByWallet = {};
  const events = [];
  const wallets = [];

  for (let index = 0; index < safeUserCount; index += 1) {
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[(index * 3) % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const walletAddress = generateWallet(random, `wallet-${index}`);
    const createdAt = offsetTimestamp(random, { days: 25 + (index % 6), maxHours: 12, hourSpread: true });
    const updatedAt = offsetTimestamp(random, { days: index < 12 ? 0 : daysAgo(random, 7), maxHours: 6, hourSpread: true });
    const contactCount = 3 + (index % 3);
    const contacts = [];

    for (let contactIndex = 0; contactIndex < contactCount; contactIndex += 1) {
      contacts.push(buildContact(random, contactIndex, index, name));
    }

    const contactWallets = contacts.map((contact) => contact.walletAddress);
    const eventCount = 1 + (index % 3);

    for (let eventIndex = 0; eventIndex < eventCount; eventIndex += 1) {
      events.push(buildEvent(random, walletAddress, index, eventIndex, contactWallets));
    }

    profiles.push({
      walletAddress,
      name,
      createdAt,
      updatedAt
    });
    contactsByWallet[walletAddress] = contacts;
    wallets.push(walletAddress);
  }

  events.sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime());

  const recentWindow = Date.now() - DAY_MS;
  const activeWallets = new Set(
    events
      .filter((event) => new Date(event.timestamp).getTime() >= recentWindow)
      .map((event) => event.walletAddress)
  );

  return {
    profiles,
    contactsByWallet,
    events,
    wallets,
    primaryWallet: wallets[0],
    summary: {
      users: profiles.length,
      contacts: Object.values(contactsByWallet).reduce((sum, list) => sum + list.length, 0),
      events: events.length,
      acknowledgedEvents: events.filter((event) => event.status === 'acknowledged').length,
      activeUsers24h: activeWallets.size
    }
  };
}
