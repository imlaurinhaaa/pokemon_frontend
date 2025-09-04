import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./project.module.css";

export default function pageProjeto() {
  return (
    <div className={styles.container}>
      <div className={styles.imgSection}>
        <Image
          src="/images/banner.png"
          alt="Imagem API"
          width={1000}
          height={500}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>⚡ Sobre Pokemon API</h1>
        <p className={styles.description}>
          Encontrada em <span className={styles.span}><a href="https://pokeapi.co/">PokéAPI</a></span> para fins
          educacionais. A PokeAPI é uma API pública que fornece dados sobre o
          universo Pokémon. Ela disponibiliza informações detalhadas sobre os
          Pokémon, incluindo seus nomes, tipos, movimentos, habilidades,
          evoluções, imagens (sprites) e outros atributos. Além disso, oferece
          dados sobre itens, locais, treinadores e várias outras características
          do mundo Pokémon. Essa API é útil para quem deseja criar aplicações ou
          explorar dados relacionados aos Pokémon, seja para jogos, sites ou
          projetos de análise.
        </p>
        <h2 className={styles.subTitle}>
          📲 Lista de atributos recebidos na resposta da API
        </h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Características dos Pokémon</li>
          <li className={styles.listItem}>Tipos de Pokémon</li>
          <li className={styles.listItem}>Movimentos e habilidades</li>
          <li className={styles.listItem}>Natureza</li>
          <li className={styles.listItem}>Itens</li>
          <li className={styles.listItem}>Localização</li>
        </ul>
        <h2 className={styles.subTitle}>🔗 URL base usada para o axios</h2>
        <p className={styles.description}>
          A URL base utilizada para fazer as requisições à API é:{" "}
        </p>
        <code className={styles.code}>https://pokeapi.co/api/v2/</code>
        <h2 className={styles.subTitle}>📍 Exemplo de endpoint</h2>
        <p className={styles.description}>
          Esse endpoint retorna informações detalhadas sobre um Pokémon
          específico, como nome, altura, peso, tipos, habilidades e movimentos.
        </p>
        <code className={styles.code}>
          https://pokeapi.co/api/v2/pokemon/id
        </code>
        <div className={styles.buttonSection}>
          <Link
            href="/"
            className={styles.button}
          >
            Página Inicial
          </Link>
          <Link
            href="/page-api"
            className={styles.button}
          >
            Pokemon API
          </Link>
        </div>
      </div>
    </div>
  );
}
