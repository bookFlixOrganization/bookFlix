import React from 'react';
import styles from './AllBooks.module.css';
import { NavLink } from 'react-router-dom';

const AllBooks = (props) => {
    const { popularBooks } = props;
    return (
        <div className={styles.films_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Сейчас читают</p>
                        </div>
                        <p className={styles.section_subtitle}>
                            Самые популярные книги за последний час
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.movies}>
                        {popularBooks &&
                            popularBooks.map((book, index) => (
                                <NavLink
                                    key={index}
                                    to={`/book-page/${book.title}`}
                                    className={styles.movie}
                                >
                                    <div className={styles.movie__cover_inner}>
                                        <img
                                            src={book.book_image}
                                            alt=""
                                            className={styles.movie__cover}
                                        />
                                        <div className={styles.movie__cover__darkened}></div>
                                    </div>
                                    <div className={styles.movie__info}>
                                        <div className={styles.movie__title}>{book.title}</div>
                                        <div className={styles.movie__category}>{book.author}</div>
                                    </div>
                                </NavLink>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllBooks;
