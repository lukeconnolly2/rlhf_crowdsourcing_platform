export type Video = {
  _id: string
  views: number
  status: "Unreleased" | "Collecting preferences" | "Success" | "Failed"
  requiredViews: number
  public_url: string
  user: string
}
