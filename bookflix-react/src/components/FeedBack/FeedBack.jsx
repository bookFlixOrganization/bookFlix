import React from 'react';
import styles from './FeedBack.module.css';
import { ReactComponent as QuotesIcon } from './images/quotes.svg';
import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';
import image4 from './images/4.png';
import image5 from './images/5.png';
import image6 from './images/6.png';
import image7 from './images/7.png';
import image8 from './images/8.png';
import image9 from './images/9.png';
import image10 from './images/10.png';

const FeedBack = (props) => {
    return (
        <>
            {props.isModalOpen && (
                <div
                    className={`${styles.modal} ${props.isModalOpen ? styles.open : ''}`}
                    id="my-modal"
                >
                    <div className={styles.modal__box}>
                        <button
                            onClick={props.closeModal}
                            className={styles.button_1}
                            id="close-my-modal-btn"
                        >
                            X
                        </button>
                        <h2 className={styles.estim}>Оцени книгу</h2>
                        <div className={styles.subtitle}>Пиковая Дама</div>
                        <div className={styles.statistics}>
                            <QuotesIcon />
                        </div>
                        <div className={styles.numbers}>
                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image1} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(1)}
                                >
                                    1
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image2} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(2)}
                                >
                                    2
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image3} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(2)}
                                >
                                    3
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image4} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(4)}
                                >
                                    4
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image5} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(5)}
                                >
                                    5
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image6} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(6)}
                                >
                                    6
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image7} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(7)}
                                >
                                    7
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image8} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(8)}
                                >
                                    8
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image9} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(9)}
                                >
                                    9
                                </button>
                            </div>

                            <div className={styles.rathing_mark}>
                                <div className={styles.emoji}>
                                    <img src={image10} alt="" />
                                </div>
                                <button
                                    className={styles.number}
                                    onClick={() => props.handleMarkClick(10)}
                                >
                                    10
                                </button>
                            </div>
                        </div>
                        <div className={styles.modal_feedback_text}>
                            <label className={styles.label} htmlFor="feedback_text">
                                Отзыв
                            </label>
                            <textarea
                                maxLength="255"
                                rows="4"
                                placeholder="Текст (до 255 символов)"
                                id="feedback_text"
                                value={props.text || ''}
                                onChange={props.handleTextChange}
                            ></textarea>
                        </div>

                        <button
                            id="close-my-modal-btn-1"
                            className={styles.estimate}
                            onClick={props.submitFeedback}
                        >
                            Поставить оценку
                        </button>
                    </div>
                </div>
            )}

            {props.isFeedbackSubmitted && (
                <div
                    className={`${styles.open_block_2} ${props.isFeedbackSubmitted ? styles.active : ''}`}
                >
                    <div className={styles.open_block_inner}>
                        <div className={styles.open_block_text}>
                            <p>Спасибо за оценку!</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedBack;
