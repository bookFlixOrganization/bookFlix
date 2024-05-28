import React from 'react';
import styles from './Subscribes.module.css';
import { ReactComponent as TrashIcon } from './images/trash.svg';
import { ReactComponent as ProfileIcon } from './images/profile.svg';

const Subscribes = (props) => {
    return (
        <div className={styles.articles_container}>
            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.movies}>
                        {props.mySubs &&
                            props.mySubs.slice(0, props.authorsToShow).map((author, index) => (
                                <div key={`subscr_${index}`} className={styles.movie}>
                                    <div className={styles.left_block}>
                                        <ProfileIcon className={styles.subscribes_profile_icon} />
                                    </div>
                                    <div className={styles.subscribes_item}>
                                        <div
                                            className={`${styles.center_block} ${styles.subscribes_desc}`}
                                        >
                                            {author.sub_name}
                                        </div>
                                        <div className={styles.subscribes_subtitle}>
                                            {author.articles_count} статей
                                        </div>
                                    </div>
                                    <div className={styles.tools}>
                                        <button
                                            className={styles.tool}
                                            onClick={() => props.handleUnSubClick(author.sub_id)}
                                        >
                                            <TrashIcon className={styles.article_trash_icon} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {props.myArticles && props.articlesToShow < props.mySubs.length && (
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

export default Subscribes;
