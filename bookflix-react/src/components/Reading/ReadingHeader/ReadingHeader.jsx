import React from 'react';
import styles from './ReadingHeader.module.css';

const ReadingHeader = () => {
    return (
        <div className={styles.reading_diary_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Дневник чтения</p>
                            <a href="/" className={styles.button_all}>
                                Популярные статьи
                            </a>
                            <a href="/" className={styles.button_all}>
                                Мои статьи
                            </a>
                            <a href="/" className={styles.button_all}>
                                Мои подписки
                            </a>
                            <a href="/" className={styles.button_all}>
                                Новая статья
                            </a>
                            <a href="/" className={styles.button_all}>
                                Найти статью
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReadingHeader;
