import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";

export interface StatItem {
    value: number;
    suffix?: string;
    label: string;
    description: string;
    icon: React.ReactNode;
}

interface StatItemProps extends StatItem {
    index: number;
}

export const StatItem = ({ value, suffix = '', label, description, icon, index }: StatItemProps) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const springValue = useSpring(0, { damping: 30, stiffness: 100 });

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        const unsubscribe = springValue.onChange(v => setCount(Math.floor(v)));
        return () => unsubscribe();
    }, [springValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 h-full border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {icon}
                </div>
                <motion.div
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                    {count}{suffix}
                </motion.div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {label}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}