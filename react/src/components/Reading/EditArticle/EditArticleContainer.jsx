import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setArticleName,
    setBookName,
    setText,
    clearEditingArticle,
} from '../../../redux/Reading/editArticleReducer.js';
import EditArticle from './EditArticle.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../serverconf.js';
import { useNavigate } from 'react-router-dom';

const EditArticleContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { articleId } = useParams();

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = axios.put(
                `${server}/bookdiary/articles/my/${articleId}?book_name=${bookName}&article_name=${articleName}&text=${text}&id=${articleId}`,
            );
            if (response) {
                alert('Статья успешно отредактирована');
                navigate(`/reading-diary`);
            }
        } catch (error) {
            console.log('Ошибка отправки статьи', error);
        }
        dispatch(clearEditingArticle());
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        let isCancelled = false;
        const fetchArticleContent = async () => {
            try {
                const response = await axios.get(`${server}/bookdiary/articles/my/${articleId}`, {
                    cancelToken: source.token,
                });
                if (isCancelled) return;
                dispatch(setArticleName(response.data.article_name));
                dispatch(setBookName(response.data.book_name));
                dispatch(setText(response.data.text));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching my articles: ', error);
                }
            }
        };
        fetchArticleContent();

        return () => {
            isCancelled = true;
            source.cancel('Операция была отменена');
        };
    }, [dispatch, articleId]);

    return (
        <EditArticle
            articleName={articleName}
            bookName={bookName}
            text={text}
            handleEditArticleName={handleEditArticleName}
            handleEditBookName={handleEditBookName}
            handleEditText={handleEditText}
            handleSubmit={handleSubmit}
        />
    );
};

export default EditArticleContainer;
