import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Subscribes.module.css';
import { ReactComponent as TrashIcon } from './images/trash.svg';
import { ReactComponent as ProfileIcon } from './images/profile.svg';

const Subscribes = () => {
    return (
        <div className={styles.articles_container}>
            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.movies}>
                        <button className={styles.movie}>
                            <div className={styles.left_block}>
                                <ProfileIcon className={styles.subscribes_profile_icon} />
                            </div>
                            <div className={styles.subscribes_item}>
                                <div className={`${styles.center_block} ${styles.subscribes_desc}`}>
                                    IvanBorisov123
                                </div>
                                <div className={styles.subscribes_subtitle}>6 статей</div>
                            </div>
                            <div className={styles.tools}>
                                <NavLink to="/" className={styles.tool}>
                                    <TrashIcon className={styles.article_trash_icon} />
                                </NavLink>
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

export default Subscribes;
