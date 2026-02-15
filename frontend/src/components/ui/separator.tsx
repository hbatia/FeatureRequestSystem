import * as React from "react"
import { cn } from "../../lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("shadcn-separator h-[1px] w-full bg-[#E5E5E5] my-8", className)}
      {...props}
    />
  )
)
Separator.displayName = "Separator"
