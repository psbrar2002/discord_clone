import React from 'react'
import './Message.css'
import { Avatar } from '@mui/material'
function Message() {
    return (
        <div className='message'>
            <Avatar />
            <div className="message__info">
                <h4>
                    Kiro
                    <span className='message__timestamp'>timestamp</span>
                </h4>

                <p>This is a message</p>
            </div>
        </div>

    )
}

export default Message