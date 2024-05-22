import React from 'react';
import styles from './SearchPage.module.css';

const SearchPage = (props) => {
    const filmGenres = [
        { genre: 'Horror', name: 'Хоррор' },
        { genre: 'Drama', name: 'Драма' },
        { genre: 'Mystery', name: 'Мистика' },
        { genre: 'Sci-fi', name: 'Научно-фантастический' },
        { genre: 'Romance', name: 'Романтический' },
        { genre: 'Film-noir', name: 'Нуар' },
        { genre: 'Fantasy', name: 'Фентези' },
        { genre: 'Biography', name: 'Биография' },
        { genre: 'Documentary', name: 'Документальный' },
        { genre: 'Music', name: 'Мюзикл' },
        { genre: 'Thriller', name: 'Триллер' },
        { genre: 'Crime', name: 'Криминальный' },
        { genre: 'Action', name: 'Экшн' },
        { genre: 'War', name: 'Военный' },
        { genre: 'Adventure', name: 'Приключения' },
        { genre: 'Comedy', name: 'Комедия' },
        { genre: 'Western', name: 'Вестерн' },
        { genre: 'History', name: 'Исторический' },
        { genre: 'Family', name: 'Семейный' },
    ];
    const bookGenres = [
        { genre: 'Fantastic', name: 'Фантастика' },
        { genre: 'Detective', name: 'Детектив' },
        { genre: 'Business literature', name: 'Бизнес-литература' },
        { genre: "Children's literature", name: 'Детская литература' },
        { genre: 'Novel', name: 'Роман' },
        { genre: 'Horror', name: 'Ужасы' },
        { genre: 'Science fiction', name: 'Научная фантастика' },
        { genre: 'Psychology', name: 'Психология' },
        { genre: 'Computer literature', name: 'Компьютерная литература' },
        { genre: 'Classic literature', name: 'Классическая литература' },
        { genre: 'Adventure', name: 'Приключения' },
        { genre: 'Study literature', name: 'Учебная литература' },
        { genre: 'Fantasy', name: 'Фэнтези' },
    ];
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
                    className={`${styles.choice_button} ${props.isFilmVisibility ? styles.chosen : ''}`}
                    onClick={props.toggleFilmsVisibility}
                >
                    Фильмы
                </button>
                <button
                    id="books"
                    className={`${styles.choice_button} ${props.isBookVisibility ? styles.chosen : ''}`}
                    onClick={props.toggleBookVisibility}
                >
                    Книги
                </button>
            </div>

            {props.isFilmVisibility && (
                <div className={styles.all_filters} id="hiddenDiv">
                    <div className={styles.filters}>
                        <p className={styles.section_title}>Жанр</p>
                        <div className={styles.filters_1}>
                            {filmGenres.map((genreItem, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`${styles.input_1} ${props.selectedFilmGenre === genreItem.genre ? styles.active : ''}`}
                                    onClick={() => props.handleGenreClick(genreItem.genre, 'film')}
                                >
                                    <p className={styles.text_on_button}>{genreItem.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filters}>
                        <p className={styles.section_title}>Год выпуска</p>
                        <div className={styles.filters_1}>{props.filmYearsButtons}</div>
                    </div>

                    <div className={styles.apply}>
                        <button id="safe" className={styles.choice_button}>
                            Применить фильтры
                        </button>
                    </div>
                </div>
            )}

            {props.isBookVisibility && (
                <div className={styles.all_filters} id="hiddenDiv">
                    <div className={styles.filters}>
                        <p className={styles.section_title}>Жанр</p>
                        <div className={styles.filters_1}>
                            {bookGenres.map((genreItem, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`${styles.input_1} ${props.selectedBookGenre === genreItem.genre ? styles.active : ''}`}
                                    onClick={() => props.handleGenreClick(genreItem.genre, 'book')}
                                >
                                    <p className={styles.text_on_button}>{genreItem.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filters}>
                        <p className={styles.section_title}>Год выпуска</p>
                        <div className={styles.filters_1}>{props.bookYearsButtons}</div>
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
