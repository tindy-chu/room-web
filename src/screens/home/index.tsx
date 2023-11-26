import { useEffect, useState } from 'react';
import Frame from '../../components/frame';
import useAuth from '../../hook/useAuth';

export default function Home() {
  useAuth();

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/websocket');

    socket.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    setWs(socket);

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (ws) {
      ws.send(message);
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <button onClick={() => sendMessage('Hello World')}>Send Message</button>
    </div>
  );

  return <Frame />;
}
