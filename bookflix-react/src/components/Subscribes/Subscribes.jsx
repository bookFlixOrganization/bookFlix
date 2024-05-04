import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Subscribes.module.css';
import { ReactComponent as TrashIcon } from './images/trash.svg';

const Articles = () => {
    return (
        <div className={styles.articles_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Дневник чтения</p>
                            <a href="/" className={styles.button_all}>
                                Популярные статьи
                            </a>
                            <a href="/" className={styles.button_all}>
                                Мои статьи
                            </a>
                            <a href="/" className={styles.button_all}>
                                Мои подписки
                            </a>
                            <a href="/" className={styles.button_all}>
                                Новая статья
                            </a>
                            <a href="/" className={styles.button_all}>
                                Найти статью
                            </a>
                        </div>
                        <p className={styles.section_subtitle}>Мои статьи</p>
                    </div>
                </div>
            </section>

            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.movies}>
                        <button className={styles.movie}>
                            <div className={styles.left_block}>
                                <h4 className={styles.theme}>Theme</h4>
                                <div className={styles.subtitle}>&quot;Пиковая Дама&quot;</div>
                                <div className={styles.subtitle}>А. С. Пушкин</div>
                            </div>
                            <p className={`${styles.center_block} ${styles.article_desc}`}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                                tempore totam dolorem magnam sunt hic harum voluptatibus magni
                                officiis velit nihil placeat nemo, pariatur doloribus?
                            </p>
                            <div className={styles.tools}>
                                <NavLink to="/" className={styles.tool}>
                                    <TrashIcon className={styles.article_trash_icon} />
                                </NavLink>

                                <div className={styles.subtitle}>29 августа 2021 в 17:04</div>
                            </div>
                        </button>
                    </div>

                    <div className={styles.show_more}>
                        <button id="show_more" className={styles.show_more}>
                            Читать ещё
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Articles;
