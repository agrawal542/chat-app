// src/App.js
import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('https://chat-app-a27y.onrender.com');

function App() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [connected, setConnected] = useState(false);
    const [name, setName] = useState('anonymous');

    function sendChat(event) {
        event.preventDefault();
        socket.emit('chat', { user: name, message });
        setMessage('');
    }


    useEffect(() => {
        if (connected) {
            socket.on('chat', (payload) => {
                setChat([...chat, payload]);
            });
        }
    }, [connected, chat]);

    return (
    <div className='w-screen min-h-screen px-10 py-10 bg-blue-200 md:px-40 '>
            <div className="container flex flex-col justify-between min-h-screen p-5 mx-auto shadow rounded-3xl shadow-blue-400 bg-gradient-to-r from-blue-500 to-cyan-400">
                        <h1 className="mb-4 text-3xl font-bold text-white">Real Life Chat App</h1>
                        {connected ? (
                            <div className="flex flex-col flex-1 space-y-2 overflow-y-auto">
                                {chat.map((payload, index) => (
                                    <div
                                        key={index}
                                        className={`rounded p-2 max-w-md ${
                                            payload.user === name
                                                ? 'bg-blue-500 self-end text-white'
                                                : 'bg-green-500 self-start text-white'
                                        }`}
                                    >
                                        <strong>{payload.user}:</strong> {payload.message}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <form
                                onSubmit={()=>{  setConnected(true);}}
                                className="flex flex-col p-4 mt-4 space-y-2 rounded start-chat-form hover:shadow-md"
                            >
                                <input
                                    className="p-2 transition duration-300 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <button
                                    className="p-2 text-white transition duration-300 bg-blue-500 rounded start-chat-button hover:bg-blue-600"
                                    type="submit"
                                >
                                    Start Chatting
                                </button>
                            </form>
                        )}
                        {connected && (
                            <form
                                onSubmit={sendChat}
                                className="flex items-center p-2 space-x-2 bg-white border-t rounded-b-lg chat-input-form hover:shadow-md"
                            >
                                <input
                                    className="flex-1 p-2 transition duration-300 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    onChange={(event) => setMessage(event.target.value)}
                                    type="text"
                                    name="chat"
                                    placeholder="Send text"
                                    value={message}
                                />
                                <button
                                    className="p-2 text-white transition duration-300 bg-blue-500 rounded send-button hover:bg-blue-600"
                                    type="submit"
                                >
                                    Send
                                </button>
                            </form>
                        )}
            </div>

    </div>
      
    );
}

export default App;
