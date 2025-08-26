import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-pink-200 p-8 flex items-center justify-center">
      <div className="bg-white/70 w-2xl h-150 rounded-xl flex items-center flex-col shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
        <h1 className="text-3xl font-bold text-center p-6 mt-6 text-pink-400">Bem-vindo ao Wine API 🍷</h1>
        <div className="flex justify-center">
          <Image src="/images/laura.jpeg" alt="Aluna Laura" width={250} height={250} className="rounded-full" />
        </div>
        <p className="text-center w-120 mt-6">Meu nome é Laura Ferreira Violla, tenho 17 anos e sou estudante de Desenvolvimento de Sistemas SENAI Valinhos. Com a ajuda dos docentes Thiago Ferreira e Marcelo Carboni estou desenvolvendo este projeto utilizando uma API gratuita.</p>
        <div className="flex items-center justify-center mt-6 space-x-4">
          <Link href="/page-project" className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-500 transition-colors duration-300">Sobre API</Link>
          <Link href="/page-api" className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-500 transition-colors duration-300">Wine API</Link>
        </div>
      </div>
    </div>
  );
}
