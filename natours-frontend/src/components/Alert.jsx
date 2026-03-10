import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

const Alert = () => {
  const { alerts, removeAlert } = useContext(AlertContext);

  if (alerts.length === 0) return null;

  return (
    <div className="alert-container">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert alert--${alert.type}${alert.exiting ? ' alert--hide' : ''}`}
          onClick={() => removeAlert(alert.id)}
          role="status"
        >
          {alert.message}
        </div>
      ))}
    </div>
  );
};

export default Alert;
