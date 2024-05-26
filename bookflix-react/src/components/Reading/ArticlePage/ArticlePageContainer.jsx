import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ArticlePage from './ArticlePage.jsx';
import {
    setArticleName,
    setArticleAuthor,
    setBookAuthor,
    setBookName,
    setDate,
    setLiked,
    setCountLikes,
    setArticleText,
    setAuthorId,
} from '../../../redux/Reading/articlePageReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const ArticlePageContainer = () => {
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const isLiked = useSelector((state) => state.articlePageReducer.liked);
    const myId = useSelector((state) => state.sessionReducer.id);

    const handleSubsClick = () => {
        setIsSubscribed(!isSubscribed);
    };

    const handleLikeClick = () => {
        dispatch(setLiked(!isLiked));
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        let isCancelled = false;
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${server}/bookdiary/articles/${articleId}`, {
                    cancelToken: source.token,
                });
                if (isCancelled) return;
                const responseData = response.data;
                dispatch(setArticleName(responseData.article_name));
                dispatch(setArticleAuthor(responseData.user_name));
                dispatch(setBookAuthor(responseData.book_authors[0]));
                dispatch(setBookName(responseData.book_name));
                dispatch(setDate(responseData.publication_date));
                dispatch(setLiked(responseData.is_liked));
                dispatch(setCountLikes(responseData.likes));
                dispatch(setArticleText(responseData.text));
                dispatch(setAuthorId(responseData.user_id));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching my articles: ', error);
                }
            }
        };
        fetchArticle();

        return () => {
            isCancelled = true;
            source.cancel('Операция была отменена');
        };
    }, [dispatch]);

    const articleState = useSelector((state) => state.articlePageReducer);
    return (
        <ArticlePage
            isSubscribed={isSubscribed}
            handleSubsClick={handleSubsClick}
            isLiked={isLiked}
            handleLikeClick={handleLikeClick}
            articleState={articleState}
            myId={myId}
        />
    );
};

export default ArticlePageContainer;
