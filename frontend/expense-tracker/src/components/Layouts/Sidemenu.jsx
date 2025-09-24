import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { SIDE_MENU_DATA } from '../../utils/data';


const Sidemenu = ({ activeMenu, setActiveMenu }) => {
    const{user,clearUser} = React.useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    // keep active menu in sync with current path
    React.useEffect(() => {
        const current = SIDE_MENU_DATA.find(i => i.path === location.pathname || (i.path !== 'logout' && location.pathname.startsWith(i.path)));
        if(current){
            setActiveMenu?.(current.label);
        }
    }, [location.pathname, setActiveMenu]);

    const handleclick = (item) => {
        const { path, label } = item;
        setActiveMenu?.(label);
        if(path === "logout"){
            handleLogout();
            return;
        }
        navigate(path);
    };
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    }
  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 '>
       <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        { (user?.profileImageUrl || user?.profileimageURL) ? (
            <img 
                src={user?.profileImageUrl || user?.profileimageURL || ""}
                alt= "User"
                className='w-20 h-20 bg-slate-400 rounded-full'
            />
        ) : (
            <div className='w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center'>
                <span className='text-xl text-gray-600'>
                    {user?.fullName ? user.fullName.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U'}
                </span>
            </div>
        )}

        <h5 className='text-gray-950 font-medium leading-6'>
            {user?.fullName || user?.fullname || "User"}
        </h5>

       </div>
       {SIDE_MENU_DATA.map((item,index) => (
        <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? 'text-white bg-violet-600' : ''} py-3 px-6 rounded-lg mb-3`}  

            onClick={() => {
                handleclick(item);
            }}
        >
           <item.icon className="text-xl"/>
           {item.label}
        </button>
       ))}
       
    </div>
  );
}

export default Sidemenu;
