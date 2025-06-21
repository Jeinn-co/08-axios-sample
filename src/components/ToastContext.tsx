// context/ToastContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextProps {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let idCounter = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, message: string) => {
    const id = idCounter++;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000); // 自動消失時間
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              marginBottom: '8px',
              padding: '12px 20px',
              borderRadius: '6px',
              color: '#fff',
              backgroundColor:
                toast.type === 'success'
                  ? '#52c41a'
                  : toast.type === 'error'
                    ? '#ff4d4f'
                    : '#1890ff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              minWidth: '180px',
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
