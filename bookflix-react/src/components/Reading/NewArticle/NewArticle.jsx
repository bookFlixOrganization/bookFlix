import React from 'react';
import styles from './NewArticle.module.css';

const NewArticle = (props) => {
    return (
        <div className={styles.new_article_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>
                                {props.bookId !== 'new'
                                    ? `Напишите новую статью о книге "${props.bookName}"`
                                    : 'Напишите новую статью'}
                            </p>{' '}
                        </div>
                        <p className={styles.section_subtitle}>
                            Расскажите, что больше всего понравилось, а чего не хватило
                        </p>
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
                        {props.bookId === 'new' && (
                            <>
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
                                    value={props.handleBookName || ''}
                                />
                            </>
                        )}

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
                        {props.bookId !== 'new' ? (
                            <button
                                id="safe"
                                className={styles.estimate}
                                onClick={props.submitArticleWithId}
                            >
                                Опубликовать
                            </button>
                        ) : (
                            <button
                                id="safe2"
                                className={styles.estimate}
                                onClick={props.submitArticle}
                            >
                                Опубликовать
                            </button>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default NewArticle;
