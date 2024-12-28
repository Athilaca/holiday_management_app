// src/utils/cache.js
export const setCache = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getCache = (key) => {
    const cachedValue = localStorage.getItem(key);
    return cachedValue ? JSON.parse(cachedValue) : null;
};
