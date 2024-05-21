import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './MainPage.jsx';
import SessionChecker from '../SessionChecker.jsx';
import {
    setPopularBooks,
    setPopularFilms,
    setFavourites,
    setPersonBooks,
    setPersonFilms,
} from '../../redux/mainPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const popularFilms = useSelector((state) => state.mainPageReducer.popular_films);
    const popularBooks = useSelector((state) => state.mainPageReducer.popular_books);
    const personFilms = useSelector((state) => state.mainPageReducer.person_films);
    const personBooks = useSelector((state) => state.mainPageReducer.person_books);
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
        const fetchPopularFilms = async () => {
            try {
                const response = await axios.get(`${server}/list/top_rated_movies`);
                dispatch(setPopularFilms(response.data));
            } catch (error) {
                console.error('Error fetching popular films: ', error);
            }
        };
        const fetchPerson = async () => {
            try {
                const responseFavourite = await axios.get(`${server}/favourite`);
                dispatch(setFavourites(responseFavourite.data));

                const requests = [];

                if (responseFavourite.data.liked_books.length > 0) {
                    requests.push(axios.get(`${server}/favourite/added_book`));
                }

                if (responseFavourite.data.liked_films.length > 0) {
                    requests.push(axios.get(`${server}/recommendation_movie`));
                }

                const [addedBooksResponse, recommFilmsResponse] = await Promise.all(requests);

                if (addedBooksResponse && addedBooksResponse.data) {
                    dispatch(setPersonBooks(addedBooksResponse.data));
                }

                if (recommFilmsResponse && recommFilmsResponse.data) {
                    dispatch(setPersonFilms(recommFilmsResponse.data));
                }
            } catch (error) {
                console.log('Error fetching person', error);
            }
        };

        fetchPopularBooks();
        if (!popularFilms) {
            fetchPopularFilms();
        }
        fetchPerson();
    }, [dispatch]);
    return (
        <>
            <SessionChecker />
            <MainPage
                popularBooks={popularBooks}
                popularFilms={popularFilms}
                personBooks={personBooks}
                personFilms={personFilms}
            />
        </>
    );
};

export default MainPageContainer;
