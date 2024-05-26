import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscribed } from '../../../redux/Reading/authorReducer.js';
import Author from './Author.jsx';

const AuthorContainer = () => {
    const dispatch = useDispatch();

    const isSubscribed = useSelector((state) => state.authorReducer.isSubscribed);

    const handleSubscribe = () => {
        dispatch(setSubscribed(!isSubscribed));
    };

    return <Author isSubscribed={isSubscribed} handleSubscribe={handleSubscribe} />;
};

export default AuthorContainer;
