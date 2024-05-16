import React from 'react';
import History from './History.jsx';
import SessionChecker from '../SessionChecker.jsx';

const HistoryContainer = () => {
    return (
        <>
            <SessionChecker />
            <History />;
        </>
    );
};

export default HistoryContainer;
