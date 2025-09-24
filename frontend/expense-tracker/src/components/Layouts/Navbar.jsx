import React from 'react';
import {HiOutlineMenu,HiOutlineX} from 'react-icons/hi';
import Sidemenu from './Sidemenu';


const Navbar = () => {
    const[openSideMenu,setOpenSideMenu] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState(null);
  return (
    <div className='flex gap-5 bg-white border border-b border-gary-200/50 backdrop-blur-[2px] px-7 py-4 sticky top-0 z-30 '>
        <button
         className='block md:hidden text-black'
         onClick={()=> setOpenSideMenu(!openSideMenu)}
        >
            {openSideMenu ? (<HiOutlineX className='text-2xl'/>) : (<HiOutlineMenu className='text-2xl'/>)}
        </button>

        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white'>
                <Sidemenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            </div>
        )}
  
    </div>
  );
}

export default Navbar;
