import React from 'react';
import chart1 from '../../assets/chart1.png';
import { LuTrendingUpDown } from 'react-icons/lu';
const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}
      </div>
      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 '/>
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10'/>
        <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute bottom-7 -left-5'/>

        <div className='grid grid-cols-1 z-20'>
            <StatsInfoCard
               icon={<LuTrendingUpDown/>}
                title={"Track your Income & Expenses"}
                value="450 000"
                color="purple"
            />
        </div>

        <img 
          src={chart1} 
          alt="The chart" 
          className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 '
        />

      </div>
    </div>
  );
}

export default AuthLayout;

const StatsInfoCard = ({ icon, title, value, color }) => {
  return <div className='flex gap-6 bg-white p-4 rounded-xl shadow-purple-400/10 border border-gray-200/10 z-10 '>
    <div className={`w-12 h-12 flex items-center justify-center text-[26px] bg-${color}-100  text-${color}-600 rounded-full drop-shadow-2xl`} >
        {icon}
    </div>
    <div>
    <h6 className='text-xs text-gray-500 mb-1'>{title}</h6>
    <span className='text-[20px]'>${value}</span>
    </div>
</div>
}
