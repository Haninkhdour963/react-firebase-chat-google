import React from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import ChatRoom from './components/ChatRoom';
import './index.css';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const signIn = async () => {
    await signInWithPopup(auth, provider);
  };

  const signOutUser = () => signOut(auth);

  return (
    <div className="container">
      <header>
        <h1>💬 Firebase Chat</h1>
        {user && <button onClick={signOutUser}>Logout</button>}
      </header>
      {user ? <ChatRoom user={user} /> : <button onClick={signIn}>Sign in with Google</button>}
    </div>
  );
}

export default App;
