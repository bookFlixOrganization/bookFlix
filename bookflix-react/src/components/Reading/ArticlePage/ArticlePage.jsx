import React from 'react';
import styles from './ArticlePage.module.css';
import { ReactComponent as LikeIcon } from './images/like.svg';

const ArticlePage = (props) => {
    const { articleState } = props;
    console.log(articleState);
    return (
        <div className={styles.articlepage_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.theme}>{articleState.articleName}</div>
                    <div className={styles.author}>
                        <div className={styles.name}>Автор статьи:</div>
                        <a href="/" className={styles.name_2}>
                            {articleState.articleAuthor}
                        </a>
                    </div>
                    <div className={styles.author}>
                        <div className={styles.name}>Автор книги:</div>
                        <div className={styles.name_1}>{articleState.bookAuthor}</div>
                    </div>
                    <div className={styles.author}>
                        <div className={styles.name}>Название книги:</div>
                        <div className={styles.name_1}>&quot;{articleState.bookName}&quot;</div>
                    </div>
                    <div className={styles.author}>
                        <div className={styles.name}>Дата публикации:</div>
                        <div className={styles.name_1}>{articleState.date}</div>
                    </div>
                    {props.myId !== props.articleState.articleAuthorId && (
                        <div className={styles.block}>
                            <button
                                className={`${styles.subs_btn} ${articleState.isSub === 1 ? styles.subscribed : ''}`}
                                onClick={props.handleSubsClick}
                            >
                                {articleState.isSub === 0 && 'Подписаться на автора'}
                                {articleState.isSub === 1 && 'Вы подписаны'}
                            </button>
                        </div>
                    )}

                    <p className={styles.article_text}>{articleState.articleText}</p>
                    <div className={styles.like_container}>
                        <LikeIcon
                            className={`${styles.LikeIcon} ${props.isLiked === 1 ? styles.liked : ''}`}
                            onClick={props.handleLikeClick}
                        />
                        <div className={styles.likes_amount}>{articleState.countLikes}</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
