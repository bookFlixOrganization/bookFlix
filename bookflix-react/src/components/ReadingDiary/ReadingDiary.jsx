import React from 'react';
import styles from './ReadingDiary.module.css';
import { ReactComponent as CardIcon } from './images/card.svg';
import { ReactComponent as LikeIcon } from './images/like.svg';

const Subscribes = () => {
    return (
        <div className={styles.reading_diary_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Дневник чтения</p>
                            <a href="/" className={styles.button_all}>
                                Популярные статьи
                            </a>
                            <a href="/" className={styles.button_all}>
                                Мои статьи
                            </a>
                            <a href="/" className={styles.button_all}>
                                Мои подписки
                            </a>
                            <a href="/" className={styles.button_all}>
                                Новая статья
                            </a>
                            <a href="/" className={styles.button_all}>
                                Найти статью
                            </a>
                        </div>
                        <p className={styles.section_subtitle}>Мои статьи</p>
                    </div>
                </div>
            </section>

            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.container_2}>
                        <div className={styles.block}>
                            <div className={styles.content}>
                                <div className={styles.small_box}>
                                    <div className={styles.small_box_1}>
                                        <CardIcon />
                                        <div className={styles.small_box_2}>
                                            <h3 className={styles.article_author}>
                                                Ivan_Borisov123
                                            </h3>
                                            <a href="/" className={styles.amount}>
                                                5 статей
                                            </a>
                                        </div>
                                    </div>
                                    <div className={styles.data}>29 августа 2021 в 17:04</div>
                                </div>
                                <h4 className={styles.article_name}>Theme</h4>
                                <div className={styles.subtitle}>
                                    &quot;Пиковая Дама&quot;, А. С. Пушкин
                                </div>
                                <p className={styles.article_desc}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Perspiciatis praesentium iste molestias sed alias porro repellat
                                    ea deserunt incidunt magnam fugit mollitia, aliquid quasi quod,
                                    quis, cum obcaecati velit rem aut id repudiandae. Voluptatum
                                    dolore iure, labore consequuntur dolorem deleniti accusantium
                                    delectus ducimus ut ex facere? Delectus, architecto, voluptas
                                    expedita unde esse excepturi natus fuga ducimus quam maiores ab.
                                    Sunt voluptatibus consequuntur atque possimus? Nostrum impedit
                                    libero iure asperiores fugiat, alias, ipsam saepe eaque unde
                                    ratione est consequatur necessitatibus eius natus quos rerum
                                    corrupti culpa totam sit distinctio inventore! Laboriosam
                                    possimus, totam nesciunt velit animi nam ipsum eveniet adipisci
                                    veniam?
                                </p>
                                <div className={styles.low}>
                                    <a href="/" className={styles.btn}>
                                        Читать статью полностью
                                    </a>
                                    <div className={styles.like_button}>
                                        <LikeIcon className={styles.LikeIcon} />
                                        <div className={styles.likes_amount}>15</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.show_more}>
                    <button id="show_more" className={styles.show_more}>
                        Читать ещё
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Subscribes;
