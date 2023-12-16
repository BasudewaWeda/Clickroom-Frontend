import React from 'react';
import backgroundImage from '../../Images/bg.png';

export default function Hero(props) {
  return (
    <div
      className='text-white'
      style={{ background: `url(${backgroundImage}) center/cover fixed no-repeat` }}
      id='hero'
    >
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-sky-500 font-bold text-lg mb-2'>
          WANT TO BORROW A ROOM?
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold mb-4'>
          Click Room
        </h1>
        <div className='flex justify-center items-center mb-6'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold text-gray-200'>
            Fast, Flexible, And Safe
          </p>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500 mb-8'>
          What are you waiting for? Access it now
        </p>
        <button onClick={() => props.modifyScreenIndexFunc(1)} className='bg-[#2cbcff] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white hover:shadow-lg hover:bg-zinc-50 hover:text-sky-500 transition duration-75'>
          Click Here
        </button>
      </div>
    </div>
  );
};