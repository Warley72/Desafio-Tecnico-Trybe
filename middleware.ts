import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    console.log("✅ Middleware executado")
  const cookie = request.cookies.get("usuario")

  // Se não estiver logado, redireciona para login
  if (!cookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Define quais rotas serão protegidas
export const config = {
  matcher: ["/buscarcep"],
}
