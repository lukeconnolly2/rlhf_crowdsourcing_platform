export interface EditableNumberCardItem {
    number: number
    title: string
    description: string
    className?: string
    min: number
    max: number
  }

export type Video = {
    id: string;
    views: number;
    status: "Unreleased" | "Collecting preferences" | "Success" | "Failed";
};
