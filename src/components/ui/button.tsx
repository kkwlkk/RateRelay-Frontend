import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-border bg-background/20 text-foreground hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                xs: "h-8 rounded-md px-2 text-xs",
                sm: "h-9 rounded-md px-3 text-sm",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
            textAlign: {
                inherit: "justify-start",
                center: "",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            textAlign: "center",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean,
    loading?: boolean,
    icon?: React.ReactNode,
    iconPosition?: 'start' | 'end',
    textAlign?: 'inherit' | 'center'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, textAlign, asChild = false, loading, icon, iconPosition = 'start', children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, textAlign }),
                    loading && "cursor-not-allowed",
                    className
                )}
                disabled={loading || props.disabled}
                ref={ref}
                {...props}
            >
                {loading && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />}
                {!loading && icon && iconPosition === 'start' && icon}
                {children}
                {!loading && icon && iconPosition === 'end' && icon}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }