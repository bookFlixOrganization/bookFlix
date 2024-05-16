import React from 'react';
import Articles from './Articles.jsx';
import SessionChecker from '../SessionChecker.jsx';

const ArticlesContainer = () => {
    return (
        <>
            <SessionChecker />
            <Articles />
        </>
    );
};

export default ArticlesContainer;
