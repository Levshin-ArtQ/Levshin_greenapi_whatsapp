import React, { useState } from 'react';
import '../styles/NewChat.css';

const NewChat = ({ onCreateChat }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      onCreateChat(phoneNumber.trim());
    }
  };

  return (
    <div className="new-chat">
      <form onSubmit={handleSubmit} className="new-chat-form">
        <input
          type="text"
          placeholder="Введите номер телефона"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="new-chat-input"
        />
        <button type="submit" className="new-chat-button">
          Создать чат
        </button>
      </form>
    </div>
  );
};

export default NewChat;