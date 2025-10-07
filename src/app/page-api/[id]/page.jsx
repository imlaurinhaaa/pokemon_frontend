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
    const [description, setDescription] = useState("");
    const images = pokemon
    ? [
        pokemon.sprites.front_default,
        pokemon.sprites.back_default,
    ].filter(Boolean)
    : [];

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

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [images.length]);


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
        <div className={`${styles.container} ${styles[pokemon.types[0].type.name]}`}>
            <div className={styles.presentation}>
                <h1 className={styles.title}>{pokemon.name}</h1>
                <img
                    src={images[currentImage]}
                    alt={pokemon.name}
                    className={styles.pokemonImage}
                />
            </div>
            <div className={styles.details}>
            <div className={`${styles.information} ${styles[pokemon.types[0].type.name]}`}>
                <h2 className={styles.subtitle}>Detalhes de {pokemon.name}</h2>
                <p className={styles.info}><strong>Nº Pokédex:</strong> {pokemon.id}</p>
                <p className={styles.info}><strong>Altura:</strong> {pokemon.height / 10} m</p>
                <p className={styles.info}><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                <p className={styles.info}><strong>Tipo:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}</p>
                <p className={styles.info}><strong>Descrição:</strong> {description}</p>
                <p className={styles.info}><strong>Experiência Base:</strong> {pokemon.base_experience}</p>
                <p className={styles.info}><strong>Habilidades:</strong> {pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
                <p className={styles.info}><strong>Movimentos:</strong> {pokemon.moves.slice(0, 5).map((m) => m.move.name).join(", ")}</p>
                <p className={styles.info}><strong>Shiny:</strong> <img className={styles.pokemonShiny} src={pokemon.sprites.front_shiny} alt={pokemon.name} width="80" /></p>
            </div>
            <div className={styles.information}>
                <h2 className={styles.subtitle}>Estatísticas de Batalha</h2>
                <p className={styles.info}><strong>HP:</strong> {pokemon.stats.find((s) => s.stat.name === "hp").base_stat}</p>
                <p className={styles.info}><strong>Ataque:</strong> {pokemon.stats.find((s) => s.stat.name === "attack").base_stat}</p>
                <p className={styles.info}><strong>Defesa:</strong> {pokemon.stats.find((s) => s.stat.name === "defense").base_stat}</p>
                <p className={styles.info}><strong>Ataque Especial:</strong> {pokemon.stats.find((s) => s.stat.name === "special-attack").base_stat}</p>
                <p className={styles.info}><strong>Defesa Especial:</strong> {pokemon.stats.find((s) => s.stat.name === "special-defense").base_stat}</p>
                <p className={styles.info}><strong>Velocidade:</strong> {pokemon.stats.find((s) => s.stat.name === "speed").base_stat}</p>
            </div>
            </div>

            <div className={`${styles.button} ${styles[pokemon.types[0].type.name]}`}>
                <Link href="/page-api">
                    Voltar
                </Link>
            </div>
        </div>
    );
}
