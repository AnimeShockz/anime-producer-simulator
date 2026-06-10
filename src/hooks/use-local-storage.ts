import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const savedValue = window.localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  const setValue = (value: T | ((currentValue: T) => T)) => {
    setStoredValue((current) => {
      const nextValue =
        typeof value === "function"
          ? (value as (currentValue: T) => T)(current)
          : value;

      window.localStorage.setItem(key, JSON.stringify(nextValue));
      return nextValue;
    });
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  useEffect(() => {
    const savedValue = window.localStorage.getItem(key);

    if (savedValue) {
      setStoredValue(JSON.parse(savedValue));
    }
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
}