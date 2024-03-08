import { useQuery } from "@tanstack/react-query"

import getVideos from "./getVideos"

export function useGetPosts() {
  return useQuery({
    queryFn: async () => getVideos(),
    queryKey: ["videos"],
  })
}
