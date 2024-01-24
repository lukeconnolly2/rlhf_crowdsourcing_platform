import { useQuery } from "@tanstack/react-query"

import getReleasedVideos from "./getReleasedVideos"

export function useGetReleasedVideos() {
  return useQuery({
    queryFn: async () => getReleasedVideos(),
    queryKey: ["releasedVideos"],
  })
}
