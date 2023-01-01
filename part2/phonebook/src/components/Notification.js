import React from "react";

function Notification({ message, isError }) {
  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (isError)
    style.color = "red";

  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
}

export default Notification;
