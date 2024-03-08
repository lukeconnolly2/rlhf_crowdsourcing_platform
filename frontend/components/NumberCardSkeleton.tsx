import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Skeleton } from "./ui/skeleton"

interface NumberCardSkeletonProps {
  title: string
  description: string
}

function NumberCardSkeleton({ title, description }: NumberCardSkeletonProps) {
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-5">
          <Skeleton className="h-12 w-1/12" />
        </CardContent>
      </Card>
    </div>
  )
}
export default NumberCardSkeleton
