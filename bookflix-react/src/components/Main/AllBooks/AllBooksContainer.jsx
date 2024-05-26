import React, { useEffect } from 'react';
import AllBooks from './AllBooks.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPopularBooks } from '../../../redux/Main/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const AllBooksContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const source = axios.CancelToken.source();
        let isCancelled = false;

        const fetchPopularBooks = async () => {
            try {
                const response = await axios.get(`${server}/list/most_popular_books`, {
                    cancelToken: source.token,
                });
                if (isCancelled) return;

                const popularBooks = response.data.result;
                const bookPromises = popularBooks.map(async (book) => {
                    const bookResponse = await axios.get(
                        `${server}/search/book?query=${book.title}`,
                        { cancelToken: source.token },
                    );
                    if (isCancelled) return;
                    return bookResponse.data.items[0];
                });

                const bookDataArray = await Promise.all(bookPromises);
                if (isCancelled) return;

                dispatch(setPopularBooks(bookDataArray));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching popular books: ', error);
                }
            }
        };

        fetchPopularBooks();

        return () => {
            isCancelled = true;
            source.cancel('Операция была отменена');
        };
    }, [dispatch]);

    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);
    return <AllBooks popularBooks={popularBooks} />;
};

export default AllBooksContainer;
