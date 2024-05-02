import React from 'react';
import styles from './Section.module.css';

const YourBooks = () => {
    return (
        <section className={styles.now_reading_text}>
            <div className={styles.container}>
                <div className={styles.section_header}>
                    <div className={styles.section_header_1}>
                        <p className={styles.section_title}>Книги персонально для вас</p>
                        <a href="/all-books" className={styles.button_all}>
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

export default YourBooks;
