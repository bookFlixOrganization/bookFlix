import React, { useEffect } from 'react';
import PersonBooks from './PersonBooks.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonBooks } from '../../../redux/Main/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const PersonBooksContainer = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.mainPageReducer.person_books);
    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchPopularBooks = async () => {
            try {
                const responseRecommendation = await axios.get(`${server}/recommendation_book`, {
                    cancelToken: source.token,
                });
                dispatch(setPersonBooks(responseRecommendation.data));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching popular books: ', error);
                }
            }
        };

        if (!books || books.length === 0) {
            fetchPopularBooks();
        }

        // Функция очистки, которая вызывается при размонтировании компонента
        return () => {
            source.cancel('Операция была отменена');
        };
    }, [dispatch, books]);
    return <PersonBooks books={books} />;
};

export default PersonBooksContainer;
