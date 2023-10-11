const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={messageType === "error" ? "error" : "success"}>
      {message}
    </div>
  );
};

export default Notification;
