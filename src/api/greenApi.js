import axios from 'axios';

const BASE_URL = 'https://1103.api.green-api.com';

export const sendMessage = async (idInstance, apiTokenInstance, chatId, message, isGroup) => {
  const response = await axios.post(
    `${BASE_URL}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
    {
      chatId: `${chatId}@${isGroup ? 'g' : 'c'}.us`,
      message,
    }
  );
  console.log('send message:', response.data);
  return response.data;
};

export const receiveMessage = async (idInstance, apiTokenInstance) => {
  const response = await axios.get(
    `${BASE_URL}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}?receiveTimeout=5`
  );
  console.log('recieve message', response);

  return response;
};

export const deleteNotification = async (idInstance, apiTokenInstance, receiptId) => {
  console.log('delete notification', receiptId);
  console.log('delete notification url', `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`);
  await axios.delete(
    `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
  );
};

export const getChatHistory = async (idInstance, apiTokenInstance, chatId, isGroup) => {
  console.log('get chat request', `${BASE_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`)
  const response = await axios.post(
    `${BASE_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
    {
      chatId: '79084947899@c.us',
    },
  );
  console.log('get chat history', response);
  return response;
}