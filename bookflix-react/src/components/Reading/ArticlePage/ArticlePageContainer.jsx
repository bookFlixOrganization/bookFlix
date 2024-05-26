import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticlePage from './ArticlePage.jsx';
import { setLiked } from '../../../redux/Reading/articlePageReducer.js';

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

    return (
        <ArticlePage
            isSubscribed={isSubscribed}
            handleSubsClick={handleSubsClick}
            isLiked={isLiked}
            handleLikeClick={handleLikeClick}
        />
    );
};

export default ArticlePageContainer;
