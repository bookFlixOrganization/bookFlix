import React, { useEffect } from 'react';
import AllBooks from './AllBooks.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPopularBooks } from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';
import SessionChecker from '../SessionChecker.jsx';

const AllBooksContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPopularBooks = async () => {
            try {
                const response = await axios.get(`${server}/list/most_popular_books`);
                const popularBooks = response.data.result;
                const bookPromises = popularBooks.map(async (book) => {
                    const bookResponse = await axios.get(
                        `${server}/search/book?query=${book.title}`,
                    );
                    return bookResponse.data.items[0];
                });
                const bookDataArray = await Promise.all(bookPromises);
                dispatch(setPopularBooks(bookDataArray));
            } catch (error) {
                console.error('Error fetching popular books: ', error);
            }
        };

        fetchPopularBooks();
    }, [dispatch]);

    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);
    return (
        <>
            <SessionChecker />
            <AllBooks popularBooks={popularBooks} />;
        </>
    );
};

export default AllBooksContainer;
