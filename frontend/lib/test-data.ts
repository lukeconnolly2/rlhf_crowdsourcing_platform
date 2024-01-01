import { Video } from "@/types/video"

export const testVideos: Video[] = [
  { id: "v1", views: 0, status: "Unreleased", requiredViews: 1 },
  { id: "v2", views: 1, status: "Collecting preferences", requiredViews: 2 },
  { id: "v3", views: 2, status: "Success", requiredViews: 2 },
  { id: "v4", views: 3, status: "Failed", requiredViews: 2 },
  { id: "v5", views: 0, status: "Unreleased", requiredViews: 1 },
  { id: "v6", views: 1, status: "Collecting preferences", requiredViews: 2 },
  { id: "v7", views: 2, status: "Success", requiredViews: 2 },
  { id: "v8", views: 3, status: "Failed", requiredViews: 2 },
  { id: "v9", views: 0, status: "Unreleased", requiredViews: 1 },
  { id: "v10", views: 1, status: "Collecting preferences", requiredViews: 2 },
  { id: "v11", views: 2, status: "Unreleased", requiredViews: 2 },
  { id: "v12", views: 3, status: "Collecting preferences", requiredViews: 2 },
  { id: "v13", views: 0, status: "Success", requiredViews: 1 },
  { id: "v14", views: 1, status: "Failed", requiredViews: 2 },
]
