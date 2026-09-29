import { useState, useMemo, createContext, useCallback } from "react";

type Alert = {
  id: string;
  message: string;
  type?: "warning" | "success";
  timeout: NodeJS.Timeout;
};

type AlertContext = {
  alert: Alert | null;
  closeAlert: () => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
};

export const AlertContext = createContext({} as AlertContext);

const createAlertId = (message: string) => `${message}-${crypto.randomUUID()}`;

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const closeAlert = () => {
    if (alert) {
      clearTimeout(alert.timeout);
      setAlert(null);
    }
  };

  const createAlert = useCallback(
    (message: Alert["message"], type: Alert["type"]) => {
      try {
        const alertMessage = message;

        const id = createAlertId(alertMessage);
        const timeout = setTimeout(() => closeAlert(), 15000);

        setAlert({ id, message: alertMessage, type, timeout });
      } catch (error) {
        throw new Error(`Error creating alert: ${error}`);
      }
    },
    [alert]
  );

  const value = useMemo(
    () => ({
      alert,
      showSuccess: (message: string) => createAlert(message, "success"),
      showError: (message: string) => createAlert(message, "warning"),
      closeAlert,
    }),
    [alert, createAlert]
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
