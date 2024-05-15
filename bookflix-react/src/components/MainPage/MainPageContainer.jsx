import React from 'react';
import MainPage from './MainPage.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const MainPageContainer = () => {
    return (
        <>
            <PreferencesCheck />
            <MainPage />
        </>
    );
};

export default MainPageContainer;
