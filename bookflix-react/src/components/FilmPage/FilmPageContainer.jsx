import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Filmpage from './FilmPage.jsx';
import axios from 'axios';
import { server } from '../../serverconf.js';
import SessionChecker from '../SessionChecker.jsx';
import {
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

    const filmState = useSelector((state) => state.filmPageReducer);

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
            />
        </>
    );
};

export default FilmPageContainer;
