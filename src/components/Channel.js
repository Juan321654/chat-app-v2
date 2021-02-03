import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() =>{
    if (db) {
      const unsubscribe = db.collection('messages').orderBy('createdAt')
      .limit(100).onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({ 
          ...doc.data(), 
          id: doc.id,
        }))
        setMessages(data)
      })
      return unsubscribe;
    }
  }, [db])
  return (
    <ul> 
      {messages.map(message => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  )
}

export default Channel
