import React from 'react'
import './Message.css'
import { Avatar } from '@mui/material'
import moment from 'moment';

function Message({ timestamp, user, message }) {
    // Check if timestamp is a Firestore Timestamp object
    const jsDate = timestamp && timestamp.toDate && typeof timestamp.toDate === 'function'
        ? timestamp.toDate()
        : new Date();

    // Format the date using moment.js or use a different format as needed
    const formattedTimestamp = moment(jsDate).format('MMMM Do YYYY, h:mm:ss a');
    return (
        <div className='message'>
            <Avatar src={user.photo} />
            <div className="message__info">
                <h4>
                    {user.name}
                    <span className='message__timestamp'>{formattedTimestamp}</span>
                </h4>

                <p>{message}</p>
            </div>
        </div>

    )
}

export default Message