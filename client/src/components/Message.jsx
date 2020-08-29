import React from "react";

export default function Message(props) {
  return (
    <div className="alert_meassage" style={{ backgroundColor: props.color }}>
      {props.message}
    </div>
  );
}
