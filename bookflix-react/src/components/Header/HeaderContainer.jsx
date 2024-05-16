import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const HeaderContainer = () => {
    const session = useSelector((state) => state.sessionReducer);
    return (
        <>
            <PreferencesCheck />
            <Header session={session} />
        </>
    );
};

export default HeaderContainer;
