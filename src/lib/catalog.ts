const DEFAULT_CATALOG_API_URL = 'http://localhost:5201';

export const getBaseCatalogUrl = () => {
  const catalogUrl =
    process.env.NEXT_CATALOG_API_URL ??
    process.env.NEXT_PUBLIC_CATALOG_API_URL ??
    DEFAULT_CATALOG_API_URL;

  if (!catalogUrl) {
    return DEFAULT_CATALOG_API_URL;
  }

  return catalogUrl.replace(/\/+$/, '');
};
