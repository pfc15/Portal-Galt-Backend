import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portal Galt - Gestão Acadêmica",
  description: "Sistema de gestão de alunos e turmas da Instituição Galt",
  keywords: ["educação", "gestão escolar", "alunos", "turmas"],
};

// Definição de tipos para as props
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster position="bottom-right" expand={false} />
      </body>
    </html>
  );
}
