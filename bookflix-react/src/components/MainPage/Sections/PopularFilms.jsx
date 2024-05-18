import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // eslint-disable-line
import { Navigation } from 'swiper/modules'; // eslint-disable-line
import 'swiper/css'; // eslint-disable-line
import 'swiper/css/navigation'; //eslint-disable-line
import styles from './Section.module.css';

const PopularFilms = (props) => {
    const navigate = useNavigate();
    let popularFilmsArray = [];

    if (props.popularFilms) {
        popularFilmsArray = Object.values(props.popularFilms);
    }

    return (
        <>
            <section className={styles.now_watching_text_1}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Сейчас смотрят</p>
                            <NavLink to="/all-films" className={styles.button_all}>
                                Всё
                            </NavLink>
                        </div>
                        <p className={styles.section_subtitle}>
                            Самые популярные фильмы за последний час
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
                        {popularFilmsArray.map((film, index) => (
                            <SwiperSlide
                                key={`popular_film_${index}`}
                                className={styles.swiper_slide}
                            >
                                <div className={styles.container}>
                                    <NavLink to="/film-page" className={styles.movie}>
                                        <div className={styles.movie__cover_inner}>
                                            <img
                                                src={film['poster_path:']}
                                                alt={film['title:']}
                                                className={styles.movie__cover}
                                            />
                                            <div className={styles.movie__cover_darkened}></div>
                                        </div>
                                        <div className={styles.movie__info}>
                                            <div className={styles.movie__title}>
                                                {film['title:']}
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </SwiperSlide>
                        ))}
                        <SwiperSlide
                            className={styles.movie_show_all}
                            onClick={() => navigate('/all-films')}
                        >
                            <p className={styles.show_all}>Смотреть все</p>
                        </SwiperSlide>
                    </div>
                </Swiper>
            </section>
        </>
    );
};

export default PopularFilms;
