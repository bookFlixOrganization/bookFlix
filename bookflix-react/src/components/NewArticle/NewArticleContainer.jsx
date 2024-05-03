import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticleName, setBookName, setText } from '../../redux/newArticleReducer.js';
import NewArticle from './NewArticle.jsx';

const NewArticleContainer = () => {
    const dispatch = useDispatch();

    const articleName = useSelector((state) => state.newArticleReducer.articleName);
    const bookName = useSelector((state) => state.newArticleReducer.bookName);
    const text = useSelector((state) => state.newArticleReducer.text);

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
        <NewArticle
            articleName={articleName}
            bookName={bookName}
            text={text}
            handleEditArticleName={handleEditArticleName}
            handleEditBookName={handleEditBookName}
            handleEditText={handleEditText}
        />
    );
};

export default NewArticleContainer;
