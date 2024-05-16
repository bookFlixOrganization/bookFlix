import React from 'react';
import styles from './Section.module.css';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // eslint-disable-line
import 'swiper/css'; // eslint-disable-line
import { ReactComponent as ArrowLeft } from './images/Arrow_left.svg';
import { ReactComponent as ArrowRight } from './images/Arrow_right.svg';

const PopularBooks = (props) => {
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
                <Swiper
                    slidesPerView={2}
                    freeMode={true}
                    navigation={{
                        nextEl: `.${styles.swiper_button_next}`,
                        prevEl: `.${styles.swiper_button_prev}`,
                    }}
                    className={styles.swiper}
                >
                    {props.popularBooks &&
                        props.popularBooks.map((book, index) => (
                            <SwiperSlide
                                key={`popular_book_${index}`}
                                className={styles.swiper_slide}
                            >
                                <a href={book.buy_links[0].url} className={styles.movie}>
                                    <div className={styles.movie__cover_inner}>
                                        <img
                                            src={book.book_image}
                                            alt={book.title}
                                            className={styles.movie__cover}
                                        />
                                        <div className={styles.movie__cover_darkened}></div>
                                    </div>
                                    <div className={styles.movie__info}>
                                        <div className={styles.movie__title}>{book.title}</div>
                                        <div className={styles.movie__category}>{book.author}</div>
                                        <div className={styles.movie__average}>{book.rank}</div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
            <div className={`${styles.top} ${styles.container_arrow}`}>
                <div className={`${styles.swiper_button_prev}`}>
                    <ArrowLeft />
                </div>
                <div className={`${styles.swiper_button_next}`}>
                    <ArrowRight />
                </div>
            </div>
        </section>
    );
};

export default PopularBooks;
