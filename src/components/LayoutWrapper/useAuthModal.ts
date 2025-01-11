import {createContext, useContext} from "react";
import {AuthModalMode} from "../AuthModal/AuthModal.tsx";

type AuthModalContextType = {
    openModal: (mode: AuthModalMode) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const useAuthModal = () => {
    const context = useContext(AuthModalContext);

    if(!context) throw new Error("useAuthModal must be used within useAuthModal");

    return context;
}

export const AuthModalProvider = AuthModalContext.Provider;