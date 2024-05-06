import React from 'react';
import styles from './Preferences.module.css';

const Preferences = () => {
    return (
        <div className={styles.preferences_page_container}>
            <h2 className={styles.preferences_title}>
                Давайте выберем ваши предпочтения в фильмах
            </h2>
            <div className={styles.preferences_genres}>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>😱</div>
                    <div className={styles.preferences_item_name}>Horror</div>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
