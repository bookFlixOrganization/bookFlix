import React, { useState } from 'react';
import SearchPage from './SearchPage.jsx';
import styles from './SearchPage.module.css';
import SessionChecker from '../SessionChecker.jsx';
import axios from 'axios';
import { server } from '../../serverconf.js';

const SearchPageContainer = () => {
    const [isFilmVisibility, setIsFilmVisibility] = useState(false);
    const [isBookVisibility, setIsBookVisibility] = useState(false);
    const toggleFilmVisibility = () => {
        if (isBookVisibility) {
            setIsBookVisibility(!isBookVisibility);
        }
        setIsFilmVisibility(!isFilmVisibility);
    };
    const toggleBookVisibility = () => {
        if (isFilmVisibility) {
            setIsFilmVisibility(!isFilmVisibility);
        }
        setIsBookVisibility(!isBookVisibility);
    };

    const [userQuery, setUserQuery] = useState('');
    const [selectedBookGenres, setSelectedBookGenres] = useState([]);
    const [selectedFilmGenres, setSelectedFilmGenres] = useState([]);
    const [selectedFilmYears, setSelectedFilmYears] = useState([]);
    const [selectedBookYears, setSelectedBookYears] = useState([]);
    const [authorBook, setAuthorBook] = useState('');
    const [authorFilm, setAuthorFilm] = useState('');

    const handleUserQueryChange = (event) => {
        setUserQuery(event.target.value);
    };

    const handleYearClick = (year, type) => {
        if (type === 'book') {
            setSelectedBookYears((prevYears) => {
                if (prevYears.includes(year)) {
                    return prevYears.filter((y) => y !== year);
                } else {
                    return [...prevYears, year];
                }
            });
        } else if (type === 'film') {
            setSelectedFilmYears((prevYears) => {
                if (prevYears.includes(year)) {
                    return prevYears.filter((y) => y !== year);
                } else {
                    return [...prevYears, year];
                }
            });
        }
    };

    const handleGenreClick = (genre, type) => {
        if (type === 'book') {
            setSelectedBookGenres((prevGenres) => {
                if (prevGenres.includes(genre)) {
                    return prevGenres.filter((g) => g !== genre);
                } else {
                    return [...prevGenres, genre];
                }
            });
        } else if (type === 'film') {
            setSelectedFilmGenres((prevGenres) => {
                if (prevGenres.includes(genre)) {
                    return prevGenres.filter((g) => g !== genre);
                } else {
                    return [...prevGenres, genre];
                }
            });
        }
    };

    const handleAuthorBookChange = (event) => {
        setAuthorBook(event.target.value);
    };
    const handleAuthorFilmChange = (event) => {
        setAuthorFilm(event.target.value);
    };

    const handleClearFiltres = () => {
        setSelectedBookGenres([]);
        setSelectedFilmGenres([]);
        setSelectedBookYears([]);
        setSelectedFilmYears([]);
        setAuthorBook('');
        setAuthorFilm('');
        setIsFilmVisibility(false);
        setIsBookVisibility(false);
    };

    const filmYearsButtons = [];
    for (let year = 1940; year <= 2030; year += 10) {
        filmYearsButtons.push(
            <button
                key={year}
                type="button"
                className={`${styles.input_1} ${selectedFilmYears.includes(year) ? styles.active : ''}`}
                onClick={() => handleYearClick(year, 'film')}
            >
                <p className={styles.text_on_button}>{`${year}-${year + 9}`}</p>
            </button>,
        );
    }
    const bookYearsButtons = [];
    for (let year = 1940; year <= 2030; year += 10) {
        bookYearsButtons.push(
            <button
                key={year}
                type="button"
                className={`${styles.input_1} ${selectedBookYears.includes(year) ? styles.active : ''}`}
                onClick={() => handleYearClick(year, 'book')}
            >
                <p className={styles.text_on_button}>{`${year}-${year + 9}`}</p>
            </button>,
        );
    }

    const [foundedBooks, setFoundedBooks] = useState([]);
    const [foundedFilms, setFoundedFilms] = useState([]);

    const handleSearch = async () => {
        try {
            const [booksResponse, filmsResponse] = await Promise.allSettled([
                axios.get(`${server}/search/book?query=${userQuery}`),
                axios.get(`${server}/search/movie?query=${userQuery}`),
            ]);

            if (booksResponse.status === 'fulfilled') {
                setFoundedBooks(booksResponse.value.data);
            } else {
                console.error('Ошибка при загрузке книг:', booksResponse.reason);
            }

            if (filmsResponse.status === 'fulfilled') {
                setFoundedFilms(filmsResponse.value.data);
            } else {
                console.error('Ошибка при загрузке фильмов:', filmsResponse.reason);
            }
        } catch (error) {
            console.error('Произошла ошибка при выполнении запросов:', error);
        }
    };

    console.log(foundedBooks, foundedFilms);

    return (
        <>
            <SessionChecker />
            <SearchPage
                userQuery={userQuery}
                handleUserQueryChange={handleUserQueryChange}
                selectedBookGenres={selectedBookGenres}
                selectedFilmGenres={selectedFilmGenres}
                selectedFilmYears={selectedFilmYears}
                selectedBookYears={selectedBookYears}
                isBookVisibility={isBookVisibility}
                isFilmVisibility={isFilmVisibility}
                toggleFilmsVisibility={toggleFilmVisibility}
                toggleBookVisibility={toggleBookVisibility}
                handleGenreClick={handleGenreClick}
                handleYearClick={handleYearClick}
                filmYearsButtons={filmYearsButtons}
                bookYearsButtons={bookYearsButtons}
                authorBook={authorBook}
                authorFilm={authorFilm}
                handleAuthorBookChange={handleAuthorBookChange}
                handleAuthorFilmChange={handleAuthorFilmChange}
                handleClearFiltres={handleClearFiltres}
                handleSearch={handleSearch}
                foundedBooks={foundedBooks}
                foundedFilms={foundedFilms}
            />
        </>
    );
};

export default SearchPageContainer;
