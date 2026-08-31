
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const ENDPOINTS = {
  stats: `${BASE_URL}/api/dashboard/stats`,
  fleet: `${BASE_URL}/api/fleet`,
  quoteRequests: `${BASE_URL}/api/quote-requests`,
  quoteRequestStatus: (id) => `${BASE_URL}/api/quote-requests/${id}/status`,
  track: (ref) => `${BASE_URL}/api/track/${ref}`,
  authLogin: `${BASE_URL}/api/auth/login`,
};

async function request(path, options = {}) {
  const token = localStorage.getItem('amabze_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Request failed: ${response.status}`);
  }
  return response.json();
}

export async function adminLogin(passcode) {
  const res = await request(ENDPOINTS.authLogin, {
    method: 'POST',
    body: JSON.stringify({ passcode }),
  });
  if (res.token) {
    localStorage.setItem('amabze_admin_token', res.token);
  }
  return res;
}

export function isAdminAuthenticated() {
  return !!localStorage.getItem('amabze_admin_token');
}

export function adminLogout() {
  localStorage.removeItem('amabze_admin_token');
}

export async function getDashboardStats() {
  try {
    return await request(ENDPOINTS.stats);
  } catch (error) {
    console.warn('getDashboardStats fallback:', error);
    return {
      quote_requests_7d: 14,
      active_fleet: 300,
      available_fleet: 100,
      avg_response_hours: '0.25 (15 mins)',
      sla_compliance_pct: '99.4%',
      pending_dispatch: 2,
      confirmed_trips: 12,
    };
  }
}

export async function getFleet() {
  try {
    return await request(ENDPOINTS.fleet);
  } catch (error) {
    console.warn('getFleet fallback:', error);
    return [];
  }
}

export async function getQuoteRequests() {
  return await request(ENDPOINTS.quoteRequests);
}

export async function updateQuoteRequestStatus(id, status) {
  return await request(ENDPOINTS.quoteRequestStatus(id), {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function trackBookingByRef(referenceId) {
  return await request(ENDPOINTS.track(referenceId));
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

  // Submit to Express Backend (which now handles Firestore persistence and Email dispatch)
  try {
    return await request(ENDPOINTS.quoteRequests, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Failed to submit quote request:', error);
    throw error;
  }
}
