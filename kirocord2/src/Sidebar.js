import React from 'react';
import './Sidebar.css';
import { AiOutlinePlus, AiOutlineDown } from 'react-icons/ai';
import SidebarChannel from './SidebarChannel';
import { FaSignal } from 'react-icons/fa';
import { FaPhone, FaInfoCircle } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import { Headset, Mic, Settings } from '@mui/icons-material';




function Sidebar() {
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
                    
                    <AiOutlinePlus className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                        <SidebarChannel />
                        <SidebarChannel />
                        <SidebarChannel />
                        <SidebarChannel/>
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
                <Avatar src="https://images-ext-1.discordapp.net/external/VAvFhcYMku9FsIy-RbG8zyfvTJHj0BPY5nH5H1XsXIE/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/374304350580899842/d51ff21b14f78c6c7234d8bf4a5a34e4.png?format=webp&quality=lossless&width=352&height=352" />
                <div className="sidebar__profileInfo">
                    <h3>@Kiro</h3>
                    <p>#This is my id</p>
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