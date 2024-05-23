import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import History from './History.jsx';
import { setHistoryBooks, setHistoryFilms } from '../../redux/historyReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const HistoryContainer = () => {
    const dispatch = useDispatch();
    const historyFilms = useSelector((state) => state.historyReducer.history_films);
    const historyBooks = useSelector((state) => state.historyReducer.history_books);
    const isCheckingAuth = useSelector((state) => state.sessionReducer.is_checking_auth);

    useEffect(() => {
        let cancelTokenSource;
        if (!isCheckingAuth) {
            const fetchHistoryBooks = async () => {
                cancelTokenSource = axios.CancelToken.source();
                try {
                    const response = await axios.get(`${server}/favourite/history_book`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    const historyBooksResult = response.data;
                    dispatch(setHistoryBooks(historyBooksResult));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error('Error fetching popular books: ', error);
                    }
                }
            };

            const fetchHistoryFilms = async () => {
                cancelTokenSource = axios.CancelToken.source();
                try {
                    const response = await axios.get(`${server}/favourite/history_movies`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    dispatch(setHistoryFilms(response.data));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error('Error fetching popular films: ', error);
                    }
                }
            };

            fetchHistoryBooks();
            fetchHistoryFilms();
            return () => {
                if (cancelTokenSource) {
                    cancelTokenSource.cancel('Component unmounted');
                }
            };
        }
    }, [dispatch, isCheckingAuth]);
    return <History historyBooks={historyBooks} historyFilms={historyFilms} />;
};

export default HistoryContainer;
