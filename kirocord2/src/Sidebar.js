import React from 'react';
import './Sidebar.css';
import { AiOutlinePlus, AiOutlineDown } from 'react-icons/ai';
import SidebarChannel from './SidebarChannel';
import { FaSignal } from 'react-icons/fa';
import { FaPhone, FaInfoCircle } from 'react-icons/fa';




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
        </div> 
    );
}

export default Sidebar;
