const Notification = ({ success, error }) => {
  if (success) {
    return <div className="success">{success}</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return null;
};

export default Notification;
