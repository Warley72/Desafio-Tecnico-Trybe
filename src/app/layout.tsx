import type { Metadata } from "next";
import { Poppins } from 'next/font/google'

import "@/styles/globals.css"

export const metadata: Metadata = {
    title: "Desafio Trybe",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={poppins.variable}>
            <body>
                {children}
            </body>
        </html>
    );
}
