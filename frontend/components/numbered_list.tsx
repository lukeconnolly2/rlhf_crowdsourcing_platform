import React, { ReactNode } from "react"

type NumberedListItemProps = {
  number: number
  children: ReactNode
}

function NumberedListItem({ number, children }: NumberedListItemProps) {
  return (
    <section>
      <div className="rounded-full bg-accent-foreground text-background h-10 w-10 flex items-center justify-center">
        {number}
      </div>
      <div className="container mx-auto p-5 ml-5 border-l-2">{children}</div>
    </section>
  )
}

export default NumberedListItem
