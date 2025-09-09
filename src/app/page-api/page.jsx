"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./api.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
import PokemonCard from "@/components/PokemonCard";

export default function PageAPI() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const fetchPokemons = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100"
            );
            const detailedPokemons = await Promise.all(
                response.data.results.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url);
                    return res.data;
                })
            );

            setPokemons(detailedPokemons);
            toast.success("Pokemons carregados com sucesso!", {
                toastId: "success-load",
            });
        } catch (error) {
            console.error("Erro ao buscar pokemons:", error);
            toast.error("Erro ao carregar pokemons.", {
                toastId: "error-load",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPokemons = pokemons.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Image src="/images/pokemon.png" alt="Logo" width={250} height={250} />
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
                    <div className={styles.buttonSection}>
                        <Link
                            href="/"
                            className={styles.button}
                        >
                            Página Inicial
                        </Link>
                        <Link
                            href="/page-project"
                            className={styles.button}
                        >
                            Sobre API
                        </Link>
                    </div>
                </div>
                <div className={styles.imageSection}>
                    <Image
                        src="/images/pikachu.gif"
                        alt="Imagem Personagens de Pokemon"
                        width={300}
                        height={300}
                        className={styles.image}
                    />
                </div>

            </div>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <Image
                        src="/images/loading.gif"
                        alt="Imagem de carregamento"
                        width={300}
                        height={300}
                        className={styles.loadingImage} />
                    <p className={styles.loadingText}>Carregando Pokemons...</p>
                </div>
            ) : (
                <>
                    <div className={styles.pokemons}>
                        <div className={styles.pagination}>
                            <Pagination
                                total={pokemons.length}
                                pageSize={pageSize}
                                current={currentPage}
                                showSizeChanger={true}
                                pageSizeOptions={["10", "20", "30", "40", "50"]}
                                onChange={handlePageChange}
                                onShowSizeChange={handlePageSizeChange}
                            />
                        </div>

                        <div className={styles.cardsContainer}>
                            {currentPokemons.map((pokemon, index) => (
                                <PokemonCard
                                    key={index}
                                    pokemon={pokemon}
                                    type={pokemon.types[0].type.name}
                                    />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
