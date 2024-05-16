import React, { useState } from 'react';
import Preferences from './Preferences.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPreferences } from '../../redux/sessionReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const PreferencesContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [bookGenres, setBookGenres] = useState([]);
    const [filmGenres, setFilmGenres] = useState([]);

    const handleGenreClick = (genre, type) => {
        if (type === 'book') {
            setBookGenres((prevGenres) => {
                if (prevGenres.includes(genre)) {
                    return prevGenres.filter((g) => g !== genre);
                } else {
                    return [...prevGenres, genre];
                }
            });
        } else if (type === 'film') {
            setFilmGenres((prevGenres) => {
                if (prevGenres.includes(genre)) {
                    return prevGenres.filter((g) => g !== genre);
                } else {
                    return [...prevGenres, genre];
                }
            });
        }
    };

    const isGenreActive = (genre, type) => {
        return type === 'book' ? bookGenres.includes(genre) : filmGenres.includes(genre);
    };

    const sendPreferences = async () => {
        if (bookGenres.length == 0 || filmGenres.length == 0) {
            alert('Нужно заполнить предпочтения книг и фильмов');
            return;
        }
        try {
            const response = await axios.post(`${server}/preferences_after_register`, {
                book_genre: bookGenres,
                film_genre: filmGenres,
            });
            if (response.status === 200) {
                dispatch(setPreferences(true));
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    alert('Заполните хотя бы один жанр для фильмов и книг');
                }
            } else {
                alert('Произошла ошибка при отправке данных');
            }
        }
    };

    return (
        <Preferences
            handleGenreClick={handleGenreClick}
            isGenreActive={isGenreActive}
            sendPreferences={sendPreferences}
        />
    );
};

export default PreferencesContainer;
