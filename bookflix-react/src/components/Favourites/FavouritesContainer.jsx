import React from 'react';
import Favourites from './Favourites.jsx';
import SessionChecker from '../SessionChecker.jsx';

const FavouritesContainer = () => {
    return (
        <>
            <SessionChecker />
            <Favourites />
        </>
    );
};

export default FavouritesContainer;
