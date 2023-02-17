interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  const style = {
    color: 'red',
  };

  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
