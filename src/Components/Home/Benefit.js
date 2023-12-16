import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import icon2 from '../../Images/icon2.png';

export default function Benefit() {
  return (
    <div id='benefits' className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <div className='flex flex-col justify-center'>
          <h1 className='text-sky-500 md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Benefit Of Click Room</h1>
          <ul className='list-inside list-disc '>
            <li className='mb-3 flex items-center'>
              <FontAwesomeIcon icon={faCheck} className='text-sky-500 mr-2' />
              <h3 className='text-sky-500 text-xl font-medium'>Assist students in borrowing rooms online</h3>
            </li>
            <li className='mb-3 flex items-center'>
              <FontAwesomeIcon icon={faCheck} className='text-sky-500 mr-2' />
              <h3 className='text-sky-500 text-xl font-medium'>Assist students in knowing the availability of lecture rooms</h3>
            </li>
            <li className='mb-3 flex items-center'>
              <FontAwesomeIcon icon={faCheck} className='text-sky-500 mr-2' />
              <h3 className='text-sky-500 text-xl font-medium'>Overcoming student miscommunication in borrowing the room </h3>
            </li>
            <li className='mb-3 flex items-center'>
              <FontAwesomeIcon icon={faCheck} className='text-sky-500 mr-2' />
              <h3 className='text-sky-500 text-xl font-medium'>Provide information about the availability of equipment in the room</h3>
            </li>
          </ul>
        </div>
        <img className='w-[500px] mx-auto my-4' src={icon2} alt='/' />
      </div>
    </div>
  );
};