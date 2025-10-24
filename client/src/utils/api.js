// Utility function to construct API URLs properly for client portal
export const getApiUrl = (endpoint) => {
  // Force correct URL for production
  const baseUrl = 'https://growexi-website.onrender.com';
  console.log('🔍 Client API URL constructed:', `${baseUrl}${endpoint}`);
  console.log('🔍 Endpoint:', endpoint);
  
  // Remove trailing slash from base URL and ensure endpoint starts with /
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const finalUrl = `${cleanBaseUrl}${cleanEndpoint}`;
  
  console.log('🔍 Final URL:', finalUrl);
  return finalUrl;
};
