"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

import { UserContextProps } from "@/types/user-context"

const UserContext = createContext<UserContextProps>({
  userData: {
    videos: [],
    default_required_views: 1,
  },
  refreshData: () => {},
})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState({
    videos: [],
    default_required_views: 1,
  })
  const { isSignedIn, user, isLoaded } = useUser()

  const fetchData = async () => {
    if (isSignedIn && user && isLoaded) {
      const data = await fetch(
        `/api/getUserData?user=${user?.primaryEmailAddress?.emailAddress}`
      ).then((res) => res.json())
      console.log(data)
      setUserData(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [isSignedIn, user, isLoaded])

  const refreshData = () => {
    fetchData()
  }

  return (
    <UserContext.Provider value={{ userData, refreshData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserData = () => useContext(UserContext)
