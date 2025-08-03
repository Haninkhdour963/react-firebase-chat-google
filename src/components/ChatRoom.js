import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import ChatMessage from './ChatMessage';

const ChatRoom = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!form.trim()) return;

    await addDoc(collection(db, 'messages'), {
      text: form,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp()
    });

    setForm('');
  };

  return (
    <div>
      <div className="messages">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} currentUid={user.uid} />
        ))}
        <span ref={scrollRef} />
      </div>
      <form onSubmit={sendMessage} className="form">
        <input
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
