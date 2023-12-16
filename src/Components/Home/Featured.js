import React from 'react';
import { FaLaptop, FaClock, FaUser, FaBell, FaLock } from 'react-icons/fa';

const Features = () => {
  return (
    <div id='features' className='bg-sky-700 text-white py-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-4xl font-bold mb-8 text-center text-white'>
          Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sky-500'>
          <FeatureCard
            icon={<FaLaptop />}
            title='Room Booking System'
            description='Efficiently manage and book rooms for various purposes.'
          />
          <FeatureCard
            icon={<FaClock />}
            title='Real-Time Availability'
            description='Instantly check the availability of rooms in real-time.'
          />
          <FeatureCard
            icon={<FaUser />}
            title='Easy Reservation Process'
            description='Simplified and user-friendly room reservation process.'
          />
          <FeatureCard
            icon={<FaBell />}
            title='Notification Alerts'
            description='Receive alerts and notifications for your room bookings.'
          />
          <FeatureCard
            icon={<FaLock />}
            title='Secure Data Handling'
            description='Ensuring the security and privacy of your information.'
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-center'>
      <div className='mb-3 text-[#2cbcff] text-3xl'>{icon}</div>
      <h3 className='text-xl font-semibold mb-3'>{title}</h3>
      <p className='text-gray-700'>{description}</p>
    </div>
  );
};

export default Features;