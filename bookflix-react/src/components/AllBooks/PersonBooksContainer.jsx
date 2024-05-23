import React, { useEffect } from 'react';
import PersonBooks from './PersonBooks.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonBooks } from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const PersonBooksContainer = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.mainPageReducer.person_books);
    useEffect(() => {
        const fetchPopularBooks = async () => {
            try {
                // const responseFavourite = await axios.get(`${server}/favourite`);
                // dispatch(setFavourites(responseFavourite.data));
                // if (responseFavourite.data.liked_books.length > 0) {
                const responseRecommendation = await axios.get(`${server}/recommendation_book`);
                dispatch(setPersonBooks(responseRecommendation.data));
            } catch (error) {
                console.error('Error fetching popular films: ', error);
            }
        };

        if (!books || books.length === 0) {
            fetchPopularBooks();
        }
    }, [dispatch, books]);
    return <PersonBooks books={books} />;
};

export default PersonBooksContainer;
