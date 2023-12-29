'use client'

import { useState, createContext, useEffect, useContext } from "react"
import { UserContextProps } from "@/types/user-context";
import { useUser } from '@clerk/nextjs';

const UserContext = createContext<UserContextProps>({ userData: {} });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState({});
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
      if (isSignedIn && user && isLoaded) {
        const fetchData = async () => {
          const data = await fetch(`/api/getUserData?user=${user?.primaryEmailAddress?.emailAddress}`).then(res => res.json());
          setUserData(data);
        };
  
        fetchData();
      }

    }, [isSignedIn, user, isLoaded]);
  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);