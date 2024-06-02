import React, { useState } from 'react';
import SearchArticle from './SearchArticle.jsx';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const SearchArticleContainer = () => {
    const [userQuery, setUserQuery] = useState('');
    const [foundedArticles, setFoundedArticles] = useState(null);

    const [articlesToShow, setArticlesToShow] = useState(4); // Показываем по умолчанию 4 статьи

    const handleShowMore = () => {
        setArticlesToShow((prevState) => prevState + 4); // Прибавляем 4 статьи при нажатии на "Читать ещё"
    };

    const handleUserQueryChange = (event) => {
        setUserQuery(event.target.value);
    };

    const handleSearhArticle = async () => {
        const source = axios.CancelToken.source();
        let isCancelled = false;
        try {
            const response = await axios.get(`${server}/bookdiary/articles/search/${userQuery}`, {
                cancelToken: source.token,
            });
            console.log(response);
            if (isCancelled) return;
            setFoundedArticles(response.data);
        } catch (error) {
            if (!axios.isCancel(error)) {
                setFoundedArticles('not found');
                console.error('Error fetching my articles: ', error);
            }
        }
        return () => {
            isCancelled = true;
            source.cancel('Операция была отменена');
        };
    };

    return (
        <>
            <SearchArticle
                userQuery={userQuery}
                handleUserQueryChange={handleUserQueryChange}
                handleSearhArticle={handleSearhArticle}
                foundedArticles={foundedArticles}
                articlesToShow={articlesToShow}
                handleShowMore={handleShowMore}
            />
        </>
    );
};

export default SearchArticleContainer;
