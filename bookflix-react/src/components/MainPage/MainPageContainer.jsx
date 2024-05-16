import React from 'react';
import MainPage from './MainPage.jsx';
import SessionChecker from '../SessionChecker.jsx';

const MainPageContainer = () => {
    return (
        <>
            <SessionChecker />
            <MainPage />
        </>
    );
};

export default MainPageContainer;
