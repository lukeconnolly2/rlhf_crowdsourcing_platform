import getReleasedVideos from "@/lib/getReleasedVideos"

async function Video() {
  const videos = await getReleasedVideos()
  return (
    <video controls className="w-full">
      <source src={videos[0].public_url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default Video
