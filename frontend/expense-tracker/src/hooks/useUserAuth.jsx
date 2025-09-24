import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';


export const useUserAuth = () => {
    const{user,updateUser,clearUser} = React.useContext(UserContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(user) return; 

        let isMounted = true;

        const fetchUserinfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if(isMounted && response.data){
                    updateUser(response.data);
                }
        }catch (error) {
            console.error('Fetch user error:', error);  
            if(isMounted){
                clearUser();
                navigate('/login');
            }
        }
        };
        fetchUserinfo();

        return () => {
            isMounted = false;
        };
    }, [user, updateUser,clearUser,navigate]);

};
       