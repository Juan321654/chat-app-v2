import React, { useState, useEffect } from 'react';
import Message from './Message'
import firebase from 'firebase/app';

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  console.log(messages);
  
  const { uid, displayName, photoURL } = user;
  
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
  }, [db]);
  
  // console.log(messages[0].id);
  const handleOnChange = e => {
    setNewMessage(e.target.value)
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    if (db) {
      db.collection('messages').add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL

      })
    }
  }

  // Delete Data from firebase handler
  const handleClick = (id) => {
    db.collection('messages').doc(id).delete()
  }

  return (
    <>
      <ul> 
        {messages.map(message => (
          <div key={message.id}>
            <div className="delete" onClick={() => handleClick(message.id)}>x</div>
          <li >
            <Message {...message}/></li>
          </div>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
        <input 
        type="text"
        value={newMessage}
        onChange={handleOnChange}
        placeholder="Type your message here ..."
        />
        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>

    </>
  )
}

export default Channel
