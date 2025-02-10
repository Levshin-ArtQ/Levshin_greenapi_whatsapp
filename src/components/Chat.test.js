import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from './Chat';
import { sendMessage, receiveMessage, deleteNotification } from '../api/greenApi';

// Мокируем API
jest.mock('../api/greenApi');

describe('Chat Component', () => {
  const idInstance = '12345';
  const apiTokenInstance = 'abcde';
  const chatId = '79001234567';

  beforeEach(() => {
    sendMessage.mockResolvedValue({});
    receiveMessage.mockResolvedValue({
      receiptId: 1,
      body: {
        messageData: {
          textMessageData: {
            textMessage: 'Test message',
          },
        },
      },
    });
    deleteNotification.mockResolvedValue({});
  });

  it('renders chat interface', () => {
    render(
      <Chat
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        chatId={chatId}
      />
    );
    expect(screen.getByPlaceholderText('Введите сообщение')).toBeInTheDocument();
    expect(screen.getByText('Отправить')).toBeInTheDocument();
  });

  it('sends a message', async () => {
    render(
      <Chat
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        chatId={chatId}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Введите сообщение'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByText('Отправить'));

    expect(sendMessage).toHaveBeenCalledWith(idInstance, apiTokenInstance, chatId, 'Hello');
  });

  it('receives a message', async () => {
    render(
      <Chat
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        chatId={chatId}
      />
    );

    // Ждем, пока сообщение появится в чате
    expect(await screen.findByText('Test message')).toBeInTheDocument();
  });
});