import React, { useState } from 'react';
import SearchPage from './SearchPage.jsx';
import styles from './SearchPage.module.css';
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
    const [selectedFilmYears, setSelectedFilmYears] = useState([]);
    const [selectedBookYears, setSelectedBookYears] = useState([]);
    const [authorBook, setAuthorBook] = useState('');
    const [appliedFiltres, setAppliedFiltres] = useState(false);

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

    const handleAuthorBookChange = (event) => {
        setAuthorBook(event.target.value);
    };

    const handleClearFiltres = () => {
        setSelectedBookYears([]);
        setSelectedFilmYears([]);
        setAuthorBook('');
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
    const [originalFoundedFilms, setOriginalFoundedFilms] = useState([]);
    const [originalFoundedBooks, setOriginalFoundedBooks] = useState([]);

    const handleSearch = async () => {
        setFoundedBooks([]);
        setFoundedFilms([]);
        try {
            const [booksResponse, filmsResponse] = await Promise.allSettled([
                axios.get(`${server}/search/book?query=${userQuery}`),
                axios.get(`${server}/search/movie?query=${userQuery}`),
            ]);

            if (booksResponse.status === 'fulfilled') {
                setFoundedBooks(booksResponse.value.data);
                setOriginalFoundedBooks(booksResponse.value.data);
            } else {
                console.error('Ошибка при загрузке книг:', booksResponse.reason);
            }

            if (filmsResponse.status === 'fulfilled') {
                setFoundedFilms(filmsResponse.value.data);
                setOriginalFoundedFilms(filmsResponse.value.data);
            } else {
                console.error('Ошибка при загрузке фильмов:', filmsResponse.reason);
            }
        } catch (error) {
            console.error('Произошла ошибка при выполнении запросов:', error);
        }
    };

    const applyFilmYearFilter = () => {
        if (selectedFilmYears.length > 0) {
            const filteredFilms = foundedFilms.result.filter((film) => {
                const filmYear = parseInt(film.year);
                return selectedFilmYears.some((year) => {
                    return filmYear >= year && filmYear <= year + 9;
                });
            });
            setFoundedFilms({ status: 'ok', result: filteredFilms });
        }
    };

    const applyBookYearFilter = () => {
        if (selectedBookYears.length > 0) {
            const filteredBooks = foundedBooks.items.filter((book) => {
                const bookYear = book.volumeInfo?.publishedDate?.split('-')[0];
                return selectedBookYears.some((year) => {
                    return bookYear >= year && bookYear <= year + 9;
                });
            });
            setFoundedBooks({ status: 'ok', items: filteredBooks });
        }
    };

    const applyAuthorFilter = () => {
        if (authorBook !== '') {
            const filteredBooks = foundedBooks.items.filter((book) => {
                const bookAuthor = book.volumeInfo?.authors?.[0];
                return bookAuthor?.toLowerCase().includes(authorBook.toLowerCase());
            });
            setFoundedBooks({ status: 'ok', items: filteredBooks });
        }
    };

    const handleApplyFilters = () => {
        applyFilmYearFilter();
        applyBookYearFilter();
        applyAuthorFilter();
        setAppliedFiltres(true);
    };

    const handleClearFilters = () => {
        setFoundedBooks(originalFoundedBooks);
        setFoundedFilms(originalFoundedFilms);
        handleClearFiltres();
        setAppliedFiltres(false);
    };

    const isActiveFiltres = () => {
        return selectedFilmYears.length > 0 || selectedBookYears.length > 0 || authorBook !== '';
    };
    const isFiltres = isActiveFiltres();
    return (
        <>
            <SearchPage
                appliedFiltres={appliedFiltres}
                isFiltres={isFiltres}
                userQuery={userQuery}
                handleUserQueryChange={handleUserQueryChange}
                selectedFilmYears={selectedFilmYears}
                selectedBookYears={selectedBookYears}
                isBookVisibility={isBookVisibility}
                isFilmVisibility={isFilmVisibility}
                toggleFilmsVisibility={toggleFilmVisibility}
                toggleBookVisibility={toggleBookVisibility}
                handleYearClick={handleYearClick}
                filmYearsButtons={filmYearsButtons}
                bookYearsButtons={bookYearsButtons}
                authorBook={authorBook}
                handleAuthorBookChange={handleAuthorBookChange}
                handleClearFilters={handleClearFilters}
                handleApplyFilters={handleApplyFilters}
                handleSearch={handleSearch}
                foundedBooks={foundedBooks}
                foundedFilms={foundedFilms}
            />
        </>
    );
};

export default SearchPageContainer;
