import React, { useEffect } from 'react';
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
    setIsSub,
} from '../../../redux/Reading/articlePageReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const ArticlePageContainer = () => {
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const isLiked = useSelector((state) => state.articlePageReducer.liked);
    const isSub = useSelector((state) => state.articlePageReducer.isSub);
    const articleAuthorId = useSelector((state) => state.articlePageReducer.articleAuthorId);
    const myId = useSelector((state) => state.sessionReducer.id);
    const handleSubsClick = async () => {
        try {
            if (isSub === 0) {
                await axios.post(`${server}/bookdiary/subs/${articleAuthorId}`);
                const response = await axios.get(`${server}/bookdiary/articles/${articleId}`);
                dispatch(setIsSub(response.data.is_sub));
            } else if (isLiked === 1) {
                await axios.delete(`${server}/bookdiary/subs/${articleAuthorId}`);
                const response = await axios.get(`${server}/bookdiary/articles/${articleId}`);
                dispatch(setIsSub(response.data.is_sub));
            }
        } catch (error) {
            console.error('Error liking article: ', error);
        }
    };

    const handleLikeClick = async () => {
        try {
            if (isLiked === 0) {
                await axios.post(`${server}/bookdiary/likes/${articleId}`);
                const response = await axios.get(`${server}/bookdiary/articles/${articleId}`);
                dispatch(setCountLikes(response.data.likes));
                dispatch(setLiked(response.data.is_liked));
            } else if (isLiked === 1) {
                await axios.delete(`${server}/bookdiary/likes/${articleId}`);
                const response = await axios.get(`${server}/bookdiary/articles/${articleId}`);
                dispatch(setCountLikes(response.data.likes));
                dispatch(setLiked(response.data.is_liked));
            }
        } catch (error) {
            console.error('Error liking article: ', error);
        }
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
                dispatch(setIsSub(response.data.is_sub));
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
    }, [articleId, dispatch]);

    const articleState = useSelector((state) => state.articlePageReducer);
    return (
        <ArticlePage
            handleSubsClick={handleSubsClick}
            isLiked={isLiked}
            handleLikeClick={handleLikeClick}
            articleState={articleState}
            myId={myId}
        />
    );
};

export default ArticlePageContainer;
