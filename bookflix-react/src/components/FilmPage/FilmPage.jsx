import React from 'react';
import styles from './FilmPage.module.css';
import { ReactComponent as LikeIcon } from './images/like.svg';
import { ReactComponent as DislikeIcon } from './images/dislike.svg';

const FilmPage = (props) => {
    const { filmState } = props;
    // console.log(filmState);
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
                            <a
                                href={filmState.video_url}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.btn}
                            >
                                Смотреть
                            </a>
                            <button
                                className={`${styles.block_1} ${props.isLiked ? styles.active : ''}`}
                                onClick={props.handleLikeClick}
                            >
                                <LikeIcon
                                    className={`${styles.btn_icon} ${props.isLiked ? styles.active : ''}`}
                                />
                            </button>
                            <button
                                className={`${styles.block_1} ${props.isDisliked ? styles.active : ''}`}
                                onClick={props.handleDislikeClick}
                            >
                                <DislikeIcon
                                    className={`${styles.btn_icon} ${props.isDisliked ? styles.active : ''}`}
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
                            <div className={styles.not_our_rathing}>
                                <div className={styles.imdb_rathing}>
                                    {filmState.rating_imdb
                                        ? filmState.rating_imdb.toFixed(1)
                                        : 'Нет оценки'}
                                </div>{' '}
                                <div className={styles.user_mark}>iMDb</div>
                            </div>
                        </div>

                        <h2 className={styles.top_cast}>Актёры</h2>
                        <div className={styles.actors}>
                            {filmState.actors &&
                                filmState.actors.map((actor, index) => (
                                    <div key={index} className={styles.actor}>
                                        <div className={styles.name}>{actor.name}</div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div>
                        <span className={styles.rathing_counts}>296 824 оценок</span>
                        <a href="#prokrutka" className={styles.rathing_details}>
                            459 отзывов
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmPage;
