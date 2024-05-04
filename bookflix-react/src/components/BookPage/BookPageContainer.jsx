import React, { useState, useEffect } from 'react';
import BookPage from './BookPage.jsx';

const BookPageContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

    const [isFavourite, setIsFavourite] = useState(false);

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    };

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
