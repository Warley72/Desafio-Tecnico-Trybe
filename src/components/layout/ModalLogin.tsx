import Link from "next/link"

export default function ModalLogin() {
    return (
        <div className="flex items-center justify-center h-screen p-4">
            <div className="flex items-center w-full max-w-lg rounded-xl border shadow-sm">
                <div>
                    <img className="rounded-xl" src="/login-left-image.png" alt="login-left-image" />
                </div>
                <div className="flex flex-col p-6">
                    <h1 className="text-2xl font-bold mb-2">Login</h1>
                    <p className="text-sm text-gray-500 mb-2">Digite seu nome de usuário</p>
                    <input
                        className="text-sm font-medium h-10 px-3 py-2 rounded-md border shadow-sm mb-5"
                        type="text"
                        placeholder="Nome de usuário"
                    />
                    <Link href={"/buscarCep"}>
                        <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold h-10 px-3 py-2 rounded-md cursor-pointer duration-200">
                            Entrar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
