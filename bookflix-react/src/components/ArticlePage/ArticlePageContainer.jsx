import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticlePage from './ArticlePage.jsx';
import { setLiked } from '../../redux/articlePageReducer.js';
import PreferencesCheck from '../PreferencesCheck.jsx';

const ArticlePageContainer = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubsClick = () => {
        setIsSubscribed(!isSubscribed);
    };

    const dispatch = useDispatch();

    const isLiked = useSelector((state) => state.articlePageReducer.liked);

    const handleLikeClick = () => {
        dispatch(setLiked(!isLiked));
    };
    console.log(isLiked);

    return (
        <>
            <PreferencesCheck />
            <ArticlePage
                isSubscribed={isSubscribed}
                handleSubsClick={handleSubsClick}
                isLiked={isLiked}
                handleLikeClick={handleLikeClick}
            />
        </>
    );
};

export default ArticlePageContainer;
