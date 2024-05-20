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
    setShortContent,
    clearContent,
    setLiked,
    setDisliked,
} from '../../redux/bookPageReducer.js';
import axios from 'axios';
import { server } from '../../serverconf.js';
import { useParams } from 'react-router-dom';

const BookPageContainer = () => {
    const { bookName } = useParams();
    const dispatch = useDispatch();

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

    const handleShortClick = async () => {
        try {
            const shortContentResponse = await axios.get(
                `${server}/short_content/?query=${bookState.name}`,
            );
            const shortContentData = shortContentResponse.data.content;
            dispatch(setShortContent(shortContentData));
        } catch (error) {
            console.error('Ошибка при получении сокращенного контента:', error);
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

                // Получение списков избранных и нежелательных книг
                const favourites = await axios.get(`${server}/favourite`);
                console.log(favourites);

                // Проверка, есть ли книга в избранных
                console.log(secondBookData.id);
                const isLiked = favourites.data['liked_books'].some(
                    (book) => book[1] === secondBookData.id,
                );
                dispatch(setLiked(isLiked));

                // Проверка, есть ли книга в нежелательных
                const isDisliked = favourites.data['disliked_books'].some(
                    (book) => book[1] === secondBookData.id,
                );
                dispatch(setDisliked(isDisliked));

                // Установка остальных свойств книги
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

    useEffect(() => {
        dispatch(clearContent());
    }, []);

    const bookState = useSelector((state) => state.bookPageReducer);
    const shortContent = useSelector((state) => state.bookPageReducer.shortContent);

    const isLiked = useSelector((state) => state.bookPageReducer.isLiked);
    const isDisliked = useSelector((state) => state.bookPageReducer.isDisliked);
    const handleLikeClick = async () => {
        try {
            if (isDisliked) {
                const responseRmDislike = await axios.post(
                    `${server}/book/${bookState.id}/delete_disliked_books?disliked_book_title=${bookState.name}&disliked_book_id=${bookState.id}`,
                );
                if (responseRmDislike.status === 200) {
                    dispatch(setDisliked(false));
                }
            } else if (isLiked) {
                const responseRmLike = await axios.post(
                    `${server}/book/${bookState.id}/delete_liked_books?liked_book_title=${bookState.name}&liked_book_id=${bookState.id}`,
                );
                if (responseRmLike.status === 200) {
                    dispatch(setLiked(false));
                }
            } else if (!isLiked) {
                const responseAddLike = await axios.post(
                    `${server}/book/${bookState.id}/add_liked_books?liked_book_title=${bookState.name}&liked_book_id=${bookState.id}`,
                );
                if (responseAddLike.status === 200) {
                    dispatch(setLiked(true));
                }
            }
        } catch (error) {
            console.error('Ошибка при добавлении книги в список лайков:', error);
        }
    };

    const handleDislikeClick = async () => {
        try {
            if (isLiked) {
                const responseRmLike = await axios.post(
                    `${server}/book/${bookState.id}/delete_liked_books?liked_book_title=${bookState.name}&liked_book_id=${bookState.id}`,
                );
                if (responseRmLike.status === 200) {
                    dispatch(setLiked(false));
                }
            } else if (isDisliked) {
                const responseRmDislike = await axios.post(
                    `${server}/book/${bookState.id}/delete_disliked_books?disliked_book_title=${bookState.name}&disliked_book_id=${bookState.id}`,
                );
                if (responseRmDislike.status === 200) {
                    dispatch(setDisliked(false));
                }
            } else if (!isDisliked) {
                const responseAddDislike = await axios.post(
                    `${server}/book/${bookState.id}/add_disliked_books?disliked_book_title=${bookState.name}&disliked_book_id=${bookState.id}`,
                );
                if (responseAddDislike.status === 200) {
                    dispatch(setDisliked(true));
                }
            }
        } catch (error) {
            console.error('Ошибка при добавлении книги в список дизлайков:', error);
        }
    };

    return (
        <>
            <SessionChecker />
            <BookPage
                isModalOpen={isModalOpen}
                isFeedbackSubmitted={isFeedbackSubmitted}
                openModal={openModal}
                closeModal={closeModal}
                submitFeedback={submitFeedback}
                bookState={bookState}
                handleShortClick={handleShortClick}
                shortContent={shortContent}
                handleLikeClick={handleLikeClick}
                handleDislikeClick={handleDislikeClick}
                isLiked={isLiked}
                isDisliked={isDisliked}
            />
        </>
    );
};

export default BookPageContainer;
