import React, { useState, useEffect } from "react";
// import DropZone from '../components/DropZone';
import Message from "./Message";
import firebase from "firebase/app";

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editState, setEditState] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [keyState, setKeyState] = useState(true);

  const { uid, displayName, photoURL } = user;
  

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
        userUpload: fileUrl,
      });
    }
    setKeyState(!keyState);
  };

  // Delete Data from firebase handler
  const handleClick = (id) => {
    db.collection("messages").doc(id).delete();
  };

  // send Editted Data to firebase
  const handleEdit = (id) => {
    db.collection("messages").doc(id).update({
      text: newMessage,
      // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });
  };

  const handleEditState = (id) => {
    setEditState(!editState);
  };

  //to upload image to firbase
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  return (
    <div>
      <div className="container_messages">
        <ul>
          {messages.map((message) => (
            <div className="messages_divs2" key={message.id}>
              <li>
                <Message {...message} />
              </li>
              <div className="messages_divs--delete_edit">
                <div className="delete" onClick={() => handleClick(message.id)}>
                  {editState ? null : "x"}
                </div>
                <div
                  className="edit"
                  onClick={() => handleEditState(message.id)}
                >
                  {editState && message.id ? "Cancel" : "Edit"}
                </div>
                <div
                  className={editState ? "edit" : "none"}
                  onClick={() => handleEdit(message.id)}
                >
                  {editState ? "✔" : null}
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <form className="container_channel_form" onSubmit={handleOnSubmit}>
        <div className="confirm_edit">
          {editState
            ? "Type something and click on the checkmark to confirm, or cancel"
            : null}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="Type your message here ..."
        />
        {editState ? null : (
          <button type="submit" disabled={!newMessage}>
            Send
          </button>
        )}
        <input
          type="file"
          onChange={onFileChange}
          key={keyState}
          className="input_userupload"
        />
      </form>
      {/* <DropZone /> */}
    </div>
  );
};

export default Channel;
