"use client"

import { useCepStore } from "@/store/cepStore"
import { cepSchema } from "@/lib/cepSchema"
import { useState } from "react"

export default function BuscarCepPage() {
    const { cep, setCep, resultado, erro, loading, buscarCep } = useCepStore()
    const [validacaoErro, setValidacaoErro] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = cepSchema.safeParse({ cep })

        if (!result.success) {
            setValidacaoErro(result.error.errors[0].message)
            return
        }

        setValidacaoErro("")
        await buscarCep()
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <h1 className="text-xl font-bold mb-4">Buscar CEP</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Digite o CEP (apenas números)"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded" disabled={loading}>
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </form>

            {validacaoErro && <p className="text-red-500 mt-2">{validacaoErro}</p>}
            
            {erro && <p className="text-red-600 mt-4">{erro}</p>}

            {resultado && (
                <div className="mt-6 border p-4 rounded bg-gray-100">
                    <p><strong>Rua:</strong> {resultado.logradouro}</p>
                    <p><strong>Bairro:</strong> {resultado.bairro}</p>
                    <p><strong>Cidade:</strong> {resultado.localidade}</p>
                    <p><strong>Estado:</strong> {resultado.uf}</p>
                    <p><strong>DD:</strong> {resultado.ddd}</p>
                </div>
            )}
        </div>
    )
}
