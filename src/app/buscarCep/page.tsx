"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import { useCepStore } from "@/store/cepStore"
import { cepSchema } from "@/lib/cepSchema"
import { ViaCepResponse } from "@/types/ViaCepResponse"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { FaRegTrashCan } from "react-icons/fa6";

export default function BuscarCep() {
    const { cep, setCep, erro, loading, buscarCep } = useCepStore()
    const [validacaoErro, setValidacaoErro] = useState("")
    const [historico, setHistorico] = useState<string[]>([])
    const [detalheAberto, setDetalheAberto] = useState<string | null>(null)
    const [resultadosPorCep, setResultadosPorCep] = useState<Record<string, ViaCepResponse>>({})

    useEffect(() => {
        const historicoSalvo = localStorage.getItem("historico")
        const resultadoSalvos = localStorage.getItem("resultadosPorCep")

        if (historicoSalvo) setHistorico(JSON.parse(historicoSalvo))
        if (resultadoSalvos) setResultadosPorCep(JSON.parse(resultadoSalvos))
    }, [])

    useEffect(() => {
        localStorage.setItem("historico", JSON.stringify(historico))
    }, [historico])

    useEffect(() => {
        localStorage.setItem("resultadosPorCep", JSON.stringify(resultadosPorCep))
    }, [resultadosPorCep])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = cepSchema.safeParse({ cep })

        if (!result.success) {
            setValidacaoErro(result.error.errors[0].message)
            return
        }

        setValidacaoErro("")

        const resultadoCep = await buscarCep()

        if (resultadoCep) {
            setResultadosPorCep((prev) => ({
                ...prev,
                [cep]: resultadoCep,
            }))
        }

        if (!historico.includes(cep)) {
            setHistorico((prev) => [...prev, cep])
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen p-4">
            <Card className="flex w-full max-w-sm">
                <CardHeader className="flex flex-col items-center justify-between w-full">
                    <div className="w-full flex items-center justify-between">
                        <span className="text-lg font-bold">Buscar CEP</span>
                        <Link href={"/"}>
                            <Button variant="outline" >Sair</Button>
                        </Link>
                    </div>
                    <div className="border-t w-full my-2" />
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            className="w-full"
                            placeholder="Digite o CEP (apenas números)"
                            onChange={(e) => setCep(e.target.value)}
                        />
                        <Button type="submit" disabled={loading}>{loading ? "Buscando..." : "Buscar"}</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <h1>Histórico de Buscas</h1>

                    {validacaoErro && <p className="text-red-500 mt-2">{validacaoErro}</p>}

                    {erro && <p className="text-red-600 mt-4">{erro}</p>}

                    {historico.map((item, index) => (
                        <div key={index} className="w-full flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span>{item}</span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setDetalheAberto(detalheAberto === item ? null : item)
                                        }
                                    >
                                        Ver detalhes
                                    </Button>
                                    <FaRegTrashCan
                                        className="size-4 cursor-pointer hover:text-red-500 transition-colors"
                                        onClick={() =>
                                            setHistorico((prev) => prev.filter((cep) => cep !== item))
                                        }
                                    />
                                </div>
                            </div>

                            {detalheAberto === item && resultadosPorCep[item] && (
                                <div className="border p-3 rounded bg-gray-100">
                                    <p><strong>Rua:</strong> {resultadosPorCep[item].logradouro}</p>
                                    <p><strong>Bairro:</strong> {resultadosPorCep[item].bairro}</p>
                                    <p><strong>Cidade:</strong> {resultadosPorCep[item].localidade}</p>
                                    <p><strong>Estado:</strong> {resultadosPorCep[item].uf}</p>
                                    <p><strong>DDD:</strong> {resultadosPorCep[item].ddd}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </CardFooter>
            </Card>
        </div>
    )
}
