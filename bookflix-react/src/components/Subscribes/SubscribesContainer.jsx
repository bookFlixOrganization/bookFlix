import React from 'react';
import Subscribes from './Subscribes.jsx';
import SessionChecker from '../SessionChecker.jsx';

const SubscribesContainer = () => {
    return (
        <>
            <SessionChecker />
            <Subscribes />
        </>
    );
};

export default SubscribesContainer;
