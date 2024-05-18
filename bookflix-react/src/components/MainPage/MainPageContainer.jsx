import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './MainPage.jsx';
import SessionChecker from '../SessionChecker.jsx';
import { setPopularBooks, setPopularFilms } from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const popularFilms = useSelector((state) => state.mainPageReducer.popular_films);
    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);

    useEffect(() => {
        const fetchPopularBooks = async () => {
            try {
                const response = await axios.get(`${server}/list/most_popular_books`);
                dispatch(setPopularBooks(response.data));
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

        fetchPopularBooks();
        if (!popularFilms) {
            fetchPopularFilms();
        }
    }, [dispatch]);
    return (
        <>
            <SessionChecker />
            <MainPage popularBooks={popularBooks} popularFilms={popularFilms} />
        </>
    );
};

export default MainPageContainer;
