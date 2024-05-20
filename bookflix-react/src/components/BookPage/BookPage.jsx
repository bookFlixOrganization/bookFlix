import React from 'react';
import styles from './BookPage.module.css';
import { ReactComponent as QuotesIcon } from './images/quotes.svg';
import { ReactComponent as LikeIcon } from './images/like.svg';
import { ReactComponent as DislikeIcon } from './images/dislike.svg';
import FeedBackContainer from '../FeedBack/FeedBackContainer.jsx';

const BookPage = (props) => {
    const { bookState } = props;
    const { shortContent } = props;
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

                        <h2 className={styles.all_rathing}>Рейтинг</h2>
                        <div className={styles.all_media_rathing}>
                            <div id="open-modal-btn" className={styles.our_rathing}>
                                <div className={styles.our_own_rathing}>
                                    {' '}
                                    {bookState.rating_bookflix.toFixed(1)}
                                </div>
                                <div className={styles.user_mark}>
                                    Оценка пользователей BookFlix
                                </div>
                            </div>
                            {/* <div className={styles.not_our_rathing}>
                                <div className={styles.imdb_rathing}>9.3</div>
                                <div className={styles.user_mark}>Google</div>
                            </div> */}
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
                            {bookState.rating_bookflix.toFixed(1)}
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

export default BookPage;
