import React from 'react';
import './Message.css';
import { Avatar } from '@mui/material';
import moment from 'moment';
import Linkify from 'react-linkify';

function Message({ timestamp, user, message }) {
    const jsDate = timestamp && timestamp.toDate && typeof timestamp.toDate === 'function'
        ? timestamp.toDate()
        : new Date();
    const formattedTimestamp = moment(jsDate).format('MMMM Do YYYY, h:mm:ss a');

    const isDocument = message.startsWith('Uploaded a document:');
    const isImageMessage = isImageLink(message);
    const documentUrl = isDocument ? message.split(': ')[1] : null;

    return (
        <div className="message">
            <Avatar src={user.photo} className='message__avatar' />
            <div className="message__info">
                <h4>
                    {user.displayName}
                    <span className="message__timestamp">{formattedTimestamp}</span>
                </h4>
                <p>
                    {isDocument ? (
                        <a href={documentUrl} target="_blank" rel="noopener noreferrer">
                            View Document
                        </a>
                    ) : (
                            isImageMessage ? (
                                <img src={message} alt="" className='message__image' />
                            ) : (
                                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                        <a href={decoratedHref} key={key} target="_blank" rel="noopener noreferrer">
                                            {decoratedText}
                                        </a>
                                    )}>
                                        {message}
                            </Linkify>
                        )
                    )}
                </p>
            </div>
        </div>
    );
}

// Helper function to check if the message is a link to an image
function isImageLink(message) {
    // Regex to match common image URL patterns
    const imageRegex = /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i;
    return imageRegex.test(message);
}

export default Message;