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
          type="tel"
          placeholder="Номер телефона или ChatId"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="new-chat-input"
        />
        <label htmlFor="type">Тип чата групповой</label>
        <input
          type='radio' name='type' value='private' className="new-chat-input-radio" />
        <button type="submit" className="new-chat-button">
          Создать чат
        </button>
      </form>
    </div>
  );
};

export default NewChat;