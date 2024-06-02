import React from 'react';
import styles from './EditArticle.module.css';

const EditArticle = (props) => {
    return (
        <div className={styles.new_article_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Редактирование статьи</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className={styles.container}>
                    <form className={styles.modal_box} action="#">
                        <label className={styles.label} htmlFor="article_name">
                            Название статьи
                        </label>
                        <input
                            className={styles.inp}
                            onChange={props.handleEditArticleName}
                            type="text"
                            id="article_name"
                            name="article_name"
                            maxLength="100"
                            placeholder="Название статьи"
                            value={props.articleName || ''}
                        />

                        <label className={styles.label} htmlFor="book_name">
                            Название книги
                        </label>
                        <input
                            className={styles.inp}
                            onChange={props.handleEditBookName}
                            type="text"
                            id="book_name"
                            name="book_name"
                            maxLength="100"
                            placeholder="Название книги"
                            value={props.bookName || ''}
                        />

                        <label htmlFor="article_text" className={styles.label}>
                            Ваша статья
                        </label>
                        <textarea
                            className={styles.new_article_textarea}
                            onChange={props.handleEditText}
                            id="article_text"
                            name="article_text"
                            cols="100"
                            rows="100"
                            placeholder="Текст"
                            value={props.text || ''}
                        ></textarea>

                        <button id="safe" className={styles.estimate} onClick={props.handleSubmit}>
                            Опубликовать
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default EditArticle;
