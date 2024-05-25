import React, { useEffect } from 'react';
import AllFilms from './AllFilms.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPopularFilms } from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const AllFilmsContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchPopularFilms = async () => {
            try {
                const response = await axios.get(`${server}/list/top_rated_movies`, {
                    cancelToken: source.token,
                });
                dispatch(setPopularFilms(response.data));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching popular films: ', error);
                }
            }
        };

        fetchPopularFilms();

        return () => {
            source.cancel('Операция была отменена');
        };
    }, [dispatch]);
    const films = useSelector((state) => state.mainPageReducer.popular_films);
    return <AllFilms films={films} />;
};

export default AllFilmsContainer;
