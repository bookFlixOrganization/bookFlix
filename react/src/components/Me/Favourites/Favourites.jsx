import React from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // eslint-disable-line
import { Navigation } from 'swiper/modules'; // eslint-disable-line
import 'swiper/css'; // eslint-disable-line
import 'swiper/css/navigation'; //eslint-disable-line
import styles from './Favourites.module.css';
import somebook from './images/somebook.jpg';

const Favourites = (props) => {
    const { favouritesFilms, favouritesBooks } = props;
    let favouritesFilmsArray, favouritesBooksArray;
    if (favouritesFilms) {
        favouritesFilmsArray = Object.entries(favouritesFilms);
    }
    if (favouritesBooks) {
        favouritesBooksArray = Object.entries(favouritesBooks);
    }
    return (
        <div className={styles.favourites_container}>
            <div>
                <section className={`${styles.now_watching_text} ${styles.main_header}`}>
                    <div className={styles.container}>
                        <div className={styles.section_header}>
                            <p className={styles.section_title_1}>Избранное</p>
                        </div>
                    </div>
                </section>
                <section className={styles.now_watching_text}>
                    <div className={styles.container}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>
                                Фильмы и сериалы, которые вам понравились
                            </p>
                        </div>
                        <p className={styles.section_subtitle}></p>
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
                            {favouritesFilmsArray &&
                                favouritesFilmsArray.length > 0 &&
                                favouritesFilmsArray.map((film, index) => (
                                    <SwiperSlide
                                        key={`history_film_${index}`}
                                        className={styles.swiper_slide}
                                    >
                                        <div className={styles.container}>
                                            <NavLink
                                                to={`/film-page/${film[0]}/imdb`}
                                                className={styles.movie}
                                            >
                                                <div className={styles.movie__cover_inner}>
                                                    <img
                                                        src={film[1]['cover url']}
                                                        alt={film[1]['title']}
                                                        className={styles.movie__cover}
                                                    />
                                                    <div
                                                        className={styles.movie__cover_darkened}
                                                    ></div>
                                                </div>
                                                <div className={styles.movie__info}>
                                                    <div className={styles.movie__title}>
                                                        {film[1]['title']}
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </div>
                    </Swiper>
                </section>

                <section className={styles.now_reading_text}>
                    <div className={styles.container}>
                        <div className={styles.section_header}>
                            <div className={styles.section_header_1}>
                                <p className={styles.section_title}>
                                    Книги, которые вам понравились
                                </p>
                            </div>
                            <p className={styles.section_subtitle}></p>
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
                            {favouritesBooksArray &&
                                favouritesBooksArray.length > 0 &&
                                favouritesBooksArray.map((book, index) => (
                                    <SwiperSlide
                                        key={`history_book_${index}`}
                                        className={styles.swiper_slide}
                                    >
                                        <div className={styles.container}>
                                            <NavLink
                                                to={`/book-page/${book[0]}`}
                                                className={styles.movie}
                                            >
                                                <div className={styles.movie__cover_inner}>
                                                    {book[1].volumeInfo.imageLinks &&
                                                    book[1].volumeInfo.imageLinks.thumbnail ? (
                                                        <img
                                                            src={
                                                                book[1].volumeInfo.imageLinks
                                                                    .thumbnail
                                                            }
                                                            alt={book[1].volumeInfo.title}
                                                            className={styles.movie__cover}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={somebook}
                                                            alt={
                                                                book[1].volumeInfo.title ||
                                                                'Book cover'
                                                            }
                                                            className={styles.movie__cover}
                                                        />
                                                    )}
                                                    <div
                                                        className={styles.movie__cover_darkened}
                                                    ></div>
                                                </div>
                                                <div className={styles.movie__info}>
                                                    <div className={styles.movie__title}>
                                                        {book[1].volumeInfo.title ||
                                                            'Unknown Title'}
                                                    </div>
                                                    <div className={styles.movie__category}>
                                                        {(book[1].volumeInfo.authors &&
                                                            book[1].volumeInfo.authors[0]) ||
                                                            'Unknown Author'}
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </div>
                    </Swiper>
                </section>
            </div>
        </div>
    );
};

export default Favourites;
