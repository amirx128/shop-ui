const STORAGE_KEYS = {
  ACCESS_TOKEN: 'kaleskechi.accessToken',
  REFRESH_TOKEN: 'kaleskechi.refreshToken',
  CUSTOMER_ID: 'kaleskechi.customerId',
  FIRST_NAME: 'kaleskechi.firstName',
  LAST_NAME: 'kaleskechi.lastName',
} as const;

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

const setItem = (key: string, value: string) => {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(key, value);
};

const getItem = (key: string) => {
  const storage = getStorage();
  return storage?.getItem(key) ?? null;
};

const removeItem = (key: string) => {
  const storage = getStorage();
  storage?.removeItem(key);
};

type StoredProfile = {
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
};

export const authStorage = {
  setTokens(accessToken?: string, refreshToken?: string) {
    if (accessToken) {
      setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    }

    if (refreshToken) {
      setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  },

  setProfile(profile: StoredProfile) {
    if (!profile?.userId) {
      return;
    }

    setItem(STORAGE_KEYS.CUSTOMER_ID, profile.userId);
    setItem(STORAGE_KEYS.FIRST_NAME, profile.firstName ?? '');
    setItem(STORAGE_KEYS.LAST_NAME, profile.lastName ?? '');
  },

  getCustomerId() {
    return getItem(STORAGE_KEYS.CUSTOMER_ID);
  },

  getAccessToken() {
    return getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken() {
    return getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  clear() {
    Object.values(STORAGE_KEYS).forEach(removeItem);
  },
};
