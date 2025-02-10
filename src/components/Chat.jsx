import { useState, useEffect } from 'react';
import Message from './Message';
import { sendMessage, receiveMessage, deleteNotification } from '../api/greenApi';
import '../styles/Chat.css';
import PropTypes from 'prop-types';

const Chat = ({ idInstance, apiTokenInstance, chatId }) => {
  const [messages, setMessages] = useState([
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: false},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: true},
    {text: 'привет', isOutgoing: true},
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(idInstance, apiTokenInstance, chatId, newMessage);
      setMessages([...messages, { text: newMessage, isOutgoing: true }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // задаю интервал в который будут проверяться пришедшие сообщения
    const interval = setInterval(async () => {
      const receivedMessage = await receiveMessage(idInstance, apiTokenInstance);
      if (receivedMessage) {
        setMessages([...messages, { text: receivedMessage.body.textMessageData.textMessage, isOutgoing: false }]);
        // убираем уведомление после получения
        await deleteNotification(idInstance, apiTokenInstance, receivedMessage.receiptId);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isOutgoing={message.isOutgoing} />
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
