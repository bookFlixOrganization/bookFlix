import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './MainPage.jsx';
import SessionChecker from '../SessionChecker.jsx';
import { setPopularBooks } from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const MainPageContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPopularBooks = async () => {
            try {
                const response = await axios.get(`${server}/list/most_popular_books`);
                dispatch(setPopularBooks(response.data));
            } catch (error) {
                console.error('Error fetching popular books: ', error);
            }
        };

        fetchPopularBooks();
    }, [dispatch]); // Зависимость от dispatch, чтобы избежать лишних запросов
    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);
    return (
        <>
            <SessionChecker />
            <MainPage popularBooks={popularBooks} />
        </>
    );
};

export default MainPageContainer;
