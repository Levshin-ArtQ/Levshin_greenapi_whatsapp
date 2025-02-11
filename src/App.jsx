import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [chatId, setChatId] = useState('');
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const storedIdInstance = localStorage.getItem('idInstance');
    const storedApiTokenInstance = localStorage.getItem('apiTokenInstance');
    if (storedIdInstance && storedApiTokenInstance) {
      setIdInstance(storedIdInstance);
      setApiTokenInstance(storedApiTokenInstance);
    }
  }, []);

  const handleLogin = (id, token) => {
    setIdInstance(id);
    setApiTokenInstance(token);
    localStorage.setItem('idInstance', id);
    localStorage.setItem('apiTokenInstance', token);
  };


  const handleLogout = () => {
    setIdInstance('');
    setApiTokenInstance('');
    localStorage.clear();
  };

  const handleCreateChat = (phoneNumber) => {
    setChatId(phoneNumber);
  };

  const handleChatList = (chatList) => {setChatList(chatList)};

  const handleNewChat = () => {setChatId('')};

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
          onLogout={handleLogout}
          onNewChat={handleNewChat}
        />
      )}
    </div>
  );
};

export default App;