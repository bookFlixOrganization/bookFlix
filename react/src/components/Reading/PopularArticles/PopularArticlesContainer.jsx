import React, { useEffect, useState } from 'react';
import PopularArticles from './PopularArticles.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setMyArticles } from '../../../redux/Reading/myArticlesReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const PopularArticlesContainer = () => {
    const dispatch = useDispatch();
    const myArticles = useSelector((state) => state.myArticlesReducer.myArticles);

    const [articlesToShow, setArticlesToShow] = useState(4); // Показываем по умолчанию 4 статьи

    const handleShowMore = () => {
        setArticlesToShow((prevState) => prevState + 4); // Прибавляем 4 статьи при нажатии на "Читать ещё"
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        let isCancelled = false;
        const fetchBookName = async () => {
            try {
                const response = await axios.get(`${server}/bookdiary`, {
                    cancelToken: source.token,
                });
                if (isCancelled) return;
                dispatch(setMyArticles(response.data));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching my articles: ', error);
                }
            }
        };
        fetchBookName();

        return () => {
            isCancelled = true;
            source.cancel('Операция была отменена');
        };
    }, [dispatch]);
    return (
        <PopularArticles
            myArticles={myArticles}
            articlesToShow={articlesToShow}
            handleShowMore={handleShowMore}
        />
    );
};

export default PopularArticlesContainer;
