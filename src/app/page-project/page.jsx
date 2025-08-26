import React from 'react'
import Image from 'next/image'
import styles from './project.module.css'

export default function pageProjeto() {
  return (
    <div className={styles.container}>
        <div className={styles.content}> 
            <div className={styles.imgSection}>
            <Image src="/images/wine.jpg" alt="Imagem API" width={250} height={250} className={styles.image} />
            </div>
            <div className={styles.infoSection}>
                <h1 className={styles.title}>Sobre API Wines 🍷</h1>
                <p className={styles.description}>Encontrada em <a href="https://sampleapis.co">Sample APIs</a> para fins educacionais. Tem </p>
            </div>
        </div>
    </div>
  ) 
}
