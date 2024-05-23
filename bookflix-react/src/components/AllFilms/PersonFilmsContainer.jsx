import React, { useEffect } from 'react';
import PersonFilms from './PersonFilms.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonFilms } from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const PersonFilmsContainer = () => {
    const dispatch = useDispatch();
    const films = useSelector((state) => state.mainPageReducer.person_films);

    useEffect(() => {
        const fetchPopularFilms = async () => {
            try {
                // const responseFavourite = await axios.get(`${server}/favourite`);
                // dispatch(setFavourites(responseFavourite.data));
                // if (responseFavourite.data.liked_films.length > 0) {
                const responseRecommendation = await axios.get(`${server}/recommendation_movie`);
                // if (responseRecommendation.status === 200) {
                dispatch(setPersonFilms(responseRecommendation.data));
            } catch (error) {
                console.error('Error fetching popular films: ', error);
            }
        };

        if (!films || films.length === 0) {
            fetchPopularFilms();
        }
    }, [dispatch, films]);
    return <PersonFilms films={films} />;
};

export default PersonFilmsContainer;
