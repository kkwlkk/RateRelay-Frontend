'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { useModalStore } from "@/contexts/ModalStoreContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const ModalRenderer = () => {
    const { modalComponent: ModalComponent, modalProps, options, isOpen, closeModal } = useModalStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && options.closable) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, options.closable, closeModal]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open && options.closable) {
                    closeModal();
                }
            }}
        >
            <DialogTitle className="sr-only">
                {options.title || "Modal"}
            </DialogTitle>
            <DialogDescription className="sr-only">
                {options.description || "Modal content"}
            </DialogDescription>
            <DialogContent
                closable={options.closable}
                className={cn(
                    "w-[min(32rem,95vw)] max-h-[95vh] rounded-lg sm:rounded-xl bg-neutral-900",
                    "transition-all duration-200 ease-out",
                    "flex flex-col p-0",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                )}
            >
                <div className="overflow-y-auto flex-1 p-8">
                    <AnimatePresence mode="wait">
                        {ModalComponent && (
                            <motion.div
                                key="modal-content"
                                initial={{ opacity: 0, scale: 0.975, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -5 }}
                                transition={{
                                    type: "spring",
                                    damping: 30,
                                    stiffness: 400,
                                    mass: 0.8
                                }}
                            >
                                <ModalComponent {...modalProps} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalRenderer;