"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Reads after hydration. Unavailable/full storage never breaks the interface. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const ready = useRef(false);
  const initial = useRef(initialValue);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      setValue(initial.current);
    }
    ready.current = true;
  }, [key]);

  const update = useCallback(
    (next: T | ((previous: T) => T)) => {
      setValue((previous) => {
        const updated =
          typeof next === "function" ? (next as (p: T) => T)(previous) : next;
        if (ready.current) {
          try {
            localStorage.setItem(key, JSON.stringify(updated));
          } catch {
            /* In-memory state stays usable. */
          }
        }
        return updated;
      });
    },
    [key],
  );

  return [value, update] as const;
}
