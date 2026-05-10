import { useCallback, useRef, useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const pushToast = useCallback(
    ({ type = "info", title = "", message = "", durationMs = 3500 }) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((prev) => [...prev, { id, type, title, message }]);

      const timer = setTimeout(() => removeToast(id), durationMs);
      timers.current.set(id, timer);
    },
    [removeToast]
  );

  return { toasts, pushToast, removeToast };
}

