import React from "react";
import Image from "next/image";
import styles from "../styles/Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
                <Image src="/images/logo.png" alt="Logo" width={400} height={400} />
            </header>
    );
}