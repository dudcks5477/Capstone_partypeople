// import React, { createContext, useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const ChatContext = createContext();

// const ChatProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [chatRooms, setChatRooms] = useState([]);
//   const [messages, setMessages] = useState({});

//   useEffect(() => {
//     const newSocket = io('YOUR_SERVER_URL');
//     setSocket(newSocket);

//     newSocket.on('chatRooms', (rooms) => {
//       setChatRooms(rooms);
//     });

//     newSocket.on('messages', (roomId, roomMessages) => {
//       setMessages((prevMessages) => ({ ...prevMessages, [roomId]: roomMessages }));
//     });

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   const joinRoom = (roomId) => {
//     if (socket) {
//       socket.emit('joinRoom', roomId);
//     }
//   };

//   const sendMessage = (roomId, message) => {
//     if (socket) {
//       socket.emit('sendMessage', roomId, message);
//     }
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         chatRooms,
//         messages,
//         joinRoom,
//         sendMessage,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export { ChatContext, ChatProvider };
// //이부분 백엔드 인듯