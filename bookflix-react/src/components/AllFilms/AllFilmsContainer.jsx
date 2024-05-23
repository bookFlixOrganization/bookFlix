import React, { useEffect } from 'react';
import AllFilms from './AllFilms.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPopularFilms } from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const AllFilmsContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPopularFilms = async () => {
            try {
                const response = await axios.get(`${server}/list/top_rated_movies`);
                dispatch(setPopularFilms(response.data));
            } catch (error) {
                console.error('Error fetching popular films: ', error);
            }
        };

        fetchPopularFilms();
    }, [dispatch]);
    const films = useSelector((state) => state.mainPageReducer.popular_films);
    return <AllFilms films={films} />;
};

export default AllFilmsContainer;
