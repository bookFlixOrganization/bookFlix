import React from 'react';
import styles from './ReadingHeader.module.css';
import { NavLink } from 'react-router-dom';

const ReadingHeader = (props) => {
    return (
        <div className={styles.reading_diary_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <NavLink
                                to={'/reading-diary'}
                                className={
                                    props.activeLink === 'reading-diary'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                                onClick={() => props.handleLinkClick('reading-diary')}
                            >
                                Дневник чтения
                            </NavLink>
                            <NavLink
                                to={'/popular-articles'}
                                className={
                                    props.activeLink === 'popular-articles'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                                onClick={() => props.handleLinkClick('popular-articles')}
                            >
                                Популярные статьи
                            </NavLink>
                            <NavLink
                                to={'/my-subs'}
                                className={
                                    props.activeLink === 'my-subs'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                                onClick={() => props.handleLinkClick('my-subs')}
                            >
                                Мои подписки
                            </NavLink>
                            <NavLink
                                to={'/new-article'}
                                className={
                                    props.activeLink === 'new-article'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                                onClick={() => props.handleLinkClick('new-article')}
                            >
                                Новая статья
                            </NavLink>
                            <NavLink
                                to={'/search-article'}
                                className={
                                    props.activeLink === 'search-article'
                                        ? styles.active_link
                                        : styles.button_all
                                }
                                onClick={() => props.handleLinkClick('search-article')}
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
