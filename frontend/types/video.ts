export type Video = {
    id: string;
    views: number;
    status: "Unreleased" | "Collecting preferences" | "Success" | "Failed";
    requiredViews: number;
};