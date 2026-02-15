import { Bell } from 'lucide-react';
import logo from '../assets/logo.png';

export function Header() {
  return (
    <header dir="rtl" className="header flex flex-row items-center justify-between w-full px-8 py-3">
      {/* Logo and Text - Right side */}
      <div className="flex flex-row items-center gap-[10px] w-[180px] h-[34px]">
        <span className="flex flex-col items-end w-[131px] h-[24px] text-[16px] font-bold font-jakarta text-gray-900 tracking-[-0.32px] leading-[24px] text-right">Feature Requests</span>
        <div className="flex flex-row justify-end items-center w-[34px] h-[34px] rounded-xl bg-gradient-avatar">
          <img src={logo} alt="Logo" className="w-[25px] h-[25px]" />
        </div>
      </div>

      {/* User Actions - Left side */}
      <div className="flex flex-row items-center gap-2 w-[1250px] h-[36px] justify-end">
        <div className="flex flex-row items-center justify-center w-8 h-8 rounded-[16px] bg-gradient-avatar">
          <span className="text-white text-[13px] font-semibold font-jakarta">מ</span>
        </div>
        <button className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-300 " />
        </button>
      </div>
    </header>
  );
}
