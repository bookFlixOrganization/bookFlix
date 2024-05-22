import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // eslint-disable-line
import { Navigation } from 'swiper/modules'; // eslint-disable-line
import 'swiper/css'; // eslint-disable-line
import 'swiper/css/navigation'; //eslint-disable-line
import styles from './Section.module.css';
import somebook from './images/somebook.jpg';

const YourBooks = (props) => {
    const navigate = useNavigate();
    let personBooksArray = [];
    if (props.personBooks) {
        personBooksArray = Object.entries(props.personBooks);
    }
    return (
        <>
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
                        {personBooksArray &&
                            personBooksArray.length > 0 &&
                            personBooksArray.slice(0, 8).map((book, index) => (
                                <SwiperSlide
                                    key={`person_book_${index}`}
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
                                                            book[1].volumeInfo.imageLinks.thumbnail
                                                        }
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
                                                <div className={styles.movie__cover_darkened}></div>
                                            </div>
                                            <div className={styles.movie__info}>
                                                <div className={styles.movie__title}>
                                                    {book[1].volumeInfo.title}
                                                </div>
                                                <div className={styles.movie__category}>
                                                    {book[1].volumeInfo.authors[0]}
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

export default YourBooks;
