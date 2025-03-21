import React, { useState } from 'react';
import userIcon  from '../assets/user-icon.png';

const ProfileInfo = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-blue-500 font-medium drop-shadow' onClick={()=> setOpen(!open)}><img src={userIcon}/></div>
        {open && (<div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Welcome, {user.username}</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">About</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">Settings</a>
            <form method="POST" action="#" role="none">
                <button type="submit" class="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3" onClick={onLogout}>Sign out</button>
            </form>
            </div>
        </div>)}
    </div>
  );
};

export default ProfileInfo;