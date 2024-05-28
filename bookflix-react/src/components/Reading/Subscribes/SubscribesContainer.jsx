import React, { useEffect, useState } from 'react';
import Subscribes from './Subscribes.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setMySubs } from '../../../redux/Reading/subscribesReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';

const SubscribesContainer = () => {
    const dispatch = useDispatch();
    const mySubscribes = useSelector((state) => state.subscribesReducer.mySubs);

    const [authorsToShow, setAuthorsToShow] = useState(4); // Показываем по умолчанию 4 автора

    const handleShowMore = () => {
        setAuthorsToShow((prevState) => prevState + 4); // Прибавляем 4 статьи при нажатии на "Показать еще ещё"
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        let isCancelled = false;
        const fetchMySubs = async () => {
            try {
                const response = await axios.get(`${server}/bookdiary/subs/my`, {
                    cancelToken: source.token,
                });
                if (isCancelled) return;
                dispatch(setMySubs(response.data));
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching my subs: ', error);
                }
            }
        };
        fetchMySubs();

        return () => {
            isCancelled = true;
            source.cancel('Операция была отменена');
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(setMySubs(null));
    }, []);

    return (
        <Subscribes
            mySubs={mySubscribes}
            authorsToShow={authorsToShow}
            handleShowMore={handleShowMore}
        />
    );
};

export default SubscribesContainer;
