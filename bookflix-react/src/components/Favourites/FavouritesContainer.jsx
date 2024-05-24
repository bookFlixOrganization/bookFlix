import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavouritesBooks, setFavouritesFilms } from '../../redux/favouritesReducer.js';
import Favourites from './Favourites.jsx';
import axios from 'axios';
import { server } from '../../serverconf.js';

const FavouritesContainer = () => {
    const dispatch = useDispatch();
    const favouritesFilms = useSelector((state) => state.favouritesReducer.favourites_films);
    const favouritesBooks = useSelector((state) => state.favouritesReducer.favourites_books);
    const isCheckingAuth = useSelector((state) => state.sessionReducer.is_checking_auth);

    useEffect(() => {
        let cancelTokenSource;
        if (!isCheckingAuth) {
            const fetchFavouritesBooks = async () => {
                cancelTokenSource = axios.CancelToken.source();
                try {
                    const response = await axios.get(`${server}/favourite/added_book`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    dispatch(setFavouritesBooks(response.data));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error('Error fetching popular books: ', error);
                    }
                }
            };

            const fetchFavouritesFilms = async () => {
                cancelTokenSource = axios.CancelToken.source();
                try {
                    const response = await axios.get(`${server}/favourite/added_movie`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    dispatch(setFavouritesFilms(response.data));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error('Error fetching popular films: ', error);
                    }
                }
            };

            fetchFavouritesBooks();
            fetchFavouritesFilms();
            return () => {
                if (cancelTokenSource) {
                    cancelTokenSource.cancel('Component unmounted');
                }
            };
        }
    }, [dispatch, isCheckingAuth]);
    return <Favourites favouritesBooks={favouritesBooks} favouritesFilms={favouritesFilms} />;
};

export default FavouritesContainer;
