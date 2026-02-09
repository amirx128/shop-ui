const trimUrl = (value?: string) => value?.replace(/\/+$/, '') ?? '';

const ORDERS_API_URL = (() => {
  const url = trimUrl(process.env.NEXT_PUBLIC_ORDERS_API_URL);
  if (!url) {
    throw new Error('NEXT_PUBLIC_ORDERS_API_URL must be defined in the environment.');
  }

  return url;
})();

export { ORDERS_API_URL };
