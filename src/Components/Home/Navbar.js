import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../../Images/Click Room 1.png';

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='bg-[#002D74]'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <div className='flex items-center'>
          <img src={logo} alt='click room logo' className="w-12 h-12" />
          <h1 className='ml-2 text-2xl font-bold'>Click Room</h1>
        </div>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul className={nav ? 'flex flex-col md:flex-row fixed left-0 top-24 w-full md:w-auto bg-[#002D74] md:bg-transparent md:border-0 ease-in-out duration-500' : 'hidden md:flex ease-in-out duration-500'}>
          <li className='mx-2 my-2 md:my-0'>
            <a href='#' className='text-white hover:text-[#2cbcff] transition duration-300'>
              Home
            </a>
          </li>
          <li className='mx-2 my-2 md:my-0'>
            <a href='#about' className='text-white hover:text-[#2cbcff] transition duration-300'>
              About
            </a>
          </li>
          <li className='mx-2 my-2 md:my-0'>
            <a href='#features' className='text-white hover:text-[#2cbcff] transition duration-300'>
              Features
            </a>
          </li>
          <li className='mx-2 my-2 md:my-0'>
            <a href='#benefits' className='text-white hover:text-[#2cbcff] transition duration-300'>
              Benefits
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};