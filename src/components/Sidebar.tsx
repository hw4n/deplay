import { ReactNode } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { AiFillSetting } from "react-icons/ai";

function Sidebar() {
    return (
        <div className='top-0 h-screen w-16 m-0 flex flex-col bg-gray-700'>
            <SidebarIcon icon={<IoChatboxEllipses size='32'/>} text="Chat history"/>
            <SidebarIcon icon={<AiFillSetting size='36'/>} text="Settings"/>
        </div>
    );
};

function SidebarIcon({ icon, text } : { icon: ReactNode, text: string }) {
    return (
        <div className="sidebar-icon group">
            {icon}

            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    );
}

export default Sidebar;