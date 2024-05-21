import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './MainPage.jsx';
import SessionChecker from '../SessionChecker.jsx';
import {
    setPopularBooks,
    setPopularFilms,
    // setPersonBooks,
    // setPersonFilms,
} from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const popularFilms = useSelector((state) => state.mainPageReducer.popular_films);
    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);
    const personFilms = useSelector((state) => state.mainPageReducer.person_films);
    const personBooks = useSelector((state) => state.mainPageReducer.person_books);
    useEffect(() => {
        const fetchPopularBooks = async () => {
            try {
                const response = await axios.get(`${server}/list/most_popular_books`);
                const popularBooks = response.data.result;
                const bookPromises = popularBooks.map(async (book) => {
                    const bookResponse = await axios.get(
                        `${server}/search/book?query=${book.title}`,
                    );
                    return bookResponse.data.items[0];
                });
                const bookDataArray = await Promise.all(bookPromises);
                dispatch(setPopularBooks(bookDataArray));
            } catch (error) {
                console.error('Error fetching popular books: ', error);
            }
        };
        const fetchPopularFilms = async () => {
            try {
                const response = await axios.get(`${server}/list/top_rated_movies`);
                dispatch(setPopularFilms(response.data));
            } catch (error) {
                console.error('Error fetching popular films: ', error);
            }
        };
        // const fetchPerson = async () => {
        //     try {
        //         const response = await axios.get(`${server}/list/top_rated_movies`);
        //         dispatch(setPopularFilms(response.data));
        //     } catch (error) {
        //         console.error('Error fetching popular films: ', error);
        //     }
        // };

        fetchPopularBooks();
        if (!popularFilms) {
            fetchPopularFilms();
        }
    }, [dispatch]);
    return (
        <>
            <SessionChecker />
            <MainPage
                popularBooks={popularBooks}
                popularFilms={popularFilms}
                personBooks={personBooks}
                personFilms={personFilms}
            />
        </>
    );
};

export default MainPageContainer;
