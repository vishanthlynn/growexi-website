// Utility function to construct API URLs properly
export const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://growexi-api.onrender.com';
  // Remove trailing slash from base URL and ensure endpoint starts with /
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${cleanBaseUrl}${cleanEndpoint}`;
};
