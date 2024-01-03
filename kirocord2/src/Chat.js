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
import 'firebase/compat/storage'; // Import Firebase Storage
function Chat() {
    const channelId = useSelector(selectChannelId);
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const [fileDownloadUrl, setFileDownloadUrl] = useState(null);



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


    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            try {
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(`channel_files/${channelId}/${selectedFile.name}`);

                // Use await within the async function
                const snapshot = await fileRef.put(selectedFile);

                // Get the download URL
                const downloadUrl = await snapshot.ref.getDownloadURL();

                // Do something with the downloadUrl, for example, update the state
                setFileDownloadUrl(downloadUrl);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(e);
    };

    const sendMessage = () => {
        if (!channelId) {
            return;
        }

        // Check if input is not empty or contains only whitespaces
        if (input.trim() !== '') {
            // If it's not a document, send a text message
            const multilineMessage = input.split('\n').map((line) => line.trim()).join('\n');
            db.collection('channels').doc(channelId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: multilineMessage,
                user: user,
            });

            // Clear the input field
            setInput('');
        } else if (fileDownloadUrl) {
            // Add a message with the document link to Firestore
            db.collection('channels').doc(channelId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              message: `Uploaded a document: ${fileDownloadUrl}`,
              user: user,
          });

            // Clear the fileDownloadUrl state
            setFileDownloadUrl(null);
        }
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
                <AddCircle
                    fontSize="large"
                    onClick={() => fileInputRef.current.click()}
                />
                {/* File input for document upload */}
                <input
                    type="file"
                    accept=".pdf, .doc, .docx, .xls, .xlsx"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{
                        position: 'absolute',
                        top: '-1000px', // Position off-screen
                        left: '-1000px',
                        opacity: '0',
                    }} // Hide the file input
                />
                <form onSubmit={handleSendMessage}>
                    <textarea
                        value={input}
                        disabled={!channelId}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message #${channelName}`}
                        onKeyDown={(e) => {
                            // Check if "Enter" key is pressed without "Shift"
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault(); // Prevents the default behavior of "Enter" (submitting the form)
                                sendMessage();
                            }
                        }}
                    />
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