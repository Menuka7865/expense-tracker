import React,{createContext,useState,useCallback,useMemo} from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);

    //function to update user data
    const updateUser = useCallback((userData) => {
        setUser(userData);
    }, []);

    //function to clear user data on logout
    const clearUser = useCallback(() => {
        setUser(null);
    }, []);

    const contextValue = useMemo(() => ({ user, updateUser, clearUser }), [user, updateUser, clearUser]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;
