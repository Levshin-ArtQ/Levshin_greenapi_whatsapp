import { useState, useEffect } from "react";
import Message from "./Message";
import {
  sendMessage,
  receiveMessage,
  deleteNotification,
  getChatHistory,
} from "../api/greenApi";
import "../styles/Chat.css";
import PropTypes from "prop-types";
import LogoutButton from "../assets/logout-white.svg";
import NewChatIcon from "../assets/chat-plus-svgrepo-com.svg";

const Chat = ({
  idInstance,
  apiTokenInstance,
  chatId,
  isGroup,
  onLogout,
  onNewChat,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage(idInstance, apiTokenInstance, chatId, newMessage);
      setMessages((prevMessages) => [
        ...prevMessages, { text: newMessage, isOutgoing: true }]);
      // setNewMessage('');
    }
  };

  useEffect(() => {
    // подгружаю историю сообщений
    const fetchChatHistory = async () => {
      const chatHistory = await getChatHistory(
        idInstance,
        apiTokenInstance,
        chatId,
        isGroup
      );
      setMessages(
        chatHistory.data.toReversed().map((message) => {
          return{ text: message.textMessage, isOutgoing: message.type === 'outgoing' };
        })
      );
    };
    fetchChatHistory();
  }, []);

  useEffect(() => {
    // задаю интервал в который будут проверяться пришедшие сообщения
    const interval = setInterval(async () => {
      const receivedMessage = await receiveMessage(
        idInstance,
        apiTokenInstance
      );
      // проверяю, что работаю в том же чате и сообщение текстового типа
      if (receivedMessage.status == 200 && receivedMessage.data === null) {
        // console.log("no messages");
        return;
      }
      if (!receivedMessage) {
        // console.log("no message");
        return;
      }
      if (!receivedMessage.data) {
        // console.log("no message data");
        return;
      }
      // if (!receivedMessage.data.body) console.log("no body");

      if (receivedMessage.data.body.senderData.chatId !== `${chatId}@c.us`) {
        // console.log("not my chat");
        // console.log(receivedMessage.data.body.chatId, `${chatId}@c.us`);

        await deleteNotification(
          idInstance,
          apiTokenInstance,
          receivedMessage.data.receiptId
        );
        return;
      }
      if (
        receivedMessage?.data?.body?.typeWebHook === "outgoingMessageStatus" ||
        receivedMessage?.data?.body?.typeWebHook === "outgoingMessageReceived"
      ) {
        console.log("outgoingMessageStatus");
        await deleteNotification(
          idInstance,
          apiTokenInstance,
          receivedMessage.data.receiptId
        );
        return;
      }
      if (
        receivedMessage &&
        receivedMessage.data.body.senderData.chatId === `${chatId}@c.us`
      ) {
        const isDuplicate = messages.some((message) => message.key === receivedMessage.data.receiptId);
        if (!isDuplicate) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: receivedMessage.data.body.messageData.textMessageData
                .textMessage,
              isOutgoing: false,
              key: receivedMessage.data.receiptId,
            },
          ]);
        }
        // убираем уведомление после получения
        console.log("recievedMessage!!", receivedMessage);
        await deleteNotification(
          idInstance,
          apiTokenInstance,
          receivedMessage.data.receiptId
        );
      }

      if (
        receivedMessage &&
        receivedMessage?.data?.body?.messageData?.textMessageData
          ?.textMessage &&
        receivedMessage.data.body.senderData.chatId === `${chatId}@g.us`
      ) {
        const isDuplicate = messages.some((message) => message.key === receivedMessage.data.receiptId);
        if (!isDuplicate) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: receivedMessage.data.body.messageData.textMessageData
                .textMessage,
              isOutgoing: false,
              key: receivedMessage.data.receiptId,
            },
          ]);
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat">
      <div className="chat-header">
        <div title="Выйти из аккаунта" onClick={onLogout} className="logout-button">
          <img src={LogoutButton} alt="[-> " className="logout-icon"/>
        </div>
        <div className="chat-header">{chatId}</div>
        <div title="Сменить чат" onClick={onNewChat}  className="add-chat-button">
          <img src={NewChatIcon} alt="[+]" className="add-chat-icon" />
        </div>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={message?.key || index}
            text={message.text}
            isOutgoing={message.isOutgoing}
          />
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
