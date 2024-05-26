import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setBookName,
    setBookId,
    setText,
    setArticleName,
    setHandleBookName,
    clearNewArticle,
} from '../../../redux/Reading/newArticleReducer.js';
import NewArticle from './NewArticle.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const NewArticleContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bookId } = useParams();
    useEffect(() => {
        dispatch(setBookId(bookId));
    }, []);

    const articleName = useSelector((state) => state.newArticleReducer.articleName);
    const bookName = useSelector((state) => state.newArticleReducer.bookName);
    const text = useSelector((state) => state.newArticleReducer.text);
    const handleBookName = useSelector((state) => state.newArticleReducer.handleBookName);

    const handleEditArticleName = (event) => {
        dispatch(setArticleName(event.target.value));
    };

    const handleEditBookName = (event) => {
        dispatch(setHandleBookName(event.target.value));
    };

    const handleEditText = (event) => {
        dispatch(setText(event.target.value));
    };

    useEffect(() => {
        if (bookId !== 'new') {
            const source = axios.CancelToken.source();
            let isCancelled = false;
            const fetchBookName = async () => {
                try {
                    const response = await axios.get(`${server}/book/${bookId}`, {
                        cancelToken: source.token,
                    });
                    if (isCancelled) return;

                    const responseBookName = response.data.volumeInfo.title;
                    dispatch(setBookName(responseBookName));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error('Error fetching popular books: ', error);
                    }
                }
            };
            fetchBookName();

            return () => {
                isCancelled = true;
                source.cancel('Операция была отменена');
            };
        }
    }, [dispatch, bookId]);

    const submitArticleWithId = async (event) => {
        event.preventDefault();
        try {
            const response = axios.post(
                `${server}/bookdiary/articles/new/${bookId}?article_name=${articleName}&text=${text}`,
            );
            if (response) {
                alert('Статья успешно отправлена');
                navigate(`/book-page/${bookId}`);
            }
        } catch (error) {
            console.log('Ошибка отправки статьи', error);
        }
        dispatch(clearNewArticle());
    };
    const submitArticle = async (event) => {
        event.preventDefault();
        try {
            const response = axios.post(
                `${server}/bookdiary/articles/new?book_name=${handleBookName}&article_name=${articleName}&text=${text}`,
            );
            if (response) {
                alert('Статья успешно отправлена');
                navigate(`/account`);
            }
        } catch (error) {
            console.log('Ошибка отправки статьи', error);
        }
        dispatch(clearNewArticle());
    };

    return (
        <NewArticle
            articleName={articleName}
            bookName={bookName}
            handleBookName={handleBookName}
            text={text}
            bookId={bookId}
            handleEditArticleName={handleEditArticleName}
            handleEditBookName={handleEditBookName}
            handleEditText={handleEditText}
            submitArticleWithId={submitArticleWithId}
            submitArticle={submitArticle}
        />
    );
};

export default NewArticleContainer;
