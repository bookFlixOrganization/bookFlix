import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from './images/profile.svg';
import { ReactComponent as SvgIcon } from './images/icon.svg';
import styles from './Author.module.css';

const Author = (props) => {
    return (
        <div className={styles.author_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Дневник чтения</p>
                            <NavLink to="/" className={styles.button_all}>
                                Популярные статьи
                            </NavLink>
                            <NavLink to="/" className={styles.button_all}>
                                Мои статьи
                            </NavLink>
                            <NavLink to="/" className={styles.button_all}>
                                Мои подписки
                            </NavLink>
                            <NavLink to="/" className={styles.button_all}>
                                Новая статья
                            </NavLink>
                            <NavLink to="/" className={styles.button_all}>
                                Найти статью
                            </NavLink>
                        </div>
                        <p className={styles.section_subtitle}>Автор</p>
                    </div>
                </div>
            </section>

            <section>
                <div className={styles.container}>
                    <div className={styles.all}>
                        <div className={styles.left_block}>
                            <ProfileIcon className={styles.profileIcon} />
                        </div>
                        <div className={styles.center_block}>
                            <h4 className={styles.author_name}>Ivan_Borisov123</h4>
                            <div className={styles.subtitle}>5 статей</div>
                        </div>
                        <div className={styles.block}>
                            <button
                                className={`${styles.button_subc} ${props.isSubscribed ? styles.subscribed : ''}`}
                                onClick={props.handleSubscribe}
                            >
                                {props.isSubscribed ? 'Вы подписаны!' : 'Подписаться на автора'}
                            </button>
                        </div>
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
                                        <SvgIcon className={styles.svgIcon}></SvgIcon>
                                        <div className={styles.small_box_2}>
                                            <h3 className={styles.article_author_name}>
                                                Ivan_Borisov123
                                            </h3>
                                            <NavLink to="/" className={styles.amount}>
                                                5 статей
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className={styles.data}>29 августа 2021 в 17:04</div>
                                </div>
                                <h4 className={styles.theme_title}>Theme</h4>
                                <div className={styles.subtitle}>
                                    &quot;Пиковая Дама&quot;, А. С. Пушкин
                                </div>
                                <p>
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
                                <NavLink to="#" className={styles.btn}>
                                    Читать статью полностью
                                </NavLink>
                            </div>
                        </div>

                        <div className={styles.block}>
                            <div className={styles.content}>
                                <div className={styles.small_box}>
                                    <div className={styles.small_box_1}>
                                        <SvgIcon className={styles.svgIcon}></SvgIcon>
                                        <div className={styles.small_box_2}>
                                            <h3 className={styles.article_author_name}>
                                                Ivan_Borisov123
                                            </h3>
                                            <NavLink to="#" className={styles.amount}>
                                                5 статей
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className={styles.data}>29 августа 2021 в 17:04</div>
                                </div>
                                <h4 className={styles.theme_title}>Theme</h4>
                                <div className={styles.subtitle}>
                                    &quot;Пиковая Дама&quot;, А. С. Пушкин
                                </div>
                                <p>
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
                                <NavLink to="#" className={styles.btn}>
                                    Читать статью полностью
                                </NavLink>
                            </div>
                        </div>

                        <div className={styles.block}>
                            <div className={styles.content}>
                                <div className={styles.small_box}>
                                    <div className={styles.small_box_1}>
                                        <SvgIcon className={styles.svgIcon}></SvgIcon>

                                        <div className={styles.small_box_2}>
                                            <h3 className={styles.article_author_name}>
                                                Ivan_Borisov123
                                            </h3>
                                            <NavLink to="#" className={styles.amount}>
                                                5 статей
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className={styles.data}>29 августа 2021 в 17:04</div>
                                </div>
                                <h4 className={styles.theme_title}>Theme</h4>
                                <div className={styles.subtitle}>
                                    &quot;Пиковая Дама&quot;, А. С. Пушкин
                                </div>
                                <p>
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
                                <NavLink to="/" className={styles.btn}>
                                    Читать статью полностью
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className={styles.show_more}>
                <button id="show_more" className={styles.show_more}>
                    Читать ещё
                </button>
            </div>
        </div>
    );
};

export default Author;
