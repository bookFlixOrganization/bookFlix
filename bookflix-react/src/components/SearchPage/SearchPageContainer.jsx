import React, { useState } from 'react';
import SearchPage from './SearchPage.jsx';
import styles from './SearchPage.module.css';
import SessionChecker from '../SessionChecker.jsx';

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

    const [selectedBookGenres, setSelectedBookGenres] = useState([]);
    const [selectedFilmGenres, setSelectedFilmGenres] = useState([]);
    const [selectedFilmYears, setSelectedFilmYears] = useState([]);
    const [selectedBookYears, setSelectedBookYears] = useState([]);
    const [authorBook, setAuthorBook] = useState('');
    const [authorFilm, setAuthorFilm] = useState('');

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
    return (
        <>
            <SessionChecker />
            <SearchPage
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
            />
        </>
    );
};

export default SearchPageContainer;
