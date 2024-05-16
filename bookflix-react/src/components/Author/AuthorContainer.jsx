import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscribed } from '../../redux/authorReducer.js';
import Author from './Author.jsx';
import SessionChecker from '../SessionChecker.jsx';

const AuthorContainer = () => {
    const dispatch = useDispatch();

    const isSubscribed = useSelector((state) => state.authorReducer.isSubscribed);

    const handleSubscribe = () => {
        dispatch(setSubscribed(!isSubscribed));
    };

    return (
        <>
            <SessionChecker />
            <Author isSubscribed={isSubscribed} handleSubscribe={handleSubscribe} />;
        </>
    );
};

export default AuthorContainer;
