import React, { useEffect } from 'react';
import ReadingDiary from './MyArticles.jsx';
import { useDispatch } from 'react-redux';

const MyArticlesContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {}, [dispatch]);

    return <ReadingDiary />;
};

export default MyArticlesContainer;
