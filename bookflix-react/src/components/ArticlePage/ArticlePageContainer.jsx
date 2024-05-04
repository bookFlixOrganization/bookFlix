import React, { useState } from 'react';
import ArticlePage from './ArticlePage.jsx';

const ArticlePageContainer = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubsClick = () => {
        setIsSubscribed(!isSubscribed);
    };

    return <ArticlePage isSubscribed={isSubscribed} handleSubsClick={handleSubsClick} />;
};

export default ArticlePageContainer;
