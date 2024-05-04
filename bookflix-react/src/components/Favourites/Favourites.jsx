import React from 'react';
import styles from './Favourites.module.css';

const Favourites = () => {
    return (
        <div className={styles.favourites_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <p className={styles.section_title_1}>Избранное</p>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Добавленные фильмы и сериалы</p>
                            <a href="/" className={styles.button_all}>
                                Всё
                            </a>
                        </div>
                        <p className={styles.section_subtitle}></p>
                    </div>
                </div>
            </section>

            <section className={styles.now_reading_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Добавленные книги</p>
                            <a href="/" className={styles.button_all}>
                                Всё
                            </a>
                        </div>
                        <p className={styles.section_subtitle}></p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Favourites;
