import React from 'react';
import styles from './Section.module.css';

const YourFilms = () => {
    return (
        <section className={styles.now_watching_text}>
            <div className={styles.container}>
                <div className={styles.section_header}>
                    <p className={styles.section_title_1}>Главная</p>
                    <div className={styles.section_header_1}>
                        <p className={styles.section_title}>Фильмы и сериалы персонально для вас</p>
                        <a href="/all-films" className={styles.button_all}>
                            Всё
                        </a>
                    </div>
                    <p className={styles.section_subtitle}>
                        Индивидуальные рекомендации на основе ваших просмотров и оценок
                    </p>
                </div>
            </div>
        </section>
    );
};

export default YourFilms;
