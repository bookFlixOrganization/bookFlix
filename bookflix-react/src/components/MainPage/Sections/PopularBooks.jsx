import React from 'react';
import styles from './Section.module.css';

const PopularBooks = () => {
    return (
        <section className={styles.now_reading_text}>
            <div className={styles.container}>
                <div className={styles.section_header}>
                    <div className={styles.section_header_1}>
                        <p className={styles.section_title}>Сейчас читают</p>
                        <a href="/" className={styles.button_all}>
                            Всё
                        </a>
                    </div>
                    <p className={styles.section_subtitle}>
                        Самые популярные книги за последний час
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PopularBooks;
