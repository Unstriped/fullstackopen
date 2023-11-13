const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = response.json();

  return result;
};

export default { login };
