import React from 'react'
import './Message.css'
import { Avatar } from '@mui/material'
import moment from 'moment';

function Message({ timestamp, user, message }) {
    // Check if timestamp is a Firestore Timestamp object
    const jsDate = timestamp && timestamp.toDate && typeof timestamp.toDate === 'function'
        ? timestamp.toDate()
        : new Date();
    const isDocument = message.startsWith('Uploaded a document:');
    const documentUrl = isDocument ? message.split(': ')[1] : null;
    // Format the date using moment.js or use a different format as needed
    const formattedTimestamp = moment(jsDate).format('MMMM Do YYYY, h:mm:ss a');
    return (
        <div className='message'>
            <Avatar src={user.photo} />
            <div className="message__info">
                <h4>
                    {user.displayName}
                    <span className='message__timestamp'>{formattedTimestamp}</span>
                </h4>
                {isDocument ? (
                    // If it's a document, attempt to embed an image
                    <p>
                        {isImage(documentUrl) ? (
                            <img src={documentUrl} alt="" />
                        ) : (
                            <a href={documentUrl} target="_blank" rel="noopener noreferrer">
                                View Document
                            </a>
                        )}
                    </p>
                ) : (
                    <p>
                        {isImageLink(message) ? (
                            <img src={message} alt="" />
                        ) : (
                            <a href={message} target="_blank" rel="noopener noreferrer">
                                {message}
                            </a>
                        )}
                    </p>
                )}
            </div>
        </div>

    )
}
// Helper function to check if the URL points to an image
function isImage(url) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = url.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
}
// Helper function to check if the message is a link to an image
function isImageLink(message) {
    // Regex to match common image URL patterns
    const imageRegex = /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i;
    return imageRegex.test(message);
}
export default Message