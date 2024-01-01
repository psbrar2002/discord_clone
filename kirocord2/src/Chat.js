import React from "react";
import './Chat.css';
import ChatHeader from "./ChatHeader";
import { AddCircle, CardGiftcard, EmojiEmotions, GifOutlined } from "@mui/icons-material";

function Chat() {
    return (
        <div className="chat">
            <ChatHeader />

            <div className="chat__messages">

            </div>

            <div className="chat__input">
                <AddCircle fontSize="large" />
                <form>
                    <input placeholder={'Message #TESTCHANNEL'} />
                    <button className="chat__inputButton" type="submit">
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