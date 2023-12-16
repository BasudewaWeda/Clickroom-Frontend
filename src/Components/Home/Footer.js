import React from 'react';
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='bg-sky-700'>
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-white'>
      <div>
        <h1 className='w-full text-3xl font-bold text-white'>Click Room</h1>
        <p className='py-4'>Click Room is a web application to resolve overlapping room loans on campus, ensure the effectiveness of activities, and prevent fatal consequences.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
    <div>
        <h6 className='font-semibold text-white'>Solutions</h6>
        <ul>
            <li className='py-2 text-sm'>Fast</li>
            <li className='py-2 text-sm'>Flexible</li>
            <li className='py-2 text-sm'>Safe</li>
        </ul>
    </div>
    <div>
        <h6 className='font-semibold text-white'>Support</h6>
        <ul>
            <li className='py-2 text-sm'>Pricing</li>
            <li className='py-2 text-sm'>Documentation</li>
            <li className='py-2 text-sm'>Guides</li>
            <li className='py-2 text-sm'>API Status</li>
        </ul>
    </div>
    <div>
        <h6 className='font-semibold text-white'>Company</h6>
        <ul>
            <li className='py-2 text-sm'>About</li>
            <li className='py-2 text-sm'>Blog</li>
            <li className='py-2 text-sm'>Jobs</li>
            <li className='py-2 text-sm'>Press</li>
            <li className='py-2 text-sm'>Careers</li>
        </ul>
    </div>
    <div>
        <h6 className='font-semibold text-white'>Legal</h6>
        <ul>
            <li className='py-2 text-sm'>Claim</li>
            <li className='py-2 text-sm'>Policy</li>
            <li className='py-2 text-sm'>Terms</li>
        </ul>
    </div>
      </div>
    </div>
    </div>
  );
};