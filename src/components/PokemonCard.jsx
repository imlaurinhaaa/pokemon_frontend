import React from "react";
import Link from "next/link";
import styles from "../styles/PokemonCard.module.css";

export default function pokemonCard ({ pokemon, type }) {

    console.log({type});

    let typeClass = "";
    
    if (type === "grass") {
        typeClass = styles.grass;
    } else if (type === "fire") {
        typeClass = styles.fire;
    } else if (type === "water") {
        typeClass = styles.water;
    } else if (type === "bug") {
        typeClass = styles.bug;
    } else if (type === "normal") {
        typeClass = styles.normal;
    } else if (type === "poison") {
        typeClass = styles.poison;
    } else if (type === "electric") {
        typeClass = styles.electric;
    } else if (type === "ground") {
        typeClass = styles.ground;
    } else if (type === "fairy") {
        typeClass = styles.fairy;
    } else if (type === "fighting") {
        typeClass = styles.fighting;
    } else if (type === "psychic") {
        typeClass = styles.psychic;
    } else if (type === "rock") {
        typeClass = styles.rock;
    } else if (type === "ghost") {
        typeClass = styles.ghost;
    } else if (type === "ice") {
        typeClass = styles.ice;
    } else if (type === "dragon") {
        typeClass = styles.dragon;
    }   else if (type === "dark") {
        typeClass = styles.dark;
    } else if (type === "steel") {
        typeClass = styles.steel;
    } else {
        typeClass = styles.default;
    }

    return (
        <div className={`${styles.pokemonCard} ${typeClass}`}>
            <div className={styles.cardContent}>
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className={styles.pokemonImage}
                />
                <h3 className={styles.pokemonName}>{pokemon.name}</h3>
                <p className={styles.pokemonInfo}>Altura: {pokemon.height / 10}m</p>
                <p className={styles.pokemonInfo}>
                    Tipo: {pokemon.types.map((t) => t.type.name).join(", ")}
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <Link href={`/page-api/${pokemon.id}`} className={styles.detailsButton}>
                    Ver Detalhes
                </Link>
            </div>
        </div>
    );
};