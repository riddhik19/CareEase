const BASE_URL = 'http://localhost:5000';

export async function createRequest(data) {
  const response = await fetch(`${BASE_URL}/api/requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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