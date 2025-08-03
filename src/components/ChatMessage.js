import React from 'react';

const ChatMessage = ({ message, currentUid }) => {
  const isOwn = message.uid === currentUid;

  return (
    <div className={`chat ${isOwn ? 'own' : ''}`}>
      <img src={message.photoURL} alt="User" />
      <p>{message.text}</p>
    </div>
  );
};

export default ChatMessage;
