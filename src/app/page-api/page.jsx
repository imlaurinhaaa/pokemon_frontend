"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./api.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import PokemonCard from "@/components/PokemonCard";

export default function PageAPI() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [searchTerm, setSearchTerm] = useState(""); // estado da busca

    const fetchPokemons = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://pokeapi.co/api/v2/pokemon?offset=0&limit=720"
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

    // Filtra por nome conforme o termo de busca
    const filteredPokemons = pokemons.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

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
                <Image src="/images/pokemon.png" alt="Logo" width={400} height={400} />
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
                            Criar Pokédex
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
                            <div className={styles.inputContainer}>
                                <Image
                                    src="/images/pokeball.png"
                                    alt="Ícone de busca"
                                    width={80}
                                    height={80}
                                    className={styles.icon}
                                />
                                <input
                                    type="text"
                                    placeholder="Buscar Pokemons"
                                    className={styles.input}
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1); // reseta para a primeira página ao buscar
                                    }}
                                />
                            </div>
                            <Pagination
                                total={filteredPokemons.length} // usa a lista filtrada
                                pageSize={pageSize}
                                current={currentPage}
                                showSizeChanger={true}
                                pageSizeOptions={["100", "200", "300", "400", "500", "600", "720"]}
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
