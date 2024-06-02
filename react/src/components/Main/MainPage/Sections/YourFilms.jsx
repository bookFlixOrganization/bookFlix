import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // eslint-disable-line
import { Navigation } from 'swiper/modules'; // eslint-disable-line
import 'swiper/css'; // eslint-disable-line
import 'swiper/css/navigation'; //eslint-disable-line
import styles from './Section.module.css';
import somebook from './images/somebook.jpg';

const YourFilms = (props) => {
    const navigate = useNavigate();
    let personFilmsArray = [];

    if (props.personFilms) {
        personFilmsArray = Object.entries(props.personFilms);
    }
    return (
        <>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>
                                Фильмы и сериалы персонально для вас
                            </p>
                            <NavLink to={'/person-films'} className={styles.button_all}>
                                Всё
                            </NavLink>
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
                        {personFilmsArray &&
                            personFilmsArray.length > 0 &&
                            personFilmsArray.slice(0, 10).map((film, index) => {
                                if (film[0]) {
                                    return (
                                        <SwiperSlide
                                            key={`person_film_${index}`}
                                            className={styles.swiper_slide}
                                        >
                                            <div className={styles.container}>
                                                <NavLink
                                                    to={`/film-page/${film[0]}/imdb`}
                                                    className={styles.movie}
                                                >
                                                    <div className={styles.movie__cover_inner}>
                                                        {film[1]['full-size cover url'] ||
                                                        film[1]['cover url'] ? (
                                                            <img
                                                                src={
                                                                    film[1][
                                                                        'full-size cover url'
                                                                    ] || film[1]['cover url']
                                                                }
                                                                alt={film[1]['title']}
                                                                className={styles.movie__cover}
                                                            />
                                                        ) : (
                                                            <img
                                                                src={somebook}
                                                                alt={film[1]['title']}
                                                                className={styles.movie__cover}
                                                            />
                                                        )}
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
                                    );
                                }
                                return null;
                            })}
                        <SwiperSlide
                            className={styles.movie_show_all}
                            onClick={() => navigate('/person-films')}
                        >
                            <p className={styles.show_all}>Смотреть все</p>
                        </SwiperSlide>
                    </div>
                </Swiper>
            </section>
        </>
    );
};

export default YourFilms;
