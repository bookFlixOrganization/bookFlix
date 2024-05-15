import React from 'react';
import Favourites from './Favourites.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const FavouritesContainer = () => {
    return (
        <>
            <PreferencesCheck />
            <Favourites />
        </>
    );
};

export default FavouritesContainer;
