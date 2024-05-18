import React from 'react';
import styles from './FilmPage.module.css';
import { ReactComponent as QuotesIcon } from './images/quotes.svg';
import { ReactComponent as FavouriteIcon } from './images/favourite.svg';
import someone from './images/photo.jpg';
import FeedBackContainer from '../FeedBack/FeedBackContainer.jsx';

const FilmPage = (props) => {
    const { filmState } = props;
    const formatRuntime = (runtimeInMinutes) => {
        const hours = Math.floor(runtimeInMinutes / 60);
        const minutes = runtimeInMinutes % 60;
        return `${hours} ч. ${minutes} мин.`;
    };
    return (
        <div className={styles.bookpage_container}>
            <div className={styles.container_1}>
                <div className={styles.wrapper}>
                    <img className={styles.film_book} src={filmState.cover_url} alt="" />
                    <div>
                        <h1 className={styles.title}>{filmState.name}</h1>
                        <h6
                            className={styles.subtitle}
                        >{`${filmState.original_name} ${filmState.age}`}</h6>
                        <p className={styles.description}>{filmState.description}</p>

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
                                <span className={styles.label}>Аудиодорожки</span>
                                {filmState.tracks && filmState.tracks.join(', ')}
                            </li>
                        </ul>

                        <h2 className={styles.about}>О фильме</h2>
                        <ul className={styles.params}>
                            <li>
                                <span className={styles.label}>Дата выхода</span>
                                {filmState.date}
                            </li>
                            <li>
                                <span className={styles.label}>Страна</span>{' '}
                                {filmState.countries && filmState.countries.join(', ')}
                            </li>
                            <li>
                                <span className={styles.label}>Жанр</span>
                                <span>{filmState.genre && filmState.genre.join(', ')}</span>
                            </li>
                            {/* <li>
                                <span className={styles.label}>Слоган</span>
                                <time className={styles.text_muted}>
                                    «The 9th Film from Quentin Tarantino»
                                </time>
                            </li> */}
                            <li>
                                <span className={styles.label}>Режиссёр</span>
                                {filmState.director}
                            </li>
                            <li>
                                <span className={styles.label}>Длительность</span>
                                <time className={styles.text_muted}>
                                    {filmState.runtimes
                                        ? `${filmState.runtimes} мин / ${formatRuntime(filmState.runtimes)}`
                                        : 'Не указана'}
                                </time>
                            </li>
                            <li>
                                <span className={styles.label}>Бюджет</span>
                                {filmState.budget}
                            </li>
                            <li>
                                <span className={styles.label}>Возраст</span>
                                <span>
                                    <span className={styles.tag}>{filmState.age}</span>
                                </span>
                            </li>
                        </ul>

                        <h2 className={styles.all_rathing}>Рейтинг</h2>
                        <div className={styles.all_media_rathing}>
                            <div id="open-modal-btn" className={styles.our_rathing}>
                                <div className={styles.our_own_rathing}>
                                    {filmState.rating_bookflix}
                                </div>
                                <div className={styles.user_mark}>
                                    Оценка пользователей BookFlix
                                </div>
                            </div>
                            <div className={styles.not_our_rathing}>
                                <div className={styles.imdb_rathing}>
                                    {filmState.rating_imdb
                                        ? filmState.rating_imdb.toFixed(1)
                                        : 'Нет оценки'}
                                </div>{' '}
                                <div className={styles.user_mark}>iMDb</div>
                            </div>
                        </div>

                        <h2 className={styles.top_cast}>Топ актёры</h2>
                        <div className={styles.actors}>
                            {filmState.actors &&
                                filmState.actors.map((actor, index) => (
                                    <div key={index} className={styles.actor}>
                                        {actor.fullSizeHeadshot && (
                                            <img
                                                src={actor.fullSizeHeadshot}
                                                alt={actor.name}
                                                className={styles.photo}
                                            />
                                        )}
                                        {!actor.fullSizeHeadshot && (
                                            <img
                                                src={someone}
                                                alt={actor.name}
                                                className={styles.photo}
                                            />
                                        )}
                                        <div className={styles.name}>{actor.name}</div>
                                        <div className={styles.nickname}>{actor.canonicalName}</div>
                                    </div>
                                ))}
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
                        <span className={styles.rathing_main}>
                            {filmState.rating_bookflix.toFixed(1)}
                        </span>
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
