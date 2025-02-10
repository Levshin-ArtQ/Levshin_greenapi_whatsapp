import React, { useState } from 'react';
import Login from './components/Login';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [chatId, setChatId] = useState('');

  const handleLogin = (id, token) => {
    setIdInstance(id);
    setApiTokenInstance(token);
  };

  const handleCreateChat = (phoneNumber) => {
    setChatId(phoneNumber);
  };

  return (
    <div className="app">
      {!idInstance || !apiTokenInstance ? (
        <Login onLogin={handleLogin} />
      ) : !chatId ? (
        <NewChat onCreateChat={handleCreateChat} />
      ) : (
        <Chat
          idInstance={idInstance}
          apiTokenInstance={apiTokenInstance}
          chatId={chatId}
        />
      )}
    </div>
  );
};

export default App;