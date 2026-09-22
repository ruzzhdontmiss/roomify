import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c8b72] disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-[#1d3024] text-white hover:-translate-y-0.5 hover:bg-[#314a39] hover:shadow-[0_12px_25px_rgba(29,48,36,.18)]",
      outline: "border border-[#1d3024]/15 bg-white/30 text-[#1d3024] hover:border-[#1d3024]/40 hover:bg-white",
      ghost: "text-[#1d3024] hover:bg-[#e9f0e8]"
    },
    size: { default: "h-12 px-6", sm: "h-9 px-4 text-xs", lg: "h-14 px-7" }
  },
  defaultVariants: { variant: "default", size: "default" }
})

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? "span" : "button"
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
