import { useModalStore } from "@/contexts/ModalStoreContext";
import { Button } from "../ui/button";


interface ConfirmationModalProps {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    variant?: 'default' | 'destructive';
    isLoading?: boolean;
}

export const ConfirmationModal = ({
    title,
    description,
    confirmLabel = "Potwierdź",
    cancelLabel = "Anuluj",
    onConfirm,
    variant = 'default',
    isLoading = false,
}: ConfirmationModalProps) => {
    const { closeModal } = useModalStore();

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <h2 className="text-2xl text-zinc-300 font-medium">
                    {title}
                </h2>
                {description && (
                    <p className="text-sm text-zinc-300/75">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex justify-end gap-3">
                <Button
                    variant="ghost"
                    onClick={closeModal}
                    disabled={isLoading}
                >
                    {cancelLabel}
                </Button>
                <Button
                    variant={variant}
                    onClick={onConfirm}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};
