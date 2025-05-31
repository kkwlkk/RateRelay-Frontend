import { Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const NoBusinessFound = ({ isRefreshing }: { isRefreshing: boolean, onRefresh: () => void }) => {
    const messages = [
        "Sprawdzamy dostępne firmy...",
        "Chwilowo pusto w kolejce...",
        "Szukamy dla Ciebie biznesów...",
    ];

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [messages.length]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const backgroundElements = [
        { type: 'dot', size: 2, x: 15, y: 20, duration: 4, delay: 0 },
        { type: 'dot', size: 1, x: 85, y: 25, duration: 5, delay: 1 },
        { type: 'dot', size: 1.5, x: 25, y: 75, duration: 3.5, delay: 0.5 },
        { type: 'dot', size: 1, x: 75, y: 80, duration: 4.5, delay: 2 },
        { type: 'circle', size: 12, x: 10, y: 15, duration: 8, delay: 0 },
        { type: 'circle', size: 8, x: 90, y: 70, duration: 6, delay: 3 },
        { type: 'line', x: 20, y: 40, duration: 7, delay: 1.5 },
        { type: 'line', x: 80, y: 50, duration: 5, delay: 2.5 },
    ];

    return (
        <div className="size-full flex items-center justify-center p-4 relative overflow-hidden select-none">
            {backgroundElements.map((element, i) => {
                if (element.type === 'dot') {
                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-zinc-300/60 dark:bg-zinc-600/60"
                            style={{
                                width: `${element.size}px`,
                                height: `${element.size}px`,
                                left: `${element.x}%`,
                                top: `${element.y}%`,
                            }}
                            animate={{
                                y: [-8, 12, -8],
                                x: [-3, 6, -3],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: element.duration,
                                repeat: Infinity,
                                delay: element.delay,
                                ease: "easeInOut"
                            }}
                        />
                    );
                } else if (element.type === 'circle') {
                    return (
                        <motion.div
                            key={i}
                            className="absolute border border-zinc-200/40 dark:border-zinc-700/40 rounded-full"
                            style={{
                                width: `${element.size}px`,
                                height: `${element.size}px`,
                                left: `${element.x}%`,
                                top: `${element.y}%`,
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.2, 0.5, 0.2],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: element.duration,
                                repeat: Infinity,
                                delay: element.delay,
                                ease: "linear"
                            }}
                        />
                    );
                } else if (element.type === 'line') {
                    return (
                        <motion.div
                            key={i}
                            className="absolute w-6 h-px bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent dark:via-zinc-600/50"
                            style={{
                                left: `${element.x}%`,
                                top: `${element.y}%`,
                            }}
                            animate={{
                                scaleX: [0.5, 1, 0.5],
                                opacity: [0.2, 0.6, 0.2],
                                x: [-10, 10, -10]
                            }}
                            transition={{
                                duration: element.duration,
                                repeat: Infinity,
                                delay: element.delay,
                                ease: "easeInOut"
                            }}
                        />
                    );
                }
                return null;
            })}

            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }}
                />
            </div>

            <motion.div
                className="w-full max-w-md relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="bg-white/95 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-8 shadow-lg shadow-zinc-900/5 dark:shadow-zinc-950/20"
                    whileHover={{
                        y: -2,
                        transition: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                >
                    <motion.div
                        className="flex justify-center mb-6"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="relative w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-inner"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            {isRefreshing && (
                                <motion.div
                                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-700 rounded-2xl"
                                    animate={{
                                        opacity: [0.5, 0.8, 0.5],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            )}

                            <motion.div
                                animate={isRefreshing ? { rotate: 360 } : {}}
                                transition={{
                                    duration: 2,
                                    repeat: isRefreshing ? Infinity : 0,
                                    ease: "linear"
                                }}
                            >
                                <Store className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <div className="text-center space-y-4">
                        <motion.h2
                            className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 m-0"
                            variants={itemVariants}
                        >
                            Brak dostępnych firm
                        </motion.h2>
                        <motion.div
                            className="p-0 m-0 py-4"
                            variants={itemVariants}
                        >
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={messageIndex}
                                    className="text-sm text-zinc-600 dark:text-zinc-400"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {messages[messageIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </motion.div>

                        <motion.p
                            className="text-xs text-zinc-500 leading-relaxed"
                            variants={itemVariants}
                        >
                            Aktualnie nie ma firm do oceny w Twojej kolejce.<br />
                            Sprawdź ponownie za kilka minut.
                        </motion.p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};