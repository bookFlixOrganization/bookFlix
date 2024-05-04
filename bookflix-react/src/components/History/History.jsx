import React from 'react';
import styles from './History.module.css';

const History = () => {
    return (
        <div className={styles.history_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <p className={styles.section_title_1}>История</p>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>
                                Фильмы и сериалы, которые вы просмотрели
                            </p>
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

export default History;
