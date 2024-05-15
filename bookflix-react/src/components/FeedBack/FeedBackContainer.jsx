import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMark, setText } from '../../redux/feedbackReducer.js';

import FeedBack from './FeedBack.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const FeedBackContainer = (props) => {
    const dispatch = useDispatch();

    const mark = useSelector((state) => state.feedbackReducer.mark);
    const text = useSelector((state) => state.feedbackReducer.text);

    const handleMarkClick = (mark) => {
        dispatch(setMark(mark));
    };

    const handleTextChange = (event) => {
        dispatch(setText(event.target.value));
    };

    return (
        <>
            <PreferencesCheck />
            <FeedBack
                mark={mark}
                text={text}
                handleTextChange={handleTextChange}
                handleMarkClick={handleMarkClick}
                isModalOpen={props.isModalOpen}
                isFeedbackSubmitted={props.isFeedbackSubmitted}
                openModal={props.openModal}
                closeModal={props.closeModal}
                submitFeedback={props.submitFeedback}
            />
        </>
    );
};

export default FeedBackContainer;
