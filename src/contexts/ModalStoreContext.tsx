import React, { createContext, useContext, useState, ComponentType, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";

type ModalOptions = {
    description: string;
    title: string;
    closable: boolean;
    forceOpen?: boolean;
};

type ModalState = {
    modalComponent: ComponentType<unknown> | null;
    modalProps: object;
    options: ModalOptions;
    isOpen: boolean;
    openedComponentName: string | null;
};

type ModalActions = {
    openModal: <T extends object>(
        component: ComponentType<T>,
        props?: T,
        options?: ModalOptions
    ) => void;
    closeModal: () => void;
    updateModal: <T extends object>(props: Partial<T>) => void;
};

type ModalContextType = ModalState & ModalActions;

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [modalState, setModalState] = useState<ModalState>({
        modalComponent: null,
        modalProps: {},
        options: {
            closable: true,
            description: "",
            title: ""
        },
        isOpen: false,
        openedComponentName: null,
    });

    const openModal = <T extends object>(
        component: ComponentType<T>,
        props?: T,
        options: ModalOptions = {
            closable: true,
            description: "",
            title: ""
        }
    ) => {
        const componentName = component.displayName || component.name || "UnknownComponent";

        if (modalState.openedComponentName === componentName && !options.forceOpen) {
            return;
        }

        setModalState({
            modalComponent: component as ComponentType<unknown>,
            modalProps: props || {},
            options,
            isOpen: true,
            openedComponentName: componentName,
        });
    };

    const closeModal = () => {
        setModalState({
            modalComponent: null,
            modalProps: {},
            options: {
                closable: true,
                description: "",
                title: ""
            },
            isOpen: false,
            openedComponentName: null,
        });
    };

    const updateModal = <T extends object>(props: Partial<T>) => {
        setModalState(prev => ({
            ...prev,
            modalProps: {
                ...(prev.modalProps as T),
                ...props,
            },
        }));
    };

    const contextValue: ModalContextType = {
        ...modalState,
        openModal,
        closeModal,
        updateModal,
    };

    useEffect(() => {
        if (!isAuthenticated && modalState.isOpen) {
            closeModal();
        }
    }, [isAuthenticated, modalState.isOpen]);

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalStore = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModalStore must be used within a ModalProvider");
    }
    return context;
};