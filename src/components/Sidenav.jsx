import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

export const Sidenav = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-100 transition-all duration-300 ease-in-out overflow-hidden z-50 ${
        expanded ? 'w-96' : 'w-16'
      }`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className='text-2xl p-2 cursor-pointer'>
        <RxHamburgerMenu className='size-7 text-gray-500' />
      </div>
      {setExpanded && (
        <ul className={`list-none p-0 m-0 ${expanded ? 'block' : 'hidden'}`}>
          <li className='p-3 hover:bg-gray-200 cursor-pointer '>Home</li>
          <li className='p-3 hover:bg-gray-200 cursor-pointer '>Documents</li>
          <li className='p-3 hover:bg-gray-200 cursor-pointer '>Settings</li>
          <li className='p-3 hover:bg-gray-200 cursor-pointer '>Help</li>
        </ul>
      )}
    </div>
  );
};
