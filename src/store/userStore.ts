import { create } from "zustand";

interface UserState {
    nome: string;
    setNome: (nome: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    nome: "",
    setNome: (nome) => set({ nome }),
}));
