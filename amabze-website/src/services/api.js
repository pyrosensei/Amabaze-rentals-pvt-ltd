const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const ENDPOINTS = {
  stats: `${BASE_URL}/api/dashboard/stats`,
  fleet: `${BASE_URL}/api/fleet`,
  quoteRequests: `${BASE_URL}/api/quote-requests`,
  quoteRequestStatus: (id) => `${BASE_URL}/api/quote-requests/${id}/status`,
};

/* ─── Mock fallbacks (used only when the backend is unreachable) ─── */

const mockStats = {
  quote_requests_7d: 14,
  active_fleet: 142,
  avg_response_hours: null,
  repeat_client_pct: null,
};

const mockFleet = [
  {
    id: 'sedans',
    name: 'Executive Sedans',
    vehicles: 'Dzire, Etios, Ciaz, Honda City',
    total: 62,
    available: 38,
  },
  {
    id: 'suvs',
    name: 'SUVs & MUVs',
    vehicles: 'Innova Crysta, Fortuner, Corolla, Camry',
    total: 45,
    available: 12,
  },
  {
    id: 'coaches',
    name: 'Coaches & Travellers',
    vehicles: 'Tempo Traveller, Toyota Commuter, Volvo Bus',
    total: 35,
    available: 9,
  },
];

const mockQuoteRequests = [
  {
    id: 101,
    service_type: 'corporate-commute',
    pickup: 'Cyber City, Gurugram',
    destination: 'IGI Airport T3',
    date: '2026-08-06',
    status: 'new',
  },
  {
    id: 102,
    service_type: 'airport-transfer',
    pickup: 'Connaught Place, Delhi',
    destination: 'IGI Airport T1',
    date: '2026-08-07',
    status: 'contacted',
  },
  {
    id: 103,
    service_type: 'event-logistics',
    pickup: 'Aerocity, Delhi',
    destination: 'Kingdom of Dreams, Gurugram',
    date: '2026-08-10',
    status: 'confirmed',
  },
  {
    id: 104,
    service_type: 'outstation',
    pickup: 'Noida',
    destination: 'Jaipur',
    date: '2026-08-12',
    status: 'new',
  },
];

async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export async function getDashboardStats() {
  try {
    return await request(ENDPOINTS.stats);
  } catch (error) {
    console.warn('getDashboardStats: falling back to mock data', error);
    return { ...mockStats };
  }
}

export async function getFleet() {
  try {
    return await request(ENDPOINTS.fleet);
  } catch (error) {
    console.warn('getFleet: falling back to mock data', error);
    return mockFleet.map((item) => ({ ...item }));
  }
}

export async function getQuoteRequests() {
  try {
    return await request(ENDPOINTS.quoteRequests);
  } catch (error) {
    console.warn('getQuoteRequests: falling back to mock data', error);
    return mockQuoteRequests.map((item) => ({ ...item }));
  }
}

export async function updateQuoteRequestStatus(id, status) {
  try {
    return await request(ENDPOINTS.quoteRequestStatus(id), {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  } catch (error) {
    console.warn('updateQuoteRequestStatus: falling back to mock data', error);
    return { id, status };
  }
}

export async function submitQuoteRequest(formData) {
  const payload = {
    service_type: formData.serviceType,
    pickup: formData.pickup,
    destination: formData.destination,
    date: formData.date,
    passengers: formData.passengers,
    name: formData.name,
    company: formData.company,
    email: formData.email,
    phone: formData.phone,
    notes: formData.notes,
  };

  // No mock fallback here: the contact form needs a genuine error state
  // when the backend is unreachable, so the user is never told their
  // request was saved when it wasn't.
  return request(ENDPOINTS.quoteRequests, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}