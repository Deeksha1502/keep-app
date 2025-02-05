import logo1 from '../Header/logo1.png';

import { IoIosSearch } from 'react-icons/io';
import { MdOutlineRefresh } from 'react-icons/md';
import { FaListUl } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

export const Header = () => {
  return (
    <div className='ml-16'>
      <div className='flex flex-row gap-3 p-3 items-center'>
        <img src={logo1} className='h-10 w-10'></img>

        <div className='text-3xl font-semibold text-gray-500'>Docs</div>

        <div className='relative  flex-grow md:ml-24'>
          <div className='flex-grow'></div>
          <input
            className='block w-60 md:w-[900px] p-4 ps-10 mx-auto text-gray-900 border border-gray-300 rounded-lg bg-gray-50  outline-none text-md '
            placeholder='Search..'
            type='text'
          />
          <IoIosSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-6' />
        </div>
        <div className='flex justify-between gap-8 mx-5  items-center'>
          <div>
            <MdOutlineRefresh className='size-7 text-gray-500' />
          </div>
          <div>
            <FaListUl className='size-7 text-gray-500' />
          </div>
          <div>
            <IoSettingsOutline className='size-7 text-gray-500' />
          </div>
        </div>
      </div>
      <hr className='h-px my-3 bg-gray-200 border-0 dark:bg-gray-700'></hr>
    </div>
  );
};
