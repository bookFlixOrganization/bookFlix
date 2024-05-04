import React from 'react';
import styles from './FilmPage.module.css';
import { ReactComponent as QuotesIcon } from './images/quotes.svg';
import { ReactComponent as FavouriteIcon } from './images/favourite.svg';
import cover from './images/cover.jpg';
import di_caprio from './images/di_caprio.jpg';
import margo from './images/margo.jpg';
import brad_pitt from './images/brad_pitt.jpg';
import FeedBackContainer from '../FeedBack/FeedBackContainer.jsx';

const FilmPage = (props) => {
    return (
        <div className={styles.bookpage_container}>
            <div className={styles.container_1}>
                <div className={styles.wrapper}>
                    <img className={styles.film_book} src={cover} alt="" />
                    <div>
                        <h1 className={styles.title}>Однажды в Голливуде</h1>
                        <h6 className={styles.subtitle}>Once Upon a Time in Hollywood 18+</h6>
                        <p className={styles.description}>
                            1969 год, золотой век Голливуда уже закончился. Известный актёр Рик
                            Далтон и его дублер Клифф Бут пытаются найти свое место в стремительно
                            меняющемся мире киноиндустрии.
                        </p>

                        <div className={styles.mb_41}>
                            <a href="/" className={styles.btn}>
                                Смотреть
                            </a>
                            <button
                                className={`${styles.block_1} ${props.isFavourite ? styles.active : ''}`}
                                onClick={props.toggleFavourite}
                            >
                                <FavouriteIcon
                                    className={`${styles.favourite_icon} ${props.isFavourite ? styles.active : ''}`}
                                />
                            </button>
                        </div>

                        <ul className={`${styles.params} ${styles.mb - 40}`}>
                            <li>
                                <span className={styles.label}>Аудиодорожки</span>Русский, Русский
                                5.1, Английский, Английский 5.1
                            </li>
                            <li>
                                <span className={styles.label}>Субтитры</span>Русские, Английские
                            </li>
                            <li>
                                <span className={styles.label}>Качество видео</span>
                                <span>
                                    <span className={styles.tag}>Full HD</span>
                                </span>
                            </li>
                        </ul>

                        <h2 className={styles.about}>О фильме</h2>
                        <ul className={styles.params}>
                            <li>
                                <span className={styles.label}>Дата выхода</span>August 8, 2019
                                (Russia)
                            </li>
                            <li>
                                <span className={styles.label}>Страна</span>США, Великобритания,
                                Китай
                            </li>
                            <li>
                                <span className={styles.label}>Жанр</span>
                                <span>
                                    <a href="/" className={styles.genre}>
                                        Драма
                                    </a>
                                    ,{' '}
                                    <a href="/" className={styles.genre}>
                                        {' '}
                                        комедия
                                    </a>
                                </span>
                            </li>
                            <li>
                                <span className={styles.label}>Слоган</span>
                                <time className={styles.text_muted}>
                                    «The 9th Film from Quentin Tarantino»
                                </time>
                            </li>
                            <li>
                                <span className={styles.label}>Режиссёр</span>Квентин Тарантино
                            </li>
                            <li>
                                <span className={styles.label}>Длительность</span>
                                <time className={styles.text_muted}>161 мин. / 02:41</time>
                            </li>
                            <li>
                                <span className={styles.label}>Бюджет</span>$90,000,000
                            </li>
                            <li>
                                <span className={styles.label}>Возраст</span>
                                <span>
                                    <span className={styles.tag}>18+</span>
                                </span>
                            </li>
                        </ul>

                        <h2 className={styles.all_rathing}>Рейтинг</h2>
                        <div className={styles.all_media_rathing}>
                            <div id="open-modal-btn" className={styles.our_rathing}>
                                <div className={styles.our_own_rathing}>9.0</div>
                                <div className={styles.user_mark}>
                                    Оценка пользователей BookFlix
                                </div>
                            </div>
                            <div className={styles.not_our_rathing}>
                                <div className={styles.imdb_rathing}>9.3</div>
                                <div className={styles.user_mark}>iMDb</div>
                            </div>
                        </div>

                        <h2 className={styles.top_cast}>Топ актёры</h2>
                        <div className={styles.actors}>
                            <div className={styles.actor}>
                                <img src={di_caprio} alt="" className={styles.photo} />
                                <div className={styles.name}>Leonardo DiCaprio</div>
                                <div className={styles.nickname}>Rick Dalton</div>
                            </div>

                            <div className={styles.actor}>
                                <img src={brad_pitt} alt="" className={styles.photo} />
                                <div className={styles.name}>Brad Pitt</div>
                                <div className={styles.nickname}>Cliff Booth</div>
                            </div>

                            <div className={styles.actor}>
                                <img src={margo} alt="" className={styles.photo} />
                                <div className={styles.name}>Margot Robbie</div>
                                <div className={styles.nickname}>Sharon Tate</div>
                            </div>
                        </div>

                        <h2 id="prokrutka" className={styles.prokrutka}>
                            Отзывы зрителей
                        </h2>
                        <div className={styles.container_2}>
                            <div className={styles.block}>
                                <div className={styles.content}>
                                    <div className={styles.small_box}>
                                        <div className={styles.small_box_1}>
                                            <QuotesIcon />
                                            <h3 className={styles.feedback_author}>
                                                Ivan_Borisov123
                                            </h3>
                                        </div>
                                        <div className={styles.rat}>8.9</div>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                        sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                                        magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                                        quis nostrud exerci tation ullamcorper suscipit lobortis
                                        nisl ut aliquip ex ea c
                                    </p>
                                    <div className={styles.data}>29 августа 2021 в 17:04</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.show_more}>
                            <button id="show_more" className={styles.show_more}>
                                Читать ещё
                            </button>
                        </div>
                    </div>

                    <div>
                        <span className={styles.rathing_main}>9.0 </span>
                        <span className={styles.rathing_counts}>296 824 оценок</span>
                        <a href="#prokrutka" className={styles.rathing_details}>
                            459 отзывов
                        </a>
                        <div className={styles.mb_40}>
                            <button
                                onClick={props.openModal}
                                className={styles.btn}
                                id="leave_a_review"
                            >
                                Оставить отзыв
                            </button>
                        </div>
                    </div>
                    <FeedBackContainer
                        isModalOpen={props.isModalOpen}
                        isFeedbackSubmitted={props.isFeedbackSubmitted}
                        openModal={props.openModal}
                        closeModal={props.closeModal}
                        submitFeedback={props.submitFeedback}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilmPage;
