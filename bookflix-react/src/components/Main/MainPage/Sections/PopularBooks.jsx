import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; //eslint-disable-line
import { Navigation } from 'swiper/modules'; //eslint-disable-line
import 'swiper/css'; //eslint-disable-line
import 'swiper/css/navigation'; //eslint-disable-line
import styles from './Section.module.css';
import somebook from './images/somebook.jpg';

const PopularBooks = ({ popularBooks }) => {
    const navigate = useNavigate();

    return (
        <>
            <section className={styles.now_watching_text_1}>
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
                </div>
            </section>
            <section className={styles.now_watching_section}>
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={5}
                    slidesPerGroup={4}
                    freeMode={true}
                    navigation
                    className={styles.swiper}
                >
                    <div className={styles.swiper_wrapper}>
                        {popularBooks &&
                            popularBooks.map((book, index) => (
                                <SwiperSlide
                                    key={`popular_book_${index}`}
                                    className={styles.swiper_slide}
                                >
                                    <div className={styles.container}>
                                        <NavLink
                                            to={`/book-page/${book.id}`}
                                            className={styles.movie}
                                        >
                                            <div className={styles.movie__cover_inner}>
                                                {book.volumeInfo.imageLinks &&
                                                book.volumeInfo.imageLinks.thumbnail ? (
                                                    <img
                                                        src={book.volumeInfo.imageLinks.thumbnail}
                                                        alt={book.volumeInfo.title}
                                                        className={styles.movie__cover}
                                                    />
                                                ) : (
                                                    <img
                                                        src={somebook}
                                                        alt={book.volumeInfo.title || 'Book cover'}
                                                        className={styles.movie__cover}
                                                    />
                                                )}
                                                <div className={styles.movie__cover_darkened}></div>
                                            </div>
                                            <div className={styles.movie__info}>
                                                <div className={styles.movie__title}>
                                                    {book.volumeInfo.title || 'Unknown Title'}
                                                </div>
                                                <div className={styles.movie__category}>
                                                    {(book.volumeInfo.authors &&
                                                        book.volumeInfo.authors[0]) ||
                                                        'Unknown Author'}
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                </SwiperSlide>
                            ))}
                        <SwiperSlide
                            className={styles.movie_show_all}
                            onClick={() => navigate('/all-books')}
                        >
                            <p className={styles.show_all}>Смотреть все</p>
                        </SwiperSlide>
                    </div>
                </Swiper>
            </section>
        </>
    );
};

export default PopularBooks;
