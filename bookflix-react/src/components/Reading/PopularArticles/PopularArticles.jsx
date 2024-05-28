import React from 'react';
import styles from './PopularArticles.module.css';
import { ReactComponent as CardIcon } from './images/card.svg';
import { NavLink } from 'react-router-dom';

const PopularArticles = (props) => {
    return (
        <div className={styles.reading_diary_container}>
            <h3 className={styles.section_subtitle}>Популярные статьи</h3>
            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.container_2}>
                        {props.myArticles &&
                            props.myArticles
                                .slice(0, props.articlesToShow)
                                .map((article, index) => (
                                    <div key={`myarticle_${index}`} className={styles.block}>
                                        <div className={styles.content}>
                                            <div className={styles.small_box}>
                                                <div className={styles.small_box_1}>
                                                    <CardIcon />
                                                    <div className={styles.small_box_2}>
                                                        <h3 className={styles.article_author}>
                                                            {article.user_name}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className={styles.data}>
                                                    {article.publication_date}
                                                </div>
                                            </div>
                                            <h4 className={styles.article_name}>
                                                {article.article_name}
                                            </h4>
                                            <div className={styles.subtitle}>
                                                &quot;{article.book_name}&quot;,{' '}
                                                {article.book_authors[0]}
                                            </div>
                                            <div className={styles.article_desc}>
                                                {article.text}
                                            </div>
                                            <div className={styles.low}>
                                                <NavLink
                                                    to={`/article-page/${article.id}`}
                                                    className={styles.btn}
                                                >
                                                    Читать статью полностью
                                                </NavLink>
                                                <div className={styles.likes_amount}>
                                                    Лайков: {article.likes}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                    </div>
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
            </section>
        </div>
    );
};

export default PopularArticles;
