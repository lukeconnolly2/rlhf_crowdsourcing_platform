export default async function getVideos() {
  const res = await fetch(`http://${process.env.ORCHESTRATOR_URL}/video`, {
    cache: "no-store",
  })
  const json = await res.json()
  return json
}
