import { ViaCepResponse } from "@/types/ViaCepResponse";

export async function fetchCep(cep: string): Promise<ViaCepResponse> {
    const sanitizedCep = cep.replace(/\D/g, "");

    try {
        const response = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);

        if (!response.ok) {
            throw new Error("Erro ao conectar com a API")
        }

        const data: ViaCepResponse = await response.json()

        if (data.erro) {
            throw new Error("CEP não encontrado")
        }

        return data

    } catch (error) {
        throw new Error ("Erro geral: " + (error as Error).message)
    }
}
