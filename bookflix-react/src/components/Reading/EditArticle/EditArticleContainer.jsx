import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticleName, setBookName, setText } from '../../../redux/Reading/editArticleReducer.js';
import EditArticle from './EditArticle.jsx';

const EditArticleContainer = () => {
    const dispatch = useDispatch();

    const articleName = useSelector((state) => state.editArticleReducer.articleName);
    const bookName = useSelector((state) => state.editArticleReducer.bookName);
    const text = useSelector((state) => state.editArticleReducer.text);

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
        <EditArticle
            articleName={articleName}
            bookName={bookName}
            text={text}
            handleEditArticleName={handleEditArticleName}
            handleEditBookName={handleEditBookName}
            handleEditText={handleEditText}
        />
    );
};

export default EditArticleContainer;
