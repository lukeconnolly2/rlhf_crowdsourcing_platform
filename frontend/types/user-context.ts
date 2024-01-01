import { Video } from "types/video"

export interface UserContextProps {
  userData: UserContextUserData
  refreshData: () => void
}

interface UserContextUserData {
  role?: string
  key?: string
  videos: Video[]
}
