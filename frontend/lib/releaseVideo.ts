import { revalidatePath } from "next/cache"

export function releaseVideo(videoId: string) {
  fetch("/api/release", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId: videoId }),
  })
  revalidatePath("/developer")
}
