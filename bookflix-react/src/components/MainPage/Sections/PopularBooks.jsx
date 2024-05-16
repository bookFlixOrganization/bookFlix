import React, { useState } from 'react';
import styles from './Section.module.css';
import { NavLink } from 'react-router-dom';

const PopularBooks = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(5); // eslint-disable-line

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % props.popularBooks.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + props.popularBooks.length) % props.popularBooks.length);
    };

    const startIndex = currentSlide * slidesPerView;

    return (
        <section className={styles.now_reading_text}>
            <div className={styles.container}>
                <div className={styles.section_header}>
                    <div className={styles.section_header_1}>
                        <p className={styles.section_title}>Сейчас читают</p>
                        <NavLink to="/all-books" className={styles.button_all}>
                            Всё
                        </NavLink>
                    </div>
                    <p className={styles.section_subtitle}>
                        Самые популярные книги за последний час
                    </p>
                </div>
                <div className={styles.swiper_container}>
                    <button onClick={prevSlide} className={styles.swiper_button_prev}>
                        &#10094;
                    </button>
                    <div className={styles.swiper}>
                        <div className={styles.swiper_wrapper}>
                            {props.popularBooks &&
                                props.popularBooks.map((book, index) => {
                                    const isVisible =
                                        index >= startIndex && index < startIndex + slidesPerView;
                                    return (
                                        <div
                                            key={`popular_book_${index}`}
                                            className={`${styles.swiper_slide} ${isVisible ? '' : styles.hidden}`}
                                        >
                                            <div className={styles.container}></div>
                                            <div className={styles.movies}>
                                                <a
                                                    href={book.buy_links[0].url}
                                                    className={styles.movie}
                                                >
                                                    <div className={styles.movie__cover_inner}>
                                                        <img
                                                            src={book.book_image}
                                                            alt={book.title}
                                                            className={styles.movie__cover}
                                                        />
                                                        <div
                                                            className={styles.movie__cover_darkened}
                                                        ></div>
                                                    </div>
                                                    <div className={styles.movie__info}>
                                                        <div className={styles.movie__title}>
                                                            {book.title}
                                                        </div>
                                                        <div className={styles.movie__category}>
                                                            {book.author}
                                                        </div>
                                                        <div className={styles.movie__average}>
                                                            {book.rank}
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <button onClick={nextSlide} className={styles.swiper_button_next}>
                        &#10095;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularBooks;
