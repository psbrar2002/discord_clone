import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { AiOutlinePlus, AiOutlineDown } from 'react-icons/ai';
import SidebarChannel from './SidebarChannel';
import { FaSignal } from 'react-icons/fa';
import { FaPhone, FaInfoCircle } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import { Headset, Mic, Settings } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';


function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot =>
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data(),
                }))
            )
        );
    }, []);

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");
        if (channelName) {
            db.collection('channels').add({
                channelName: channelName,
            });
        }

    };
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Based Server</h3>
                <AiOutlineDown />
            </div>

            <div className="sidebar__channels">
                <div className='sidebar__channelsHeader'>
                    <div className="sidebar__header">
                        <AiOutlineDown />
                        <h4>Text Channels</h4>
                    </div>
                    
                    <AiOutlinePlus onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({ id, channel }) => (
                        <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                    ))}       
                </div>
            </div>
            <div className='sidebar__voice'>
                {/* This is the range icon */}
                <FaSignal  
                    className="sidebar__voiceIcon"
                    fontSize="large"
                />
            
            <div className="sidebar__voiceInfo">
                <h3>Voice Connected</h3>
                <p>Stream</p>
            </div>
            <div className="sidebar__voiceIcons">
                <FaInfoCircle />
                <FaPhone/>
            </div>
            </div>

            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <Mic />
                    <Headset />
                    <Settings />
                </div>
            </div>
        </div> 
    );
}

export default Sidebar;
//comment