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

    const [selectedBookGenre, setSelectedBookGenre] = useState(null);
    const [selectedFilmGenre, setSelectedFilmGenre] = useState(null);
    const [selectedFilmYear, setSelectedFilmYear] = useState(null);
    const [selectedBookYear, setSelectedBookYear] = useState(null);
    const [authorBook, setAuthorBook] = useState('');
    const [authorFilm, setAuthorFilm] = useState('');

    const handleYearClick = (year, type) => {
        if (type === 'book') {
            setSelectedBookYear((prevYear) => (prevYear === year ? null : year));
        } else if (type === 'film') {
            setSelectedFilmYear((prevYear) => (prevYear === year ? null : year));
        }
    };

    const handleGenreClick = (genre, type) => {
        if (type === 'book') {
            setSelectedBookGenre((prevGenre) => (prevGenre === genre ? null : genre));
        } else if (type === 'film') {
            setSelectedFilmGenre((prevGenre) => (prevGenre === genre ? null : genre));
        }
    };

    const handleAuthorBookChange = (event) => {
        setAuthorBook(event.target.value);
    };
    const handleAuthorFilmChange = (event) => {
        setAuthorFilm(event.target.value);
    };

    const filmYearsButtons = [];
    for (let year = 1940; year <= 2030; year += 10) {
        filmYearsButtons.push(
            <button
                key={year}
                type="button"
                className={`${styles.input_1} ${selectedFilmYear === year ? styles.active : ''}`}
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
                className={`${styles.input_1} ${selectedBookYear === year ? styles.active : ''}`}
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
                selectedBookGenre={selectedBookGenre}
                selectedFilmGenre={selectedFilmGenre}
                selectedFilmYear={selectedFilmYear}
                selectedBookYear={selectedBookYear}
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
            />
        </>
    );
};

export default SearchPageContainer;
