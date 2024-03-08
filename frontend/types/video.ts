export type Video = {
  _id: string
  views: number
  status: "Unreleased" | "Collecting preferences" | "Success" | "Failed"
  required_views: number
  public_url: string
  user: string
  preferences: Preference[]
}

export type Preference = {
  preference: number[]
  user: string
}
