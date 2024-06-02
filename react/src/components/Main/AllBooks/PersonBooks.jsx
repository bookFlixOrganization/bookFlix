import React from 'react';
import styles from './AllBooks.module.css';
import { NavLink } from 'react-router-dom';
import somebook from './images/somebook.jpg';

const PersonBooks = (props) => {
    const { books } = props;
    let booksArray;
    if (books) {
        booksArray = Object.entries(books);
    }
    return (
        <div className={styles.films_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Книги для вас</p>
                        </div>
                        <p className={styles.section_subtitle}>
                            Персональная подборка книг для вас
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.movies}>
                        {booksArray &&
                            booksArray.length > 0 &&
                            booksArray.map((book, index) => (
                                <NavLink
                                    key={index}
                                    to={`/book-page/${book[0]}`}
                                    className={styles.movie}
                                >
                                    <div className={styles.movie__cover_inner}>
                                        {book[1].volumeInfo.imageLinks &&
                                        book[1].volumeInfo.imageLinks.thumbnail ? (
                                            <img
                                                src={book[1].volumeInfo.imageLinks.thumbnail}
                                                alt={book[1].volumeInfo.title}
                                                className={styles.movie__cover}
                                            />
                                        ) : (
                                            <img
                                                src={somebook}
                                                alt={book[1].volumeInfo.title}
                                                className={styles.movie__cover}
                                            />
                                        )}
                                        <div className={styles.movie__cover__darkened}></div>
                                    </div>
                                    <div className={styles.movie__info}>
                                        <div className={styles.movie__title}>
                                            {book[1].volumeInfo.title}
                                        </div>
                                        <div className={styles.movie__category}>
                                            {book[1].volumeInfo.authors &&
                                                book[1].volumeInfo.authors[0]}
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PersonBooks;
