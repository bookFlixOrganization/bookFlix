import React from 'react';
import styles from './BookPage.module.css';
import { ReactComponent as LikeIcon } from './images/like.svg';
import { ReactComponent as DislikeIcon } from './images/dislike.svg';
import { useNavigate } from 'react-router-dom';

const BookPage = (props) => {
    const { bookState } = props;
    const { shortContent } = props;
    const navigate = useNavigate();
    return (
        <div className={styles.bookpage_container}>
            <div className={styles.container_1}>
                <div className={styles.wrapper}>
                    <img className={styles.film_book} src={bookState.cover_url} alt="" />
                    <div>
                        <h1 className={styles.title}>{bookState.name}</h1>
                        <h6 className={styles.subtitle}>
                            {bookState.author && bookState.author.join(', ')}
                        </h6>
                        <p
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: bookState.description }}
                        ></p>

                        <div className={styles.mb_41}>
                            <a
                                href={bookState.buy_url}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.btn}
                            >
                                Читать
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
                            <button
                                onClick={props.handleShortClick}
                                className={`${styles.btn_short} ${styles.btn}`}
                            >
                                Краткое содержание
                            </button>
                        </div>
                        {shortContent && (
                            <div className={styles.short_content}>{props.shortContent}</div>
                        )}

                        <h2 className={styles.about}>О книге</h2>
                        <ul className={styles.params}>
                            <li>
                                <span className={styles.label}>Дата публикации</span>
                                {bookState.date}
                            </li>
                            <li>
                                <span className={styles.label}>Жанр</span>
                                <span>{bookState.genre && bookState.genre.join(', ')}</span>
                            </li>
                            <li>
                                <span className={styles.label}>Количество страниц</span>
                                {bookState.numberOfPages}
                            </li>
                            <li>
                                <span className={styles.label}>Язык</span>
                                {bookState.language}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className={styles.mb_40}>
                            <button
                                className={styles.btn}
                                id="leave_a_review"
                                onClick={() => navigate(`/new-article/${bookState.bookId}`)}
                            >
                                Оставить отзыв
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
