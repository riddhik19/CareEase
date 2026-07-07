const BASE_URL = 'https://careease-backend-x3g8.onrender.com';

export async function createRequest(data) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong');
  }

  return result;
}

export async function getRequests() {
  const response = await fetch(`${BASE_URL}/api/requests`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch requests');
  }

  return result;
}

export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed');
  }

  return result;
}

export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Login failed');
  }

  return result;
}

export async function createPaymentOrder(amount) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/payment/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create order');
  }

  return result;
}

export async function verifyPayment(data) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/payment/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Payment verification failed');
  }

  return result;
}