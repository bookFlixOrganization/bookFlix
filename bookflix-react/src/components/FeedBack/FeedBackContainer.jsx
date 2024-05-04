import React from 'react';
import FeedBack from './FeedBack.jsx';

const FeedBackContainer = (props) => {
    return (
        <FeedBack
            isModalOpen={props.isModalOpen}
            isFeedbackSubmitted={props.isFeedbackSubmitted}
            openModal={props.openModal}
            closeModal={props.closeModal}
            submitFeedback={props.submitFeedback}
        />
    );
};

export default FeedBackContainer;
