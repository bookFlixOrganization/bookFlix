import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscribed, setAuthorArticles, setName } from '../../../redux/Reading/authorReducer.js';
import Author from './Author.jsx';
import axios from 'axios';
import { server } from '../../../serverconf.js';
import { useParams } from 'react-router-dom';

const AuthorContainer = () => {
    const dispatch = useDispatch();
    const { authorId } = useParams();

    const isSubscribed = useSelector((state) => state.authorReducer.isSubscribed);
    const authorArticles = useSelector((state) => state.authorReducer.authorArticles);
    const authorName = useSelector((state) => state.authorReducer.name);

    const [articlesToShow, setArticlesToShow] = useState(4); // Показываем по умолчанию 4 статьи

    const handleShowMore = () => {
        setArticlesToShow((prevState) => prevState + 4); // Прибавляем 4 статьи при нажатии на "Читать ещё"
    };
    const handleSubscribe = async () => {
        try {
            if (isSubscribed === 0) {
                await axios.post(`${server}/bookdiary/subs/${authorId}`);
                const response = await axios.get(`${server}/bookdiary/users/${authorId}`);
                dispatch(setSubscribed(response.data.author_info.is_sub));
            } else if (isSubscribed === 1) {
                await axios.delete(`${server}/bookdiary/subs/${authorId}`);
                const response = await axios.get(`${server}/bookdiary/users/${authorId}`);
                dispatch(setSubscribed(response.data.author_info.is_sub));
            }
        } catch (error) {
            console.error('Error liking article: ', error);
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        let isCancelled = false;
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`${server}/bookdiary/users/${authorId}`, {
                    cancelToken: source.token,
                });
                if (isCancelled) return;
                dispatch(setName(response.data.author_info.user_name));
                dispatch(setAuthorArticles(response.data.articles));
                dispatch(setSubscribed(response.data.author_info.is_sub));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching my articles: ', error);
                }
            }
        };
        fetchAuthor();

        return () => {
            isCancelled = true;
            source.cancel('Операция была отменена');
        };
    }, [dispatch]);

    return (
        <Author
            isSubscribed={isSubscribed}
            handleSubscribe={handleSubscribe}
            handleShowMore={handleShowMore}
            authorArticles={authorArticles}
            articlesToShow={articlesToShow}
            authorName={authorName}
        />
    );
};

export default AuthorContainer;
