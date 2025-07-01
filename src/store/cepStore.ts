import { create } from "zustand";
import { fetchCep } from "@/lib/fetchCep";
import { ViaCepResponse } from "@/types/ViaCepResponse";

interface CepState {
    cep: string;
    resultado: ViaCepResponse | null;
    loading: boolean;
    erro: string;
    setCep: (value: string) => void;
    buscarCep: () => Promise<void>;
}

export const useCepStore = create<CepState>((set, get) => ({
    cep: "",
    resultado: null,
    loading: false,
    erro: "",
    setCep: (value) => set({ cep: value }),
    buscarCep: async () => {
        const cep = get().cep;
        set({ loading: true, erro: "", resultado: null });
        try {
            const data = await fetchCep(cep);
            set({ resultado: data });
        } catch (error: any) {
            set({ erro: error.message });
        } finally {
            set({ loading: false });
        }
    },
}));
