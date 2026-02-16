import { Bell } from 'lucide-react';
import logo from '../assets/logo.png';

export function Header() {
  return (
    <header dir="rtl" className="header flex flex-row items-center justify-between w-full px-8 py-3 bg-white">
      {/* Logo and Text - Right side */}
      <div className="flex flex-row items-center gap-[10px] w-[180px] h-[34px]">
        <div className="flex flex-row justify-end items-center w-[34px] h-[34px] rounded-xl bg-gradient-avatar">
          <img src={logo} alt="Logo" className="w-[25px] h-[25px]" />
        </div>
         <span className="flex flex-col items-end w-[131px] h-[24px] text-[16px] font-bold font-jakarta text-gray-900 tracking-[-0.32px] leading-[24px] text-right">Feature Requests</span>
      </div>

      {/* User Actions - Left side */}
      <div className="flex flex-row items-center gap-2 w-[1250px] h-[36px] justify-end">
        <div className="flex flex-row items-center justify-center w-8 h-8 rounded-[16px] bg-gradient-avatar">
          <span className="text-white text-[13px] font-semibold font-jakarta">מ</span>
        </div>
        {/* Bell with tooltip styled like chat modal */}
        <div className="relative group flex items-center">
          <button className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-500" />
          </button>
          {/* Tooltip styled as a floating card, like chat modal */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-14 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity flex flex-col items-center min-w-max">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl px-6 py-4 font-jakarta text-gray-900 text-base font-semibold whitespace-nowrap" style={{ boxShadow: '0px 8px 32px 0px #6366F11A' }}>
              <div className="text-right leading-6">
                שלום מאיר<br />שלושה אנשים הביעו דעתם על ההצעה לשיפור שלך
              </div>
            </div>
            <div className="w-3 h-3 bg-white border-l border-t border-[#E5E7EB] rotate-45 -mt-1"></div>
          </div>
        </div>
        {/* SVG icon after bell */}
        <span className="ml-2 flex items-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="url(#paint0_linear_7_423)"/>
            <path d="M16.584 12.3345C17.6631 12.3345 18.4481 12.6519 18.939 13.2866C19.4299 13.9172 19.6753 14.9032 19.6753 16.2446V20.25H15.5811V18.7139H17.9487V16.3779C17.9487 15.485 17.8408 14.846 17.625 14.4609C17.4134 14.0716 17.0389 13.877 16.5015 13.877C16.0063 13.877 15.5895 14.1245 15.251 14.6196C14.9124 15.1274 14.5972 15.9738 14.3052 17.1587L13.5371 20.25H11.709L12.5659 16.9619C12.6717 16.5641 12.7733 16.2087 12.8706 15.8955C12.9722 15.5824 13.0695 15.3136 13.1626 15.0894L11.5884 12.4614H13.4863L14.083 13.5786C14.3369 13.1893 14.6839 12.8846 15.124 12.6646C15.5684 12.4445 16.055 12.3345 16.584 12.3345Z" fill="white"/>
            <defs>
              <linearGradient id="paint0_linear_7_423" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1"/>
                <stop offset="1" stopColor="#8B5CF6"/>
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </header>
  );
}
