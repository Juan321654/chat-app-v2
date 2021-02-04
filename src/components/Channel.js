import React, { useState, useEffect } from 'react';
import Message from './Message'
import firebase from 'firebase/app';

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editState, setEditState] = useState(false);
  
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

  // send Editted Data to firebase
  const handleEdit = (id) => {
    db.collection('messages').doc(id).update({
      text: newMessage,
      // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL
    })
  }

  const handleEditState = (id) => {
    // console.log(id);
    setEditState(!editState)
  }

  return (
    <div>
      <ul> 
        {messages.map(message => (
          <div className="messages_divs2" key={message.id}>
          <li >
            <Message {...message}/></li>
            <div className="messages_divs--delete_edit">
              <div className="delete" onClick={() => handleClick(message.id)}>{editState ? null : 'x'}</div>
              <div className="edit" onClick={() => handleEditState(message.id)}>{editState && message.id ? 'Cancel' : 'Edit'}</div>
              <div className={editState ? 'edit' : 'none'} onClick={() => handleEdit(message.id)}>{editState ? '✔' : null}</div>
            </div>
          </div>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
        <div className="confirm_edit">
        {editState ? 'Type something and click on the checkmark to confirm, or cancel' : null}
        </div>
        <input 
        type="text"
        value={newMessage}
        onChange={handleOnChange}
        placeholder="Type your message here ..."
        />
        {editState ? null : <button type="submit" disabled={!newMessage}>
          Send
        </button>}
        
      </form>

    </div>
  )
}

export default Channel
