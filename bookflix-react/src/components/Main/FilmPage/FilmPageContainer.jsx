import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Filmpage from './FilmPage.jsx';
import axios from 'axios';
import { server } from '../../../serverconf.js';
import {
    setId,
    setName,
    setOriginalName,
    setCoverUrl,
    setDescription,
    setTracks,
    setDate,
    setCountries,
    setGenre,
    setDirector,
    setBudget,
    setRatingImdb,
    setVideoUrl,
    setRuntimes,
    setAge,
    // setActors,
    clearContent,
    setLiked,
    setDisliked,
    setActors,
} from '../../../redux/Main/filmPageReducer.js';
const FilmPageContainer = () => {
    const { id, imdb } = useParams();
    const dispatch = useDispatch();
    const [isFavourite, setIsFavourite] = useState(false);
    // const [imdbActors, setImdbActors] = useState([]);
    const isCheckingAuth = useSelector((state) => state.sessionReducer.is_checking_auth);
    const toggleFavourite = () => {
        setIsFavourite((prevState) => !prevState);
    };
    const source = axios.CancelToken.source();
    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                let imdbId = id;
                if (imdb === 'tmdb') {
                    // Если imdb не передан, сначала получаем imdbId и затем запрос к filmResponse
                    const tmdbToImdbResponse = await axios.get(
                        `${server}/film/tmdb_to_imdb?movie_id=${id}`,
                        { cancelToken: source.token },
                    );
                    imdbId = tmdbToImdbResponse.data;
                }
                const filmResponse = await axios.get(`${server}/film/${imdbId}`);
                if (filmResponse && filmResponse.data) {
                    const favourites = await axios.get(`${server}/favourite`);
                    // Проверка, есть ли книга в избранных
                    const isLiked = favourites.data['liked_films'].some(
                        (film) => film[1] === imdbId,
                        { cancelToken: source.token },
                    );
                    dispatch(setLiked(isLiked));

                    // Проверка, есть ли книга в нежелательных
                    const isDisliked = favourites.data['disliked_films'].some(
                        (film) => film[1] === imdbId,
                    );
                    dispatch(setDisliked(isDisliked));
                    dispatch(setId(imdbId));
                    dispatch(setName(filmResponse.data.result.title));
                    dispatch(setOriginalName(filmResponse.data.result['localized title']));
                    dispatch(setCoverUrl(filmResponse.data.result['full-size cover url']));
                    dispatch(setDescription(filmResponse.data.result['plot outline']));
                    dispatch(setTracks(filmResponse.data.result.languages));
                    dispatch(setDate(filmResponse.data.result['original air date']));
                    dispatch(setCountries(filmResponse.data.result.countries));
                    dispatch(setGenre(filmResponse.data.result.genres));
                    dispatch(setDirector(filmResponse.data.result.director[0].name));
                    dispatch(setBudget(filmResponse.data.result['box office'].Budget));
                    dispatch(setActors(filmResponse.data.result.cast.slice(0, 20)));
                    const russianAgeCertificate = filmResponse.data.result.certificates.find(
                        (cert) => cert.startsWith('Russia:'),
                    );
                    if (russianAgeCertificate) {
                        const rating = russianAgeCertificate.split(':')[1];
                        dispatch(setAge(rating));
                    }
                    dispatch(setRatingImdb(filmResponse.data.result.rating));
                    dispatch(setVideoUrl(filmResponse.data.result.videos[0]));
                    dispatch(setRuntimes(filmResponse.data.result.runtimes[0]));
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Ошибка при получении данных фильма:', error);
                }
            }
        };
        if (!isCheckingAuth) {
            fetchFilmData();
        }
        return () => {
            source.cancel('Операция была отменена');
        };
    }, [imdb, isCheckingAuth]);

    useEffect(() => {
        dispatch(clearContent());
    }, []);

    const filmState = useSelector((state) => state.filmPageReducer);
    const isLiked = useSelector((state) => state.bookPageReducer.isLiked);
    const isDisliked = useSelector((state) => state.bookPageReducer.isDisliked);
    const handleLikeClick = async () => {
        try {
            if (isDisliked) {
                const responseRmDislike = await axios.post(
                    `${server}/film/${filmState.id}/delete_disliked_films?disliked_movie_title=${filmState.name}&disliked_movie_id=${filmState.id}`,
                );
                if (responseRmDislike.status === 200) {
                    dispatch(setDisliked(false));
                    const responseAddLike = await axios.post(
                        `${server}/film/${filmState.id}/add_liked_films?liked_movie_title=${filmState.name}&liked_movie_id=${filmState.id}`,
                    );
                    if (responseAddLike.status === 200) {
                        dispatch(setLiked(true));
                    }
                }
            } else if (isLiked) {
                const responseRmLike = await axios.post(
                    `${server}/film/${filmState.id}/delete_liked_films?liked_movie_title=${filmState.name}&liked_movie_id=${filmState.id}`,
                );
                if (responseRmLike.status === 200) {
                    dispatch(setLiked(false));
                }
            } else if (!isLiked) {
                const responseAddLike = await axios.post(
                    `${server}/film/${filmState.id}/add_liked_films?liked_movie_title=${filmState.name}&liked_movie_id=${filmState.id}`,
                );
                if (responseAddLike.status === 200) {
                    dispatch(setLiked(true));
                }
            }
        } catch (error) {
            console.error('Ошибка при добавлении книги в список лайков:', error);
        }
    };

    const handleDislikeClick = async () => {
        try {
            if (isLiked) {
                const responseRmLike = await axios.post(
                    `${server}/film/${filmState.id}/delete_liked_films?liked_movie_title=${filmState.name}&liked_movie_id=${filmState.id}`,
                );
                if (responseRmLike.status === 200) {
                    dispatch(setLiked(false));
                    const responseAddDislike = await axios.post(
                        `${server}/film/${filmState.id}/add_disliked_films?disliked_movie_title=${filmState.name}&disliked_movie_id=${filmState.id}`,
                    );
                    if (responseAddDislike.status === 200) {
                        dispatch(setDisliked(true));
                    }
                }
            } else if (isDisliked) {
                const responseRmDislike = await axios.post(
                    `${server}/film/${filmState.id}/delete_disliked_films?disliked_movie_title=${filmState.name}&disliked_movie_id=${filmState.id}`,
                );
                if (responseRmDislike.status === 200) {
                    dispatch(setDisliked(false));
                }
            } else if (!isDisliked) {
                const responseAddDislike = await axios.post(
                    `${server}/film/${filmState.id}/add_disliked_films?disliked_movie_title=${filmState.name}&disliked_movie_id=${filmState.id}`,
                );
                if (responseAddDislike.status === 200) {
                    dispatch(setDisliked(true));
                }
            }
        } catch (error) {
            console.error('Ошибка при добавлении книги в список дизлайков:', error);
        }
    };

    return (
        <Filmpage
            isFavourite={isFavourite}
            toggleFavourite={toggleFavourite}
            filmState={filmState}
            handleLikeClick={handleLikeClick}
            handleDislikeClick={handleDislikeClick}
            isLiked={isLiked}
            isDisliked={isDisliked}
        />
    );
};

export default FilmPageContainer;
