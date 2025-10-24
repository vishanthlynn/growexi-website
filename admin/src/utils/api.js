// Utility function to construct API URLs properly
export const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://growexi-api.onrender.com';
  console.log('Raw VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('Base URL after fallback:', baseUrl);
  
  // Remove trailing slash from base URL and ensure endpoint starts with /
  const cleanBaseUrl = baseUrl.replace(/\/+$/, ''); // Remove one or more trailing slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const finalUrl = `${cleanBaseUrl}${cleanEndpoint}`;
  console.log('API URL constructed:', finalUrl); // Debug logging
  return finalUrl;
};
