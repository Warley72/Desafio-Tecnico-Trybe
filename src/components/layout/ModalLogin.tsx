"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginSchema } from "@/lib/LoginSchema"
import { useUserStore } from "@/store/userStore"

const usuariosValidos = ["carlos", "joao", "ana", "maria", "lucas"]

export default function ModalLogin() {
    const [nome, setNomeInput] = useState("")
    const [erro, setErroInput] = useState("")
    const { setNome } = useUserStore()
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        const result = LoginSchema.safeParse({ nome })

        if (!result.success) {
            setErroInput(result.error.errors[0].message)
            return
        }

        // valida se o nome está na lista de usuários válidos
        const nomeFormatado = nome.trim().toLowerCase()
        if (!usuariosValidos.includes(nomeFormatado)) {
            setErroInput("Usuário não autorizado")
            return
        }

        setNome(nomeFormatado)
        document.cookie = `usuario=${nomeFormatado}; path=/`
        router.push("/buscarcep")
    }

    return (
        <div className="flex items-center justify-center h-screen p-4">
            <div className="flex items-center w-full max-w-lg rounded-xl border shadow-sm">
                <div>
                    <img className="rounded-xl" src="/login-left-image.png" alt="login-left-image" />
                </div>

                <form onSubmit={handleLogin} className="flex flex-col p-6 flex-1">
                    <h1 className="text-2xl font-bold mb-2">Login</h1>
                    <p className="text-sm text-gray-500 mb-2">Digite seu nome de usuário</p>

                    <input
                        className="text-sm font-medium h-10 px-3 py-2 rounded-md border shadow-sm mb-2"
                        type="text"
                        value={nome}
                        onChange={(e) => setNomeInput(e.target.value)}
                        placeholder="Nome de usuário"
                    />

                    {erro && <p className="text-sm text-red-500 mb-2">{erro}</p>}

                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold h-10 px-3 py-2 rounded-md cursor-pointer duration-200"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}
