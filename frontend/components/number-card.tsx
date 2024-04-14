"use client"

import { EditableNumberCardItem } from "@/types/number-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NumberCard({
  number,
  title,
  description,
  min,
  max,
  className,
  ...props
}: EditableNumberCardItem) {
  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-10 items-center">
        <p className="font-extrabold text-5xl">{number}</p>
        {props.children}
      </CardContent>
    </Card>
  )
}
