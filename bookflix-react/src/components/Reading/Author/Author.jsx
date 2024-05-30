import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from './images/profile.svg';
import { ReactComponent as CardIcon } from './images/icon.svg';
import styles from './Author.module.css';

const Author = (props) => {
    console.log(props);
    return (
        <div className={styles.author_container}>
            <section>
                <div className={styles.container}>
                    <div className={styles.all}>
                        <div className={styles.left_block}>
                            <ProfileIcon className={styles.profileIcon} />
                        </div>
                        <div className={styles.center_block}>
                            <h4 className={styles.author_name}>{props.authorName}</h4>
                            {props.authorArticles && props.authorArticles.length && (
                                <div className={styles.subtitle}>
                                    {props.authorArticles.length} статей
                                </div>
                            )}
                        </div>
                        <div className={styles.block}>
                            <button
                                className={`${styles.button_subc} ${props.isSubscribed ? styles.subscribed : ''}`}
                                onClick={props.handleSubscribe}
                            >
                                {props.isSubscribed === 0 && 'Подписаться на автора'}
                                {props.isSubscribed === 1 && 'Вы подписаны'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.container_2}>
                        {props.authorArticles &&
                            props.authorArticles
                                .slice(0, props.articlesToShow)
                                .map((article, index) => (
                                    <div key={`myarticle_${index}`} className={styles.block}>
                                        <div className={styles.content}>
                                            <div className={styles.small_box}>
                                                <div className={styles.small_box_1}>
                                                    <CardIcon className={styles.card_icon} />
                                                    <div className={styles.small_box_2}>
                                                        <h3 className={styles.article_author}>
                                                            {props.authorName}
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
            </section>

            {props.authorArticles && props.authorArticles < props.authorArticles.length && (
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
    );
};

export default Author;
