import React from 'react';
import styles from './Section.module.css';

const PopularFilms = () => {
    return (
        <section className={styles.now_watching_text_1}>
            <div className={styles.container}>
                <div className={styles.section_header}>
                    <div className={styles.section_header_1}>
                        <p className={styles.section_title}>Сейчас смотрят</p>
                        <a href="/" className={styles.button_all}>
                            Всё
                        </a>
                    </div>
                    <p className={styles.section_subtitle}>
                        Самые популярные фильмы и сериалы за последний час
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PopularFilms;
