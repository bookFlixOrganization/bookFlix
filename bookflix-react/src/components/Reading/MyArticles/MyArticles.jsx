import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MyArticles.module.css';
import { ReactComponent as EditIcon } from './images/edit.svg';
import { ReactComponent as TrashIcon } from './images/trash.svg';

const Articles = (props) => {
    return (
        <div className={styles.articles_container}>
            <h3 className={styles.section_subtitle}>Мои статьи</h3>
            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.movies}>
                        {props.myArticles &&
                            props.myArticles
                                .slice(0, props.articlesToShow)
                                .map((article, index) => (
                                    <button key={`my_article_${index}`} className={styles.movie}>
                                        <div className={styles.left_block}>
                                            <h4 className={styles.theme}>
                                                <NavLink
                                                    className={styles.theme_link}
                                                    to={`/article-page/${article.id}`}
                                                >
                                                    {article.article_name}
                                                </NavLink>
                                            </h4>
                                            <div className={styles.subtitle}>
                                                &quot;{article.book_name}&quot;
                                            </div>
                                            <div className={styles.subtitle}>
                                                {article.book_authors[0]}
                                            </div>
                                        </div>
                                        <p
                                            className={`${styles.center_block} ${styles.article_desc}`}
                                        >
                                            {article.text}
                                        </p>
                                        <div className={styles.tools}>
                                            <NavLink
                                                to={`/edit-article/${article.id}`}
                                                className={styles.tool}
                                            >
                                                <EditIcon className={styles.article_edit_icon} />
                                            </NavLink>

                                            <NavLink to="/" className={styles.tool}>
                                                <TrashIcon className={styles.article_trash_icon} />
                                            </NavLink>

                                            <div className={styles.subtitle}>
                                                {article.publication_date}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                    </div>
                    {props.myArticles && props.articlesToShow < props.myArticles.length && (
                        <div className={styles.show_more}>
                            <button
                                id="show_more"
                                className={styles.show_more}
                                onClick={props.handleShowMore}
                            >
                                Читать ещё
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Articles;
