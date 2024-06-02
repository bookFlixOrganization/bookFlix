import React from 'react';
import styles from './SearchArticle.module.css';
import { ReactComponent as CardIcon } from './images/card.svg';
import { NavLink } from 'react-router-dom';

const SearchArticle = (props) => {
    return (
        <div className={styles.search_container}>
            <div className={styles.search_form}>
                <input
                    value={props.userQuery}
                    onChange={props.handleUserQueryChange}
                    className={styles.search_form_text}
                    type="text"
                    placeholder="Введите название книги, по которой хотите увидеть статью"
                />
                <button className={styles.search_form_button} onClick={props.handleSearhArticle}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        style={{ fill: 'white' }}
                    >
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </button>
            </div>

            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.container_2}>
                        {props.foundedArticles === 'not found' ? (
                            <div className={styles.not_found}>
                                По вашему запросу ничего не найдено
                            </div>
                        ) : (
                            props.foundedArticles &&
                            props.foundedArticles
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
                                ))
                        )}
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

export default SearchArticle;
