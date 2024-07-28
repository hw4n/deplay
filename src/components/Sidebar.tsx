import { ReactNode } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className='top-0 h-screen w-16 m-0 flex flex-col bg-gray-700'>
            <SidebarIcon icon={<IoChatboxEllipses size='32'/>} text="Chat history" link="/"/>
            <SidebarIcon icon={<AiFillSetting size='36'/>} text="Settings" link="/settings"/>
        </div>
    );
};

function SidebarIcon({ icon, text, link } : { icon: ReactNode, text: string, link: string }) {
    return (
        <Link to={link} className="sidebar-icon group">
            {icon}

            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </Link>
    );
}

export default Sidebar;