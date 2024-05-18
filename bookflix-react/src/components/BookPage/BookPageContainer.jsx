import React, { useState, useEffect } from 'react';
import BookPage from './BookPage.jsx';
import SessionChecker from '../SessionChecker.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    setId,
    setName,
    setAuthor,
    setDescription,
    setDate,
    setGenre,
    setNumberOfPages,
    setLanguage,
    setRatingBookflix,
    setRatingGoogle,
    setCoverUrl,
    setBuyUrl,
} from '../../redux/bookPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';
import { useParams } from 'react-router-dom';

const BookPageContainer = () => {
    const { bookName } = useParams();
    const dispatch = useDispatch();
    const [isFavourite, setIsFavourite] = useState(false);

    const toggleFavourite = () => {
        setIsFavourite((prevState) => !prevState);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitFeedback = () => {
        closeModal();
        setIsFeedbackSubmitted(true);
        setTimeout(() => {
            setIsFeedbackSubmitted(false);
        }, 5000);
    };

    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const firstBookResponse = await axios.get(
                    `${server}/search/book?query=${bookName}`,
                );
                const firstBook = firstBookResponse.data.items[0];

                const secondBookResponse = await axios.get(`${server}/book/${firstBook.id}`);
                const secondBookData = secondBookResponse.data;
                console.log(secondBookData);
                dispatch(setName(secondBookData.volumeInfo.title));
                dispatch(setAuthor(secondBookData.volumeInfo.authors));
                dispatch(setDate(secondBookData.volumeInfo.publishedDate));
                dispatch(setDescription(secondBookData.volumeInfo.description));
                dispatch(setGenre(secondBookData.volumeInfo.categories));
                dispatch(setId(secondBookData.id));
                dispatch(setNumberOfPages(secondBookData.volumeInfo.pageCount));
                dispatch(setLanguage(secondBookData.volumeInfo.language));
                dispatch(setRatingBookflix(0));
                dispatch(setRatingGoogle(0));
                dispatch(setCoverUrl(secondBookData.volumeInfo.imageLinks.medium));
                dispatch(setBuyUrl(secondBookData.accessInfo.webReaderLink));
            } catch (error) {
                console.error('Ошибка при получении данных книги:', error);
            }
        };

        fetchBookData();
    }, [bookName]);
    const bookState = useSelector((state) => state.bookPageReducer);
    return (
        <>
            <SessionChecker />
            <BookPage
                isFavourite={isFavourite}
                toggleFavourite={toggleFavourite}
                isModalOpen={isModalOpen}
                isFeedbackSubmitted={isFeedbackSubmitted}
                openModal={openModal}
                closeModal={closeModal}
                submitFeedback={submitFeedback}
                bookState={bookState}
            />
        </>
    );
};

export default BookPageContainer;
