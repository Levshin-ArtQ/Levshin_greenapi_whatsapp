import axios from 'axios';

const BASE_URL = 'https://api.green-api.com';

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
    `${BASE_URL}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
  );
  console.log('recieve message', response.data);
  return response.data;
};

export const deleteNotification = async (idInstance, apiTokenInstance, receiptId) => {
  await axios.delete(
    `${BASE_URL}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
  );
};