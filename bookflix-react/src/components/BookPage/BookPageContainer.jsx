import React, { useState, useEffect } from 'react';
import BookPage from './BookPage.jsx';

const BookPageContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

    const [isFavourite, setIsFavourite] = useState(false);

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitFeedback = () => {
        // Здесь должна быть логика отправки отзыва на сервер
        // После успешной отправки:
        closeModal();
        setIsFeedbackSubmitted(true);
        setTimeout(() => {
            setIsFeedbackSubmitted(false);
        }, 5000);
    };

    // Function to handle the Esc key press
    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    // Add event listener for Esc key press
    useEffect(() => {
        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    return (
        <BookPage
            openModal={openModal}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            submitFeedback={submitFeedback}
            isFeedbackSubmitted={isFeedbackSubmitted}
            setIsFeedbackSubmitted={setIsFeedbackSubmitted}
            isFavourite={isFavourite}
            toggleFavourite={toggleFavourite}
        />
    );
};

export default BookPageContainer;
