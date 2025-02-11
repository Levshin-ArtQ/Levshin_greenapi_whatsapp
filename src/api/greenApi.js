import axios from 'axios';

const BASE_URL = 'https://1103.api.green-api.com';

export const sendMessage = async (idInstance, apiTokenInstance, chatId, message) => {
  const response = await axios.post(
    `${BASE_URL}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
    {
      chatId: `${chatId}@c.us`,
      message,
    }
  );
  console.log('send message:', response.data);
  return response.data;
};

export const receiveMessage = async (idInstance, apiTokenInstance) => {
  const response = await axios.get(
    `${BASE_URL}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}?receiveTimeout=10`
  );
  console.log('recieve message', response.data.body);
  console.log('recieve message type', response.data.body.receiptId);

  return response;
};

export const deleteNotification = async (idInstance, apiTokenInstance, receiptId) => {
  console.log('delete notification', receiptId);
  console.log('delete notification url', `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`);
  await axios.delete(
    `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
  );
};

export const getChatHistory = async (idInstance, apiTokenInstance, chatId) => {
  const response = await axios.get(
    `${BASE_URL}/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}/${chatId}`
  );
  console.log('get chat history', response.data);
  return response.data;
}