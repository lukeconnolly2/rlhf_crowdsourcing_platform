"use client"

import { createContext, useContext, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

const UserContext = createContext({})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSignedIn, user, isLoaded } = useUser()

  const fetchData = async () => {
    if (isSignedIn && user && isLoaded) {
      fetch(
        `/api/addUser?user=${user?.primaryEmailAddress?.emailAddress}`
      ).then((res) => res.json())
    }
  }

  useEffect(() => {
    fetchData()
  }, [isSignedIn, user, isLoaded])

  return (
    <UserContext.Provider value={{ null: null }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserData = () => useContext(UserContext)
