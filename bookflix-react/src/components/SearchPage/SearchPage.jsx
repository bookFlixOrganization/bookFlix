import React from 'react';
import styles from './SearchPage.module.css';
import { NavLink } from 'react-router-dom';
import somebook from './images/somebook.jpg';

const SearchPage = (props) => {
    return (
        <div className={styles.search_container}>
            <div className={styles.search_form}>
                <input
                    value={props.userQuery}
                    onChange={props.handleUserQueryChange}
                    className={styles.search_form_text}
                    type="text"
                    placeholder="Введите название фильма или книги"
                />
                <button className={styles.search_form_button} onClick={props.handleSearch}>
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
            {(props.foundedBooks.items || props.foundedFilms.result) && (
                <div className={styles.choice}>
                    {!props.appliedFiltres && (
                        <button
                            id="films"
                            className={`${styles.choice_button} ${props.isFilmVisibility ? styles.chosen : ''}`}
                            onClick={props.toggleFilmsVisibility}
                        >
                            Фильмы
                        </button>
                    )}
                    {!props.appliedFiltres && (
                        <button
                            id="books"
                            className={`${styles.choice_button} ${props.isBookVisibility ? styles.chosen : ''}`}
                            onClick={props.toggleBookVisibility}
                        >
                            Книги
                        </button>
                    )}
                    {props.isFiltres && !props.appliedFiltres && (
                        <button
                            id="safe"
                            className={`${styles.choice_button} ${styles.apply_filtres}`}
                            onClick={props.handleApplyFilters}
                        >
                            Применить фильтры
                        </button>
                    )}
                    {props.appliedFiltres && (
                        <button
                            id="clear"
                            className={`${styles.choice_button} ${styles.apply_filtres}`}
                            onClick={props.handleClearFilters}
                        >
                            Очистить фильтры
                        </button>
                    )}
                </div>
            )}

            {props.isFilmVisibility && (
                <div className={styles.all_filters} id="hiddenDiv">
                    <div className={styles.filters}>
                        <p className={styles.section_title}>Год выпуска</p>
                        <div className={styles.filters_1}>{props.filmYearsButtons}</div>
                    </div>
                </div>
            )}

            {props.isBookVisibility && (
                <div className={styles.all_filters} id="hiddenDiv">
                    <div className={styles.filters}>
                        <p className={styles.section_title}>Год выпуска</p>
                        <div className={styles.filters_1}>{props.bookYearsButtons}</div>
                    </div>

                    <div className={styles.filters}>
                        <p className={styles.section_title}>Автор</p>
                        <div className={styles.filters_1}>
                            <input
                                className={styles.filter_author}
                                value={props.authorBook}
                                onChange={props.handleAuthorBookChange}
                            ></input>
                        </div>
                    </div>
                </div>
            )}

            {props.foundedBooks.items && (
                <>
                    <p className={styles.founded_title}>Найденные книги:</p>
                    <div className={styles.movies}>
                        {props.foundedBooks.items.map((item, index) => (
                            <NavLink
                                key={index}
                                to={`/book-page/${item.id}`}
                                className={styles.movie}
                            >
                                <div className={styles.movie__cover_inner}>
                                    {item.volumeInfo.imageLinks &&
                                    item.volumeInfo.imageLinks.thumbnail ? (
                                        <img
                                            src={item.volumeInfo.imageLinks.thumbnail}
                                            alt={item.volumeInfo.title}
                                            className={styles.movie__cover}
                                        />
                                    ) : (
                                        <img
                                            src={somebook}
                                            alt={item.volumeInfo.title}
                                            className={styles.movie__cover}
                                        />
                                    )}
                                </div>
                                <div className={styles.movie__info}>
                                    <div className={styles.movie__title}>
                                        {item.volumeInfo.title}
                                    </div>
                                    <div className={styles.movie__category}>
                                        {item.volumeInfo.authors && item.volumeInfo.authors[0]}
                                    </div>
                                    <div className={styles.movie__category}>
                                        {item.volumeInfo.publishedDate}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </>
            )}

            {props.foundedFilms.result && (
                <>
                    <p className={styles.founded_title}>Найденные фильмы:</p>
                    <div className={styles.movies}>
                        {props.foundedFilms.result.map((item, index) => (
                            <NavLink
                                key={index}
                                to={`/film-page/${item.movieID}/imdb`}
                                className={styles.movie}
                            >
                                <div className={styles.movie__cover_inner}>
                                    {item['full-size cover url'] ? (
                                        <img
                                            src={item['full-size cover url']}
                                            alt={item.title}
                                            className={styles.movie__cover}
                                        />
                                    ) : (
                                        <img
                                            src={somebook}
                                            alt={item.title}
                                            className={styles.movie__cover}
                                        />
                                    )}
                                </div>
                                <div className={styles.movie__info}>
                                    <div className={styles.movie__title}>{item.title}</div>
                                    <div className={styles.movie__category}>{item.year}</div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchPage;
