const trimUrl = (value?: string) => value?.replace(/\/+$/, '') ?? '';

export const getBaseCatalogUrl = () => {
  const catalogUrl =
    process.env.NEXT_PUBLIC_CATALOG_API_URL ?? process.env.NEXT_CATALOG_API_URL;

  return trimUrl(catalogUrl);
};
