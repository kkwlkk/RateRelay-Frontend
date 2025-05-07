import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import { feedbackRewards } from "@/constants/feedbackRewards";

export const PointsInfoSection = () => {
    return (
        <AnimatePresence>
            <motion.div
                className="bg-zinc-50 dark:bg-zinc-800/20 rounded-lg px-6 py-4 mb-4 text-sm overflow-hidden w-full"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                    opacity: { duration: 0.3 }
                }}
            >
                <motion.p
                    className="font-medium text-zinc-900 dark:text-zinc-100 mb-2"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                >
                    System punktów:
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {feedbackRewards.map((reward, index) => (
                        <motion.div
                            key={reward.label}
                            className="flex items-center gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                delay: 0.2 + (index * 0.08),
                                duration: 0.35,
                                ease: "easeOut"
                            }}
                        >
                            <motion.div
                                className="h-8 w-8 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center"
                                whileTap={{
                                    scale: 1.1,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <Award className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                            </motion.div>

                            <div className="min-w-0">
                                <motion.p
                                    className="font-medium text-zinc-800 dark:text-zinc-200 whitespace-normal"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.25 + (index * 0.08), duration: 0.3 }}
                                >
                                    {reward.label}
                                </motion.p>
                                <motion.p
                                    className="text-zinc-600 dark:text-zinc-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 + (index * 0.08), duration: 0.3 }}
                                >
                                    {reward.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};