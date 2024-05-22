import React, { useState } from 'react';
import SearchPage from './SearchPage.jsx';
import styles from './SearchPage.module.css';
import SessionChecker from '../SessionChecker.jsx';

const SearchPageContainer = () => {
    const [isFilmVisibility, setIsFilmVisibility] = useState(false);
    const toggleFilmVisibility = () => {
        setIsFilmVisibility(!isFilmVisibility);
    };

    const rathingButtons = [];
    for (let i = 1; i <= 10; i++) {
        rathingButtons.push(
            <button key={i} type="button" className={styles.input_1}>
                <p className={styles.text_on_button}>Не менее {i}⭐</p>
            </button>,
        );
    }

    const [selectedBookGenre, setSelectedBookGenre] = useState(null);
    const [selectedFilmGenre, setSelectedFilmGenre] = useState(null);
    const [selectedFilmYear, setSelectedFilmYear] = useState(null);

    const handleYearClick = (year) => {
        setSelectedFilmYear((prevYear) => (prevYear === year ? null : year));
    };

    const handleGenreClick = (genre, type) => {
        if (type === 'book') {
            setSelectedBookGenre((prevGenre) => (prevGenre === genre ? null : genre));
        } else if (type === 'film') {
            setSelectedFilmGenre((prevGenre) => (prevGenre === genre ? null : genre));
        }
    };

    const yearsButtons = [];
    for (let year = 1940; year <= 2030; year += 10) {
        yearsButtons.push(
            <button
                key={year}
                type="button"
                className={`${styles.input_1} ${selectedFilmYear === year ? styles.active : ''}`}
                onClick={() => handleYearClick(year)}
            >
                <p className={styles.text_on_button}>{`${year}-${year + 9}`}</p>
            </button>,
        );
    }
    return (
        <>
            <SessionChecker />
            <SearchPage
                yearsButtons={yearsButtons}
                selectedBookGenre={selectedBookGenre}
                selectedFilmGenre={selectedFilmGenre}
                selectedFilmYear={selectedFilmYear}
                rathingButtons={rathingButtons}
                isFilmVisibility={isFilmVisibility}
                toggleFilmsVisibility={toggleFilmVisibility}
                handleGenreClick={handleGenreClick}
                handleYearClick={handleYearClick}
            />
        </>
    );
};

export default SearchPageContainer;
