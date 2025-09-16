import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 p-8 flex items-center justify-center">
      <div className="bg-gray-600 /70 w-6xl h-160 rounded-xl flex items-center justify-center flex-col shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-center "> 
        <div className="flex justify-center">
          <Image src="/images/introduction.png" alt="Aluna Laura" width={400} height={400} />
        </div>
        <div className="p-6 text-center"> 
          <h1 className="text-3xl font-bold mb-4">Bem Vindo (a) ao Poke API ⚡</h1>
        <p className="text-center w-120 mt-6">Meu nome é Laura Ferreira Violla, tenho 17 anos e sou estudante de Desenvolvimento de Sistemas SENAI Valinhos. Com a ajuda dos docentes Thiago Ferreira e Marcelo Carboni estou desenvolvendo este projeto utilizando uma API gratuita.</p>
      <div className="mt-8 flex justify-center space-x-4">
      <Link href="/page-project" className="bg-gray-400 text-white px-6 py-4 rounded-md" >Conheça API</Link>
      </div>
        </div>
      </div>
      </div>
    </div>
  );
}
