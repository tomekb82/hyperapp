export const memoized = (fn, keymaker = JSON.stringify) => {
  const cache = {};
  return (...args) => {
    const key = keymaker(args);
    return cache[key] || (cache[key] = fn(...args));
  };
};
