import React, { useEffect, useState, useRef } from "react";
import './Chat.css';
import ChatHeader from "./ChatHeader";
import { AddCircle, CardGiftcard, EmojiEmotions, GifOutlined } from "@mui/icons-material";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
function Chat() {
    const channelId = useSelector(selectChannelId);
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        // Scroll to the bottom of the messages when component mounts
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    useEffect(() => {
        if (channelId) {
            db.collection('channels')
                .doc(channelId).collection("messages")
                .orderBy('timestamp', 'asc') 
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }

    }, [channelId]);
    const sendMessage = e => {
        e.preventDefault();
        if (input.trim() === '') {
            // You can provide user feedback, e.g., show an alert or return early
            return;
        }
        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,

        });
        setInput("");
    };
    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />

            <div className="chat__messages">
                {messages.map((message) => (
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                    />
                ))}
                <div ref={messagesEndRef}></div>
            </div>

            <div className="chat__input">
                <AddCircle fontSize="large" />
                <form>
                    <input
                        value={input}
                        disabled={!channelId}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message #${channelName}`} />
                    <button
                        disabled={!channelId}
                        className="chat__inputButton"
                        type="submit"
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcard fontSize="large" />
                    <GifOutlined fontSize="large" />
                    <EmojiEmotions fontSize="large" />
                </div>
            </div>
        </div >
    )
}

export default Chat;