import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./api.module.css";

export default function PageAPI() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Image src="/images/pokemon.png" alt="Logo" width={250} height={250} />
                <ul className={styles.navLinks}>
                    <nav className={styles.nav}>
                        <Link href="/">Home</Link>
                    </nav>
                    <nav className={styles.nav}>
                        <Link href="/page-project">Sobre API</Link>
                    </nav>
                </ul>
            </header>
            <div className={styles.content}>
                <div className={styles.textSection}>
                    <h1 className={styles.title}>⚡ Pokémon API</h1>
                    <p className={styles.description}>
                        A PokéAPI é uma API pública que fornece dados sobre o universo
                        Pokémon. Ela disponibiliza informações detalhadas sobre os Pokémon,
                        incluindo seus nomes, tipos, movimentos, habilidades, evoluções,
                        imagens (sprites) e outros atributos. Além disso, oferece dados
                        sobre itens, locais, treinadores e várias outras características do
                        mundo Pokémon. Essa API é útil para quem deseja criar aplicações ou
                        explorar dados relacionados aos Pokémon, seja para jogos, sites ou
                        projetos de análise.
                    </p>
                </div>
                <div className={styles.imageSection}>
                    <Image
                        src="/images/personagens.png"
                        alt="Imagem Personagens de Pokemon"
                        width={500}
                        height={300}
                        className={styles.image}
                    />
                </div>
            </div>
        </div>
    );
}
