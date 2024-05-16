import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticleName, setBookName, setText } from '../../redux/articleReducer.js';
import NewArticle from './NewArticle.jsx';
import SessionChecker from '../SessionChecker.jsx';

const NewArticleContainer = () => {
    const dispatch = useDispatch();

    const articleName = useSelector((state) => state.articleReducer.articleName);
    const bookName = useSelector((state) => state.articleReducer.bookName);
    const text = useSelector((state) => state.articleReducer.text);

    const handleEditArticleName = (event) => {
        dispatch(setArticleName(event.target.value));
    };

    const handleEditBookName = (event) => {
        dispatch(setBookName(event.target.value));
    };

    const handleEditText = (event) => {
        dispatch(setText(event.target.value));
    };

    return (
        <>
            <SessionChecker />
            <NewArticle
                articleName={articleName}
                bookName={bookName}
                text={text}
                handleEditArticleName={handleEditArticleName}
                handleEditBookName={handleEditBookName}
                handleEditText={handleEditText}
            />
        </>
    );
};

export default NewArticleContainer;
