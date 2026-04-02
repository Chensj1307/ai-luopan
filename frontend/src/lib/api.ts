// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Generic API request function
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (email: string, password: string) => {
    return fetchApi<{ access_token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  register: (userData: any) => {
    return fetchApi<{ access_token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  me: () => {
    return fetchApi<any>('/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};

// Assessment API
export const assessmentApi = {
  create: (data: any) => {
    return fetchApi<any>('/assessment/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  get: (id: string) => {
    return fetchApi<any>(`/assessment/${id}`);
  },
  list: () => {
    return fetchApi<any[]>('/assessment/list');
  },
};

// Industry API
export const industryApi = {
  list: () => {
    return fetchApi<any[]>('/industry/list');
  },
  get: (code: string) => {
    return fetchApi<any>(`/industry/${code}`);
  },
};

// Payment API
export const paymentApi = {
  createOrder: (data: any) => {
    return fetchApi<any>('/payment/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  queryOrder: (orderNo: string) => {
    return fetchApi<any>(`/payment/query/${orderNo}`);
  },
  cancelOrder: (orderNo: string) => {
    return fetchApi<any>('/payment/cancel', {
      method: 'POST',
      body: JSON.stringify({ order_no: orderNo }),
    });
  },
  getMembershipList: () => {
    return fetchApi<any[]>('/payment/membership/list');
  },
  getMyMembership: () => {
    return fetchApi<any>('/payment/membership/my');
  },
};

export default {
  auth: authApi,
  assessment: assessmentApi,
  industry: industryApi,
  payment: paymentApi,
};