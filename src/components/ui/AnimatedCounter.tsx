import { cn } from "@/lib/utils";
import { useSpring, useTransform, motion, HTMLMotionProps } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedCounterProps = {
    value: number;
    duration?: number;
    formatter?: (value: number) => string;
} & Omit<HTMLMotionProps<"span">, "value" | "duration" | "formatter">;

export const AnimatedCounter = ({ 
    value, 
    duration = 1,
    formatter = (v) => `${v}`,
    className,
    ...props
}: AnimatedCounterProps) => {
    const spring = useSpring(0, { 
        damping: 30, 
        stiffness: 100,
        duration: duration * 1000
    });
    const display = useTransform(spring, (current) => Math.round(current));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    useEffect(() => {
        const unsubscribe = display.on('change', (latest) => {
            setDisplayValue(latest);
        });
        return unsubscribe;
    }, [display]);

    return (
        <motion.span
            className={cn(
                "inline-block tabular-nums",
                className
            )}
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {formatter(displayValue)}
        </motion.span>
    );
};