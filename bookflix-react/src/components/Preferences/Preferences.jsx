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
                    <div className={styles.preferences_item_name}>Хоррор</div>
                    {/* Horror */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🥺</div>
                    <div className={styles.preferences_item_name}>Драма</div>
                    {/* Drama */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>👻</div>
                    <div className={styles.preferences_item_name}>Мистика</div>
                    {/* Mystery */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🤖</div>
                    <div className={styles.preferences_item_name}>Научно-фантастический</div>
                    {/* Sci-fi */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🍷</div>
                    <div className={styles.preferences_item_name}>Романтический</div>
                    {/* Romance */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🖤</div>
                    <div className={styles.preferences_item_name}>Нуар</div>
                    {/* Film-noir */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🗡️</div>
                    <div className={styles.preferences_item_name}>Фентези</div>
                    {/* Fantasy */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🗿</div>
                    <div className={styles.preferences_item_name}>Биография</div>
                    {/* Biography */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🗿</div>
                    <div className={styles.preferences_item_name}>Биография</div>
                    {/* Biography */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📄</div>
                    <div className={styles.preferences_item_name}>Документальный</div>
                    {/* Documentary */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🪩</div>
                    <div className={styles.preferences_item_name}>Мюзикл</div>
                    {/* Music */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🙀</div>
                    <div className={styles.preferences_item_name}>Триллер</div>
                    {/* Thriller */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🔫</div>
                    <div className={styles.preferences_item_name}>Криминальный</div>
                    {/* Crime */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>💥</div>
                    <div className={styles.preferences_item_name}>Экшн</div>
                    {/* Action */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🪖</div>
                    <div className={styles.preferences_item_name}>Военный</div>
                    {/* War */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🤠</div>
                    <div className={styles.preferences_item_name}>Приключения</div>
                    {/* Adventure */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>😂</div>
                    <div className={styles.preferences_item_name}>Комедия</div>
                    {/* Comedy */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🌵</div>
                    <div className={styles.preferences_item_name}>Вестерн</div>
                    {/* Western */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>🏛️</div>
                    <div className={styles.preferences_item_name}>Исторический</div>
                    {/* History */}
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>👨‍👩‍👦</div>
                    <div className={styles.preferences_item_name}>Семейный</div>
                    {/* Семейный */}
                </div>
            </div>
            <h2 className={styles.preferences_title}>Давайте выберем ваши предпочтения в книгах</h2>
            <div className={styles.preferences_genres}>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📚</div>
                    <div className={styles.preferences_item_name}>Фантастика</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📖</div>
                    <div className={styles.preferences_item_name}>Детектив</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📔</div>
                    <div className={styles.preferences_item_name}>Бизнес-литература</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📙</div>
                    <div className={styles.preferences_item_name}>Детская литература</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📘</div>
                    <div className={styles.preferences_item_name}>Роман</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📗</div>
                    <div className={styles.preferences_item_name}>Ужасы</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📕</div>
                    <div className={styles.preferences_item_name}>Научная фантастика</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📒</div>
                    <div className={styles.preferences_item_name}>Психология</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📓</div>
                    <div className={styles.preferences_item_name}>Компьютерная литература</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📔</div>
                    <div className={styles.preferences_item_name}>Классическая литература</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📖</div>
                    <div className={styles.preferences_item_name}>Приключения</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📔</div>
                    <div className={styles.preferences_item_name}>Учебная литература</div>
                </div>
                <div className={styles.preferences_item}>
                    <div className={styles.preferences_item_emoji}>📘</div>
                    <div className={styles.preferences_item_name}>Фэнтези</div>
                </div>
            </div>
            <button className={styles.prefenres_button}>Готово</button>
        </div>
    );
};

export default Preferences;
