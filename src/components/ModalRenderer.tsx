'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { useModalStore } from "@/contexts/ModalStoreContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ModalRenderer = () => {
    const { modalComponent: ModalComponent, modalProps, options, isOpen, closeModal } = useModalStore();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open && options.closable) {
                    closeModal();
                }
            }}
        >
            <DialogTitle />
            <DialogDescription />
            <DialogContent
                closable={options.closable}
                className={cn(
                    "w-[min(30rem,95vw)] rounded-lg sm:rounded-xl bg-neutral-900",
                    "transition-all duration-200 ease-out overflow-hidden"
                )}
            >
                <AnimatePresence mode="wait">
                    {ModalComponent && (
                        <motion.div
                            key="modal-content"
                            initial={{ opacity: 0, scale: 0.975 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
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
            </DialogContent>
        </Dialog>
    );
};

export default ModalRenderer;