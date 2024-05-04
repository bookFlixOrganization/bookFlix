import React from 'react';
import styles from './BookPage.module.css';
import { ReactComponent as QuotesIcon } from './images/quotes.svg';
import { ReactComponent as FavouriteIcon } from './images/favourite.svg';
import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';
import image4 from './images/4.png';
import image5 from './images/5.png';
import image6 from './images/6.png';
import image7 from './images/7.png';
import image8 from './images/8.png';
import image9 from './images/9.png';
import image10 from './images/10.png';

const BookPage = (props) => {
    return (
        <div className={styles.bookpage_container}>
            <div className={styles.container_1}>
                <div className={styles.wrapper}>
                    <img className={styles.film_book} src="images/Pik dama.jpg" alt="" />
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
                            <button id="open-modal-btn" className={styles.our_rathing}>
                                <div className={styles.our_own_rathing}>9.0</div>
                                <div className={styles.user_mark}>
                                    Оценка пользователей BookFlix
                                </div>
                                <div className={styles.your_mark}>Ваша оценка</div>
                            </button>
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
                        <div className={styles.mb - 40}>
                            <button
                                onClick={props.openModal}
                                className={styles.btn}
                                id="leave_a_review"
                            >
                                Оставить отзыв
                            </button>
                        </div>
                    </div>
                </div>
                {props.isModalOpen && (
                    <div
                        className={`${styles.modal} ${props.isModalOpen ? styles.open : ''}`}
                        id="my-modal"
                    >
                        <div className={styles.modal__box}>
                            <button
                                onClick={props.closeModal}
                                className={styles.button_1}
                                id="close-my-modal-btn"
                            >
                                X
                            </button>
                            <h2 className={styles.estim}>Оцени книгу</h2>
                            <div className={styles.subtitle}>Пиковая Дама</div>
                            <div className={styles.statistics}>
                                <QuotesIcon />
                            </div>
                            <div className={styles.numbers}>
                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image1} alt="" />
                                    </div>
                                    <button className={styles.number}>1</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image2} alt="" />
                                    </div>
                                    <button className={styles.number}>2</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image3} alt="" />
                                    </div>
                                    <button className={styles.number}>3</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image4} alt="" />
                                    </div>
                                    <button className={styles.number}>4</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image5} alt="" />
                                    </div>
                                    <button className={styles.number}>5</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image6} alt="" />
                                    </div>
                                    <button className={styles.number}>6</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image7} alt="" />
                                    </div>
                                    <button className={styles.number}>7</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image8} alt="" />
                                    </div>
                                    <button className={styles.number}>8</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image9} alt="" />
                                    </div>
                                    <button className={styles.number}>9</button>
                                </div>

                                <div className={styles.rathing_mark}>
                                    <div className={styles.emoji}>
                                        <img src={image10} alt="" />
                                    </div>
                                    <button className={styles.number}>10</button>
                                </div>
                            </div>
                            <div className={styles.modal_feedback_text}>
                                <label className={styles.label} htmlFor="feedback_text">
                                    Отзыв
                                </label>
                                <textarea
                                    maxLength="255"
                                    rows="4"
                                    placeholder="Текст (до 255 символов)"
                                    id="feedback_text"
                                ></textarea>
                            </div>

                            <button
                                id="close-my-modal-btn-1"
                                className={styles.estimate}
                                onClick={props.submitFeedback}
                            >
                                Поставить оценку
                            </button>
                        </div>
                    </div>
                )}

                {props.isFeedbackSubmitted && (
                    <div
                        className={`${styles.open_block_2} ${props.isFeedbackSubmitted ? styles.active : ''}`}
                    >
                        <div className={styles.open_block_inner}>
                            <div className={styles.open_block_text}>
                                <p>Спасибо за оценку!</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookPage;
