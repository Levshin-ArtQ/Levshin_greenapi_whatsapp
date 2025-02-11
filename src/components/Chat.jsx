import { useState, useEffect } from 'react';
import Message from './Message';
import { sendMessage, receiveMessage, deleteNotification, getChatHistory } from '../api/greenApi';
import '../styles/Chat.css';
import PropTypes from 'prop-types';

const Chat = ({ idInstance, apiTokenInstance, chatId, onLogout, onNewchat }) => {
  const [messages, setMessages] = useState([
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: true},
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(idInstance, apiTokenInstance, chatId, newMessage);
      setMessages([...messages, { text: newMessage, isOutgoing: true }]);
      // setNewMessage('');
    }
  };

  // useEffect(() => {
  //   // подгружаю историю сообщений
  //   const fetchChatHistory = async () => {
  //     const chatHistory = await getChatHistory(idInstance, apiTokenInstance, chatId);
  //     setMessages(chatHistory.messages);
  //   };
  //   fetchChatHistory();
  // }, []);

  useEffect(() => {
    // задаю интервал в который будут проверяться пришедшие сообщения
    const interval = setInterval(async () => {
      const receivedMessage = await receiveMessage(idInstance, apiTokenInstance);
      if (receivedMessage) {
        setMessages([...messages, { text: receivedMessage.data.body.messageData.textMessageData.textMessage, isOutgoing: false, key: receivedMessage.data.receiptId }]);
        // убираем уведомление после получения
        console.log('recievedMessage!!', receivedMessage);
        await deleteNotification(idInstance, apiTokenInstance, receivedMessage.data.receiptId);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="chat">
      <div onClick={onLogout} className="logout">выйти</div>
      <div onClick={onNewchat} className="newChat">Новый чат</div>
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={message?.key || index} text={message.text} isOutgoing={message.isOutgoing} />
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение"
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
};

Chat.propTypes = {
  idInstance: PropTypes.string.isRequired,
  apiTokenInstance: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
};

export default Chat;
