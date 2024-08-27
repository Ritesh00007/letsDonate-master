// import React, { useState, useEffect } from "react";
// import queryString from 'query-string';
// import io from "socket.io-client";
// import Scroll from 'react-scroll-to-bottom';

// let socket;

// const ChatRoom = ({ location }) => {
//     const [name, setName] = useState('');
//     const [room, setRoom] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const { name, room } = queryString.parse(location.search);
        
//         socket = io('localhost:5000');
//         setName(name);
//         setRoom(room);
//         socket.emit('joinedChat', {name, room}, ()=>{

//         });

//         // return () =>{
//         //     socket.emit('disconnect');
//         //     socket.off();
//         // }

//     },['localhost:5000', location.search]);

//     useEffect(() => {
//         socket.on('message', (message) => {
//             setMessages(messages => [...messages, message]);
//         });
//     }, [messages]);

//     const sendMessage = (event) => {
//         event.preventDefault();
//         if(message){
//             socket.emit('deliverMessage', message, () => setMessage(''));
//         }
//     }

//     console.log(message, messages);

//     return (
//         <div>
//             <div>
//                 <h2>Welcome to {room}'s chat room</h2>
                
//                 <Scroll>
//                     {messages.map((message, i) => <div key={i}>
//                         <div>
//                             <p>{name}:  {message.text}</p>
//                         </div>
//                     </div>)}
//                 </Scroll>
//                 <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key==='Enter'? sendMessage(event) : null}/>
//                 <button className='sendButton' onClick={(event) => sendMessage(event)}>SEND</button>
//             </div>
//         </div>
//     )
// }

// export default ChatRoom;