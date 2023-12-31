'use client'

import { useState, createContext, useEffect, useContext } from "react"
import { UserContextProps } from "@/types/user-context";
import { useUser } from '@clerk/nextjs';

const UserContext = createContext<UserContextProps>({ 
  userData: {},
  refreshData: () => {}
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState({});
  const { isSignedIn, user, isLoaded } = useUser();

  const fetchData = async () => {
    if (isSignedIn && user && isLoaded) {
      const data = await fetch(`/api/getUserData?user=${user?.primaryEmailAddress?.emailAddress}`).then(res => res.json());
      setUserData(data);
    }
  };

  useEffect(() => {
        fetchData();
    }, [isSignedIn, user, isLoaded]);

  const refreshData = () => {
    console.log("refreshing data");
    fetchData();
  };
    
  return (
    <UserContext.Provider value={{ userData, refreshData }}>
      {children}
    </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);