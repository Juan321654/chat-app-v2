import React from 'react'
import { formatRelative } from 'date-fns'

const Message = ({ 
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '', 
  message
}) => {
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log(message);
  // }
  return (
    <div>
      {/* <div className="delete" onClick={handleClick}>x</div> */}
      {photoURL 
      ? (
        <img src={photoURL} alt="Avatar" width={45} height={45} />
        ) 
      : null} 
      {displayName ? <p>{displayName}</p> : null} 
      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
        ) : null}
        <p>{text}</p>
    </div>
  )
}

export default Message
