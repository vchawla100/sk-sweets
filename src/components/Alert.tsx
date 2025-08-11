import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = 'fixed top-5 right-5 flex items-center p-4 rounded-lg shadow-lg z-50';
  let typeClasses = '';
  let Icon;

  if (type === 'success') {
    typeClasses = 'bg-green-100 border border-green-400 text-green-700';
    Icon = CheckCircle;
  } else {
    typeClasses = 'bg-red-100 border border-red-400 text-red-700';
    Icon = XCircle;
  }

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <Icon className="mr-3" />
      {message}
    </div>
  );
};

export default Alert;