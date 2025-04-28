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
                default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90",
                outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground dark:border-border dark:bg-background dark:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline dark:text-primary-foreground",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
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
                    buttonVariants({ variant, size, textAlign, className }),
                    loading && "cursor-wait",
                    className
                )}
                disabled={loading || props.disabled}
                ref={ref}
                {...props}
            >
                {loading && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
                {!loading && icon && iconPosition === 'start' && icon}
                {children}
                {!loading && icon && iconPosition === 'end' && icon}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
