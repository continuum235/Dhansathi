const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

const stripTrailingSlashes = (value) => value.replace(/\/+$/, '');

const normalizeApiBaseUrl = (rawValue) => {
  const configuredValue = stripTrailingSlashes((rawValue || '/api').trim());

  if (!configuredValue.startsWith('http://') && !configuredValue.startsWith('https://')) {
    return configuredValue || '/api';
  }

  try {
    const url = new URL(configuredValue);

    if (
      typeof window !== 'undefined' &&
      window.location.protocol === 'https:' &&
      url.protocol === 'http:' &&
      !LOCAL_HOSTS.has(url.hostname)
    ) {
      url.protocol = 'https:';
      return stripTrailingSlashes(url.toString());
    }

    return stripTrailingSlashes(url.toString());
  } catch {
    return configuredValue || '/api';
  }
};

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
