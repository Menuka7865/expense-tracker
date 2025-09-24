import React from 'react';
import Navbar from './Navbar';
import Sidemenu from './Sidemenu';
import { UserContext } from '../../context/userContext';

const DashboardLayout = ({children,activemenu}) => {
    const {user} = React.useContext(UserContext);
  return (
    <div className=''>
        <Navbar activemenu={activemenu}/>

        {user && (
            <div className='flex'>
                <div className="max-[1080px]:hidden">
                    <Sidemenu activemenu={activemenu}/>
                </div>
                <div className='grow mx-5'>
                    {children}
                </div>
            </div>

        )};
      
    </div>
  );
}

export default DashboardLayout;
