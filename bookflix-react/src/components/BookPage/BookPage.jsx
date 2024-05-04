import React from 'react';
import styles from './BookPage.module.css';
import { ReactComponent as QuotesIcon } from './images/quotes.svg';
import { ReactComponent as FavouriteIcon } from './images/favourite.svg';
import cover from './images/cover.jpg';
import FeedBackContainer from '../FeedBack/FeedBackContainer.jsx';

const BookPage = (props) => {
    return (
        <div className={styles.bookpage_container}>
            <div className={styles.container_1}>
                <div className={styles.wrapper}>
                    <img className={styles.film_book} src={cover} alt="" />
                    <div>
                        <h1 className={styles.title}>Пиковая Дама</h1>
                        <h6 className={styles.subtitle}>А. С. Пушкин</h6>
                        <p className={styles.description}>
                            Александр Сергеевич Пушкин, безусловно, был великим поэтом и писателем.
                            Но, кроме всего прочего, он слыл азартным игроком и заядлым картежником.
                            Однажды генерал-губернатор Дмитрий Голицын рассказал Пушкину байку о
                            своей матери – княгине Наталье Борисовне. Ходили слухи, будто «усатая
                            княгиня» – Голицына, известная своей страстью к карточным играм, знает
                            три заветные карты, которые принесут выигрыш любому, даже самому
                            неудачливому игроку. Пушкин с присущим только ему умением и талантом
                            превращать в предмет искусства все, что его окружает, незамедлительно
                            сделал Голицыну прототипом графини в небезызвестной «Пиковой даме». Так
                            на свет появилось произведение о Германе, старой графине и тайне трех
                            карт, которые могут сделать человека несказанно богатым или в одночасье
                            свести его с ума.
                        </p>

                        <div className={styles.mb_41}>
                            <a href="/" className={styles.btn}>
                                Читать
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

                        <h2 className={styles.about}>О книге</h2>
                        <ul className={styles.params}>
                            <li>
                                <span className={styles.label}>Дата публикации</span>August 8, 2019
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
                                <span className={styles.label}>Количество страниц</span>400
                            </li>
                            <li>
                                <span className={styles.label}>Язык</span>Русский
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
                                <div className={styles.user_mark}>Google</div>
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

export default BookPage;
