import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ReadingHeader.module.css';
import { NavLink } from 'react-router-dom';

const ReadingHeader = () => {
    const location = useLocation();
    const activeLink = location.pathname.split('/')[1];

    return (
        <div className={styles.reading_diary_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <NavLink
                                to={'/reading-diary'}
                                className={
                                    activeLink === 'reading-diary'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                            >
                                Дневник чтения
                            </NavLink>
                            <NavLink
                                to={'/popular-articles'}
                                className={
                                    activeLink === 'popular-articles'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                            >
                                Популярные статьи
                            </NavLink>
                            <NavLink
                                to={'/subscribes'}
                                className={
                                    activeLink === 'subscribes'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                            >
                                Мои подписки
                            </NavLink>
                            <NavLink
                                to={'/new-article/new'}
                                className={
                                    activeLink === 'new-article'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                            >
                                Новая статья
                            </NavLink>
                            <NavLink
                                to={'/search-article'}
                                className={
                                    activeLink === 'search-article'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                            >
                                Найти статью
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReadingHeader;
