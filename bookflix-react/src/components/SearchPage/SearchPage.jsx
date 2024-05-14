import React from 'react';
import styles from './SearchPage.module.css';

const SearchPage = (props) => {
    return (
        <div className={styles.search_container}>
            <div className={styles.search_form}>
                <input
                    className={styles.search_form_text}
                    type="text"
                    placeholder="Введите название фильма или книги"
                />
                <button className={styles.search_form_button}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        style={{ fill: 'white' }}
                    >
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </button>
            </div>

            <div className={styles.choice}>
                <button
                    id="films"
                    className={styles.choice_button}
                    onClick={props.toggleFilmsVisibility}
                >
                    Фильмы
                </button>
                <button id="books" className={styles.choice_button}>
                    Книги
                </button>
            </div>

            {props.isFilmVisibility && (
                <div className={styles.all_filters} id="hiddenDiv">
                    <div className={styles.filters}>
                        <p className={styles.section_title}>Жанр</p>
                        <div className={styles.filters_1}>
                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Хоррор</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Драма</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Мистика</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Научно-фантастический</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Романтический</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Нуар</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Фентези</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Биография</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Документальный</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Мюзикл</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Триллер</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Криминальный</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Экшн</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Военный</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Приключения</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Комедия</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Вестерн</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Исторический</p>
                            </button>

                            <button type="button" className={styles.input_1} id="#">
                                <p className={styles.text_on_button}>Семейный</p>
                            </button>
                        </div>
                    </div>

                    <div className={styles.filters}>
                        <p className={styles.section_title}>Год выпуска</p>
                        <div className={styles.filters_1}>{props.yearsButtons}</div>
                    </div>

                    <div className={styles.filters}>
                        <p className={styles.section_title}>Рейтинг</p>
                        <div className={styles.filters_1}>{props.rathingButtons}</div>
                    </div>

                    <div className={styles.apply}>
                        <button id="safe" className={styles.choice_button}>
                            Применить фильтры
                        </button>
                    </div>
                </div>
            )}

            {/* <div className={styles.movies}>
                <a href="/" className={styles.movie}>
                    <div className={styles.movie__cover_inner}></div>
                    <div className={styles.movie__info}>
                        <div className={styles.movie__title}>Однажды в Голливуде</div>
                        <div className={styles.movie__category}>2019, комедия</div>
                        <div className={styles.movie__average}>9.3</div>
                    </div>
                </a>
            </div> */}
        </div>
    );
};

export default SearchPage;
