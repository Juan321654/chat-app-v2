import React from "react";
import { formatRelative } from "date-fns";

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
  userUpload = "",
}) => {
  return (
    <div className="messages_divs">
      {/* these are the props that are used to render the data from firebase */}
      {photoURL ? (
        <img
          className="avatar"
          src={photoURL}
          alt="Avatar"
          width={45}
          height={45}
        />
      ) : null}

      {displayName ? <p>{displayName}</p> : null}

      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
      ) : null}

      <p>{text}</p>
      {userUpload ? (
        <img src={userUpload} alt="userUpload" width={90} height={70} />
      ) : null}
    </div>
  );
};

export default Message;
