import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Filmpage from './FilmPage.jsx';
import axios from 'axios';
import { server } from '../../serverconf.js';
import SessionChecker from '../SessionChecker.jsx';
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
    setRatingBookflix,
    setRatingImdb,
    setVideoUrl,
    setRuntimes,
    setAge,
    setActors,
    clearContent,
    setLiked,
    setDisliked,
} from '../../redux/filmPageReducer.js';
const FilmPageContainer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isFavourite, setIsFavourite] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
    const [imdbActors, setImdbActors] = useState([]);
    const toggleFavourite = () => {
        setIsFavourite((prevState) => !prevState);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitFeedback = () => {
        closeModal();
        setIsFeedbackSubmitted(true);
        setTimeout(() => {
            setIsFeedbackSubmitted(false);
        }, 5000);
    };

    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const tmdbToImdbResponse = await axios.get(
                    `${server}/film/tmdb_to_imdb?movie_id=${id}`,
                );
                const imdbId = tmdbToImdbResponse.data;
                const filmResponse = await axios.get(`${server}/film/${imdbId}`);
                const favourites = await axios.get(`${server}/favourite`);

                // Проверка, есть ли книга в избранных
                const isLiked = favourites.data['liked_films'].some((film) => film[1] === imdbId);
                dispatch(setLiked(isLiked));

                // Проверка, есть ли книга в нежелательных
                const isDisliked = favourites.data['disliked_films'].some(
                    (film) => film[1] === imdbId,
                );
                dispatch(setDisliked(isDisliked));
                dispatch(setId(imdbId));
                dispatch(setName(filmResponse.data.result['original title']));
                dispatch(setOriginalName(filmResponse.data.result['localized title']));
                dispatch(setCoverUrl(filmResponse.data.result['full-size cover url']));
                dispatch(setDescription(filmResponse.data.result['plot outline']));
                dispatch(setTracks(filmResponse.data.result.languages));
                dispatch(setDate(filmResponse.data.result['original air date']));
                dispatch(setCountries(filmResponse.data.result.countries));
                dispatch(setGenre(filmResponse.data.result.genres));
                dispatch(setDirector(filmResponse.data.result.director[0].name));
                dispatch(setBudget(filmResponse.data.result['box office'].Budget));
                setImdbActors(filmResponse.data.result.cast.slice(0, 3));
                const russianAgeCertificate = filmResponse.data.result.certificates.find((cert) =>
                    cert.startsWith('Russia:'),
                );
                if (russianAgeCertificate) {
                    const rating = russianAgeCertificate.split(':')[1];
                    dispatch(setAge(rating));
                }
                dispatch(setRatingBookflix(0));
                dispatch(setRatingImdb(filmResponse.data.result.rating));
                dispatch(setVideoUrl(filmResponse.data.result.videos[0]));
                dispatch(setRuntimes(filmResponse.data.result.runtimes[0]));
            } catch (error) {
                console.error('Ошибка при получении данных фильма:', error);
            }
        };
        fetchFilmData();

        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [id]);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const actorPromises = imdbActors.map((actor) =>
                    axios.get(`${server}/search/person?query=${encodeURIComponent(actor.name)}`),
                );
                const responses = await Promise.all(actorPromises);
                const actorsWithData = responses.map((response) => {
                    const firstResult = response.data.result[0];
                    return {
                        name: firstResult.name,
                        canonicalName: firstResult['canonical name'],
                        fullSizeHeadshot: firstResult['full-size headshot'] || firstResult.headshot,
                    };
                });
                dispatch(setActors(actorsWithData));
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        };

        if (imdbActors.length > 0) {
            fetchActors();
        }
    }, [imdbActors]);

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
        <>
            <SessionChecker />
            <Filmpage
                isFavourite={isFavourite}
                toggleFavourite={toggleFavourite}
                isModalOpen={isModalOpen}
                isFeedbackSubmitted={isFeedbackSubmitted}
                openModal={openModal}
                closeModal={closeModal}
                submitFeedback={submitFeedback}
                filmState={filmState}
                handleLikeClick={handleLikeClick}
                handleDislikeClick={handleDislikeClick}
                isLiked={isLiked}
                isDisliked={isDisliked}
            />
        </>
    );
};

export default FilmPageContainer;
