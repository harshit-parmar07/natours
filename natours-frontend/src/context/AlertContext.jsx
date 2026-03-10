import { createContext, useState, useCallback, useRef } from 'react';

export const AlertContext = createContext();

let alertIdCounter = 0;

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const timersRef = useRef({});

  const removeAlert = useCallback((id) => {
    // Start exit animation
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, exiting: true } : a))
    );
    // Remove from DOM after animation completes
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 400);

    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const showAlert = useCallback(
    (type, message, duration = 5000) => {
      const id = ++alertIdCounter;
      setAlerts((prev) => [...prev, { id, type, message, exiting: false }]);

      timersRef.current[id] = setTimeout(() => {
        removeAlert(id);
      }, duration);

      return id;
    },
    [removeAlert]
  );

  return (
    <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
