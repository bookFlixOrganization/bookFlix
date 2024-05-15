import React, { useState } from 'react';
import Preferences from './Preferences.jsx';

const PreferencesContainer = () => {
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

    return <Preferences handleGenreClick={handleGenreClick} isGenreActive={isGenreActive} />;
};

export default PreferencesContainer;
