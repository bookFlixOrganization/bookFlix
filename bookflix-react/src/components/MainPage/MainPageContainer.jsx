import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './MainPage.jsx';
import {
    setPopularBooks,
    setPopularFilms,
    setPersonBooks,
    setPersonFilms,
} from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const popularFilms = useSelector((state) => state.mainPageReducer.popular_films);
    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);
    const personFilms = useSelector((state) => state.mainPageReducer.person_films);
    const personBooks = useSelector((state) => state.mainPageReducer.person_books);
    const isAuth = useSelector((state) => state.sessionReducer.is_auth);
    const isCheckingAuth = useSelector((state) => state.sessionReducer.is_checking_auth);
    useEffect(() => {
        let cancelTokenSource;
        if (!isCheckingAuth) {
            const fetchPopularBooks = async () => {
                cancelTokenSource = axios.CancelToken.source();
                try {
                    const response = await axios.get(`${server}/list/most_popular_books`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    const popularBooks = response.data.result;
                    const bookPromises = popularBooks.map(async (book) => {
                        const bookResponse = await axios.get(
                            `${server}/search/book?query=${book.title}`,
                            { cancelToken: cancelTokenSource.token },
                        );
                        return bookResponse.data.items[0];
                    });
                    const bookDataArray = await Promise.all(bookPromises);
                    dispatch(setPopularBooks(bookDataArray));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error('Error fetching popular books: ', error);
                    }
                }
            };

            const fetchPopularFilms = async () => {
                cancelTokenSource = axios.CancelToken.source();
                try {
                    const response = await axios.get(`${server}/list/top_rated_movies`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    dispatch(setPopularFilms(response.data));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error('Error fetching popular films: ', error);
                    }
                }
            };

            const fetchPerson = async () => {
                if (isAuth) {
                    cancelTokenSource = axios.CancelToken.source();
                    try {
                        const responseBooks = await axios.get(`${server}/recommendation_book`, {
                            cancelToken: cancelTokenSource.token,
                        });
                        dispatch(setPersonBooks(responseBooks.data));

                        const responseFilms = await axios.get(`${server}/recommendation_movie`, {
                            cancelToken: cancelTokenSource.token,
                        });
                        dispatch(setPersonFilms(responseFilms.data));
                    } catch (error) {
                        if (!axios.isCancel(error)) {
                            console.error('Error fetching person', error);
                        }
                    }
                }
            };

            fetchPopularBooks();
            if (!popularFilms) {
                fetchPopularFilms();
            }
            fetchPerson();

            return () => {
                if (cancelTokenSource) {
                    cancelTokenSource.cancel('Component unmounted');
                }
            };
        }
    }, [dispatch, isAuth, isCheckingAuth]);

    return (
        <MainPage
            popularBooks={popularBooks}
            popularFilms={popularFilms}
            personBooks={personBooks}
            personFilms={personFilms}
        />
    );
};

export default MainPageContainer;
