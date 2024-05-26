import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './MainPage.jsx';
import {
    setPopularBooks,
    setPopularFilms,
    setPersonBooks,
    setPersonFilms,
} from '../../../redux/Main/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const popularFilms = useSelector((state) => state.mainPageReducer.popular_films);
    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);
    const personFilms = useSelector((state) => state.mainPageReducer.person_films);
    const personBooks = useSelector((state) => state.mainPageReducer.person_books);
    const isAuth = useSelector((state) => state.sessionReducer.is_auth);
    const isCheckingAuth = useSelector((state) => state.sessionReducer.is_checking_auth);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        const fetchData = async () => {
            try {
                const popularBooksResponse = await axios.get(`${server}/list/most_popular_books`, {
                    cancelToken: cancelTokenSource.token,
                });
                const popularBooksData = popularBooksResponse.data.result;
                const bookPromises = popularBooksData.map(async (book) => {
                    const bookResponse = await axios.get(
                        `${server}/search/book?query=${book.title}`,
                        { cancelToken: cancelTokenSource.token },
                    );
                    return bookResponse.data.items[0];
                });
                const bookDataArray = await Promise.all(bookPromises);
                dispatch(setPopularBooks(bookDataArray));

                if (!popularFilms) {
                    const popularFilmsResponse = await axios.get(
                        `${server}/list/top_rated_movies`,
                        {
                            cancelToken: cancelTokenSource.token,
                        },
                    );
                    dispatch(setPopularFilms(popularFilmsResponse.data));
                }

                if (isAuth) {
                    const personBooksResponse = await axios.get(`${server}/recommendation_book`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    dispatch(setPersonBooks(personBooksResponse.data));

                    const personFilmsResponse = await axios.get(`${server}/recommendation_movie`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    dispatch(setPersonFilms(personFilmsResponse.data));
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching data: ', error);
                }
            }
        };

        if (!isCheckingAuth) {
            fetchData();
        }

        return () => {
            cancelTokenSource.cancel('Component unmounted');
        };
    }, [dispatch, isAuth, isCheckingAuth, popularFilms]);

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
