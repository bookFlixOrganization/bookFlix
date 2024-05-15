import React from 'react';
import Articles from './Articles.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const ArticlesContainer = () => {
    return (
        <>
            <PreferencesCheck />
            <Articles />
        </>
    );
};

export default ArticlesContainer;
