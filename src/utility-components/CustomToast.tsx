import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertCircle, CheckCircle2, Info, X, AlertTriangle, Loader2 } from 'lucide-react';

const ToastContext = createContext(null);

const Toast = ({ id, message, type = 'default', description, duration = 4000, position = 'top-right', onClose, promise }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [status, setStatus] = useState(type);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300); // Wait for fade out animation
  }, [id, onClose]);

  React.useEffect(() => {
    let timeoutId;

    if (promise && (type === 'loading' || type === 'pending')) {
      promise
        .then(() => {
          setStatus('success');
          timeoutId = setTimeout(handleClose, 2000);
        })
        .catch(() => {
          setStatus('error');
          timeoutId = setTimeout(handleClose, 2000);
        });
    } else if (type !== 'loading' && type !== 'pending') {
      timeoutId = setTimeout(handleClose, duration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [promise, type, duration, handleClose]);

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'loading':
      case 'pending':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (status) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info':
      case 'loading':
      case 'pending': return 'bg-blue-50 border-blue-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 transition-all duration-300 ease-in-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    }`}>
      <div className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border ${getBgColor()} min-w-72`}>
        {getIcon()}
        <div className="flex-1">
          <p className="text-gray-800 font-small">{message}</p>
          {description && <p className="text-gray-600 text-sm mt-1">{description}</p>}
        </div>
        {status !== 'loading' && status !== 'pending' && (
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addToast = useCallback((props) => {
    const id = generateUniqueId();
    setToasts(prev => [...prev, { id, ...props }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast } = context;

  const toast = {
    show: (message, options = {}) => addToast({ message, ...options }),
    success: (message, options = {}) => addToast({ message, type: 'success', ...options }),
    error: (message, options = {}) => addToast({ message, type: 'error', ...options }),
    warning: (message, options = {}) => addToast({ message, type: 'warning', ...options }),
    info: (message, options = {}) => addToast({ message, type: 'info', ...options }),
    loading: (message, promise, options = {}) => addToast({ 
      message, 
      type: 'loading', 
      promise,
      ...options 
    }),
    pending: (message, promise, options = {}) => addToast({ 
      message, 
      type: 'pending', 
      promise,
      ...options 
    })
  };

  return toast;
};

// Example Usage Component
const CustomToast = () => {
  const toast = useToast();

  const simulateAsyncOperation = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve() : reject();
      }, 2000);
    });
  };

  return (
    <div className="p-8 space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => toast.success('Operation completed!', {
            description: 'Your changes have been saved'
          })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Success Toast
        </button>

        <button
          onClick={() => toast.loading(
            'Processing...',
            simulateAsyncOperation(),
            { description: 'Please wait while we save your changes' }
          )}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Loading Toast
        </button>

        <button
          onClick={() => toast.error('Failed!', {
            description: 'Something went wrong'
          })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Error Toast
        </button>
      </div>
    </div>
  );
};

export default CustomToast;