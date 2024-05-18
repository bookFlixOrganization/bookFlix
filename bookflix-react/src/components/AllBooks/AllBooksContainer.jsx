import React, { useEffect } from 'react';
import AllBooks from './AllBooks.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPopularBooks } from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const AllBooksContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPopularBooks = async () => {
            try {
                const response = await axios.get(`${server}/list/most_popular_books`);
                dispatch(setPopularBooks(response.data));
            } catch (error) {
                console.error('Error fetching popular books: ', error);
            }
        };

        fetchPopularBooks();
    }, [dispatch]);

    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);
    return <AllBooks popularBooks={popularBooks} />;
};

export default AllBooksContainer;
