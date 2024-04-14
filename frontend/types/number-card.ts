export interface EditableNumberCardItem {
  number: number
  title: string
  description: string
  className?: string
  min: number
  max: number
  serverAction?: (formData: FormData) => Promise<void>
  children?: React.ReactNode
}
