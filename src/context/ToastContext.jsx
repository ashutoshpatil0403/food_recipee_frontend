import { useState, useCallback } from "react";
import { ToastContext } from "./useToast";

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-slide-in ${
              toast.type === "error"
                ? "bg-red-50 border border-red-200 text-red-600"
                : "bg-green-50 border border-green-200 text-green-600"
            }`}
          >
            {toast.type === "error" ? "✕" : "✓"} {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
