import React from 'react';
import styles from './BookPage.module.css';
import { ReactComponent as QuotesIcon } from './images/quotes.svg';

const BookPage = () => {
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
                            <div className={styles.block_1}>
                                <input className={styles.input_1} type="checkbox" id="one" />
                                <label className={styles.add} htmlFor="one">
                                    f
                                </label>
                            </div>
                        </div>

                        <h2>О книге</h2>
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

                        <h2 id="prokrutka">Отзывы зрителей</h2>
                        <div className={styles.container_2}>
                            <div className={styles.block}>
                                <div className={styles.content}>
                                    <div className={styles.small_box}>
                                        <div className={styles.small_box_1}>
                                            <QuotesIcon />
                                            <h3>Ivan_Borisov123</h3>
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

                            <div className={styles.block}>
                                <div className={styles.content}>
                                    <div className={styles.small_box}>
                                        <div className={styles.small_box_1}>
                                            <QuotesIcon />
                                            <h3>Ivan_Borisov123</h3>
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

                            <div className={styles.block}>
                                <div className={styles.content}>
                                    <div className={styles.small_box}>
                                        <div className={styles.small_box_1}>
                                            <QuotesIcon />
                                            <h3>Ivan_Borisov123</h3>
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

                            <div className={styles.block}>
                                <div className={styles.content}>
                                    <div className={styles.small_box}>
                                        <div className={styles.small_box_1}>
                                            <QuotesIcon />
                                            <h3>Ivan_Borisov123</h3>
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

                            <div className={styles.block}>
                                <div className={styles.content}>
                                    <div className={styles.small_box}>
                                        <div className={styles.small_box_1}>
                                            <QuotesIcon />
                                            <h3>Ivan_Borisov123</h3>
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

                            <div className={styles.block}>
                                <div className={styles.content}>
                                    <div className={styles.small_box}>
                                        <div className={styles.small_box_1}>
                                            <QuotesIcon />
                                            <h3>Ivan_Borisov123</h3>
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

                            <div className={styles.block}>
                                <div className={styles.content}>
                                    <div className={styles.small_box}>
                                        <div className={styles.small_box_1}>
                                            <QuotesIcon />
                                            <h3>Ivan_Borisov123</h3>
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
                            <a href="/" className={styles.btn} id="leave_a_review">
                                Оставить отзыв
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.modal} id="my-modal">
                    <div className={styles.modal__box}>
                        <button className={styles.button_1} id="close-my-modal-btn">
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
                                    <img src="images/10.png" alt="" />
                                </div>
                                <button className={styles.number}>10</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/9.png" alt="" />
                                </div>
                                <button className={styles.number}>9</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/8.png" alt="" />
                                </div>
                                <button className={styles.number}>8</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/7.png" alt="" />
                                </div>
                                <button className={styles.number}>7</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/6.png" alt="" />
                                </div>
                                <button className={styles.number}>6</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/5.png" alt="" />
                                </div>
                                <button className={styles.number}>5</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/4.png" alt="" />
                                </div>
                                <button className={styles.number}>4</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/3.png" alt="" />
                                </div>
                                <button className={styles.number}>3</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/2.png" alt="" />
                                </div>
                                <button className={styles.number}>2</button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src="images/1.png" alt="" />
                                </div>
                                <button className={styles.number}>1</button>
                            </div>
                        </div>

                        <a href="#open-block-2" id="opener" className={styles.link_open_block}>
                            <button id="close-my-modal-btn-1" className={styles.estimate}>
                                Поставить оценку
                            </button>
                        </a>
                    </div>
                </div>

                <div id="open-block-2">
                    <div className={styles.open_block_inner}>
                        <div className={styles.open_block_text}>
                            <p>Спасибо за оценку!</p>
                            <a href="/" className={styles.open_block_close} title="close">
                                x
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.modal_1} id="my-modal-1">
                    <form className={styles.modal__box_1} action="#">
                        <button className={styles.button_2} id="close-my-modal-btn-2">
                            X
                        </button>

                        <h2 className={styles.estim}>Хотите поделиться мнением?</h2>
                        <div className={styles.subtitle - 1}>Оставьте отзыв</div>

                        <div className={styles.statistics}>
                            <QuotesIcon />
                        </div>

                        <label className={styles.label} htmlFor="myRange">
                            Рейтинг
                        </label>
                        <div className={styles.slidecontainer}>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value="6"
                                className={styles.slider}
                                id="myRange"
                            />
                            <p className={styles.value}>
                                Ваша оценка: <span id="demo"></span>
                            </p>
                        </div>

                        <label className={styles.label} htmlFor="feedback_text">
                            Отзыв
                        </label>
                        <textarea
                            maxLength="255"
                            rows="4"
                            placeholder="Текст (до 255 символов)"
                            id="feedback_text"
                        ></textarea>

                        <button id="safe" className={styles.estimate}>
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
