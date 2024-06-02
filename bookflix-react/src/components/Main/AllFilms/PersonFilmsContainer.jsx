import React, { useEffect } from 'react';
import PersonFilms from './PersonFilms.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonFilms } from '../../../redux/Main/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const PersonFilmsContainer = () => {
    const dispatch = useDispatch();
    const films = useSelector((state) => state.mainPageReducer.person_films);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchPopularFilms = async () => {
            try {
                // Комментарии выше были для примера, но в данном случае они не нужны
                const responseRecommendation = await axios.get(`${server}/recommendation_movie`, {
                    cancelToken: source.token,
                });
                dispatch(setPersonFilms(responseRecommendation.data));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching popular films: ', error);
                }
            }
        };

        if (!films || films.length === 0) {
            fetchPopularFilms();
        }

        return () => {
            source.cancel('Операция была отменена');
        };
    }, [dispatch, films]);
    return <PersonFilms films={films} />;
};

export default PersonFilmsContainer;
