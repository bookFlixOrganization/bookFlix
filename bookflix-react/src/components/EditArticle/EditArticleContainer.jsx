import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticleName, setBookName, setText } from '../../redux/articleReducer.js';
import EditArticle from './EditArticle.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const EditArticleContainer = () => {
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
            <PreferencesCheck />
            <EditArticle
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

export default EditArticleContainer;
