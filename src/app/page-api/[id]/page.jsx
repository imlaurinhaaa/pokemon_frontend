"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./[id].module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function PokemonDetailsPage({ params }) {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState(""); // Para armazenar a descrição

    const fetchPokemon = async (pokemonId) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            setPokemon(response.data);
        } catch (error) {
            console.error("Erro ao buscar o Pokémon:", error);
            setPokemon(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchDescription = async (speciesUrl) => {
        try {
            const response = await fetch(speciesUrl);                                                                                               
            const data = await response.json();
            const englishDescription = data.flavor_text_entries.find(
                (entry) => entry.language.name === "en"
            );

            setDescription(englishDescription ? englishDescription.flavor_text : "Sem descrição disponível.");
        } catch (error) {
            console.error("Erro ao buscar a descrição:", error);
            setDescription("Descrição não encontrada.");
        }
    };

    useEffect(() => {
        if (params?.id) {
            fetchPokemon(params.id);
        }
    }, [params?.id]);

    useEffect(() => {
        if (pokemon?.species?.url) {
            fetchDescription(pokemon.species.url);
        }
    }, [pokemon?.species?.url]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <Image
                        src="/images/loadingPikachu.gif"
                        alt="Imagem de carregamento"
                        width={600}
                        height={600}
                        className={styles.loadingImage}
                    />
                    <p className={styles.loadingText}>Carregando Pokémon...</p>
                </div>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h3>Pokémon não encontrado</h3>
                    <Link href="/page-api" className={styles.button}>
                        Voltar
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.card} ${styles[pokemon.types[0].type.name]}`}>
                <div className={styles.cardContent}>
                    <div className={styles.presentation}>
                        <h1 className={styles.title}>{pokemon.name}</h1>
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className={styles.pokemonImage}
                        />
                    </div>
                    <div className={styles.information}>
                        <h2 className={styles.subtitle}>Detalhes</h2>
                        <p className={styles.info}>ID: {pokemon.id}</p>
                        <p className={styles.info}>Altura: {pokemon.height / 10} m</p>
                        <p className={styles.info}>Peso: {pokemon.weight / 10} kg</p>
                        <p className={styles.info}>Tipo: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
                        <p className={styles.info}>Descrição: {description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
