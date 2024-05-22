import React from 'react';
import YourFilms from './Sections/YourFilms.jsx';
import YourBooks from './Sections/YourBooks.jsx';
import PopularFilms from './Sections/PopularFilms.jsx';
import PopularBooks from './Sections/PopularBooks.jsx';
import styles from './Sections/Section.module.css';

const MainPage = (props) => {
    return (
        <div>
            <section className={`${styles.now_watching_text} ${styles.main_header}`}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <p className={styles.section_title_1}>Главная</p>
                    </div>
                </div>
            </section>
            {props.personFilms && <YourFilms personFilms={props.personFilms} />}
            {props.personBooks && <YourBooks personBooks={props.personBooks} />}
            <PopularFilms popularFilms={props.popularFilms} />
            <PopularBooks popularBooks={props.popularBooks} />
        </div>
    );
};

export default MainPage;
