import React from 'react';
import styles from './Preferences.module.css';

const Preferences = (props) => {
    const filmGenres = [
        { genre: 'Horror', emoji: '😱', name: 'Хоррор' },
        { genre: 'Drama', emoji: '🥺', name: 'Драма' },
        { genre: 'Mystery', emoji: '👻', name: 'Мистика' },
        { genre: 'Sci-fi', emoji: '🤖', name: 'Научно-фантастический' },
        { genre: 'Romance', emoji: '🍷', name: 'Романтический' },
        { genre: 'Film-noir', emoji: '🖤', name: 'Нуар' },
        { genre: 'Fantasy', emoji: '🗡️', name: 'Фентези' },
        { genre: 'Biography', emoji: '🗿', name: 'Биография' },
        { genre: 'Documentary', emoji: '📄', name: 'Документальный' },
        { genre: 'Music', emoji: '🪩', name: 'Мюзикл' },
        { genre: 'Thriller', emoji: '🙀', name: 'Триллер' },
        { genre: 'Crime', emoji: '🔫', name: 'Криминальный' },
        { genre: 'Action', emoji: '💥', name: 'Экшн' },
        { genre: 'War', emoji: '🪖', name: 'Военный' },
        { genre: 'Adventure', emoji: '🤠', name: 'Приключения' },
        { genre: 'Comedy', emoji: '😂', name: 'Комедия' },
        { genre: 'Western', emoji: '🌵', name: 'Вестерн' },
        { genre: 'History', emoji: '🏛️', name: 'Исторический' },
        { genre: 'Family', emoji: '👨‍👩‍👦', name: 'Семейный' },
    ];
    const bookGenres = [
        { genre: 'Fantastic', emoji: '📚', name: 'Фантастика' },
        { genre: 'Detective', emoji: '📖', name: 'Детектив' },
        { genre: 'Business literature', emoji: '📔', name: 'Бизнес-литература' },
        { genre: "Children's literature", emoji: '📙', name: 'Детская литература' },
        { genre: 'Novel', emoji: '📘', name: 'Роман' },
        { genre: 'Horror', emoji: '📗', name: 'Ужасы' },
        { genre: 'Science fiction', emoji: '📕', name: 'Научная фантастика' },
        { genre: 'Psychology', emoji: '📒', name: 'Психология' },
        { genre: 'Computer literature', emoji: '📓', name: 'Компьютерная литература' },
        { genre: 'Classic literature', emoji: '📔', name: 'Классическая литература' },
        { genre: 'Adventure', emoji: '📖', name: 'Приключения' },
        { genre: 'Study literature', emoji: '📔', name: 'Учебная литература' },
        { genre: 'Fantasy', emoji: '📘', name: 'Фэнтези' },
    ];
    return (
        <div className={styles.preferences_page_container}>
            <h2 className={styles.preferences_title}>
                Давайте выберем ваши предпочтения в фильмах
            </h2>
            <div className={styles.preferences_genres}>
                {filmGenres.map(({ genre, emoji, name }) => (
                    <button
                        key={`film_${genre}`}
                        className={`${styles.preferences_item} ${props.isGenreActive(genre, 'book') ? styles.active : ''}`}
                        onClick={() => props.handleGenreClick(genre, 'book')}
                    >
                        <div className={styles.preferences_item_emoji}>{emoji}</div>
                        <div className={styles.preferences_item_name}>{name}</div>
                    </button>
                ))}
            </div>
            <h2 className={styles.preferences_title}>Давайте выберем ваши предпочтения в книгах</h2>
            <div className={styles.preferences_genres}>
                {bookGenres.map(({ genre, emoji, name }) => (
                    <button
                        key={`book_${genre}`}
                        className={`${styles.preferences_item} ${props.isGenreActive(genre, 'book') ? styles.active : ''}`}
                        onClick={() => props.handleGenreClick(genre, 'book')}
                    >
                        <div className={styles.preferences_item_emoji}>{emoji}</div>
                        <div className={styles.preferences_item_name}>{name}</div>
                    </button>
                ))}
            </div>
            <button className={styles.prefenres_button}>Готово</button>
        </div>
    );
};

export default Preferences;
