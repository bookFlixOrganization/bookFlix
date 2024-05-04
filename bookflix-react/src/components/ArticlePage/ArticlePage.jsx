import React from 'react';
import styles from './ArticlePage.module.css';
import { ReactComponent as LikeIcon } from './images/like.svg';

const ArticlePage = (props) => {
    return (
        <div className={styles.articlepage_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.theme}>Theme</div>
                    <div className={styles.author}>
                        <div className={styles.name}>Автор статьи:</div>
                        <a href="/" className={styles.name_2}>
                            Ivan_Borisov123
                        </a>
                    </div>
                    <div className={styles.author}>
                        <div className={styles.name}>Автор книги:</div>
                        <div className={styles.name_1}>А. С. Пушкин</div>
                    </div>
                    <div className={styles.author}>
                        <div className={styles.name}>Название книги:</div>
                        <div className={styles.name_1}>&quot;Пиковая Дама&quot;</div>
                    </div>
                    <div className={styles.author}>
                        <div className={styles.name}>Жанр книги:</div>
                        <div className={styles.name_1}>Повесть</div>
                    </div>
                    <div className={styles.author}>
                        <div className={styles.name}>Дата публикации:</div>
                        <div className={styles.name_1}>29 августа 2021 в 17:04</div>
                    </div>
                    <div className={styles.block}>
                        <button
                            className={`${styles.subs_btn} ${props.isSubscribed ? styles.subscribed : ''}`}
                            onClick={props.handleSubsClick}
                        >
                            {!props.isSubscribed && 'Подписаться на автора'}
                            {props.isSubscribed && 'Вы подписаны'}
                        </button>
                    </div>

                    <p className={styles.article_text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
                        accusamus perspiciatis debitis sit id ex nemo adipisci nesciunt neque
                        pariatur laborum, ipsum facilis, eligendi sapiente error suscipit.
                        Voluptates nemo modi inventore voluptas quod, aut soluta a officiis
                        reprehenderit optio sit doloribus minus distinctio et nostrum natus? Ipsam
                        ullam quasi voluptatem fugit soluta eaque neque placeat cum iste dignissimos
                        vel dolor at, quod dolorem aliquam blanditiis. Ut, excepturi pariatur earum
                        veniam nemo, vero quibusdam impedit rerum incidunt inventore nobis
                        temporibus ducimus explicabo aut sit nesciunt unde officiis blanditiis
                        eveniet. Alias, quia pariatur sint voluptas voluptatum dolorem iusto ipsum
                        asperiores vitae aliquid deserunt adipisci nemo inventore. Praesentium nam
                        eius nostrum doloremque asperiores sint similique? Minima saepe, culpa
                        obcaecati dolorem ex illo esse quae quos sed vitae eius! Porro reprehenderit
                        est voluptatem tempora laudantium eos eius architecto? Expedita odio
                        cupiditate nostrum voluptas id magni non, illo nulla molestiae dolorum fuga
                        blanditiis accusantium quas suscipit delectus praesentium quisquam neque
                        similique vel! Non recusandae ad omnis cumque iure, sunt porro
                        exercitationem aut possimus minus dignissimos debitis doloremque nobis,
                        fugit quo. Quibusdam provident corrupti saepe itaque animi optio quam
                        quisquam consequuntur autem similique reprehenderit perspiciatis architecto
                        earum cum facere quas cumque cupiditate error fugiat ipsam rem quidem
                        veritatis, minus delectus? Repudiandae earum quaerat facilis cum laborum
                        consequatur. Iure atque voluptate expedita fugit, porro velit ipsa quo
                        distinctio nobis, ab magnam aliquam cupiditate in? Laudantium illum
                        provident aliquam doloribus quos sequi fugit illo optio natus rem deleniti
                        cum a corrupti amet, nobis non ipsa, ea ipsum suscipit sed qui pariatur.
                        Voluptatibus, rerum provident laudantium ut vitae optio reprehenderit
                        doloremque repellendus! Vero nulla distinctio ipsa harum est minima culpa
                        ipsum recusandae? Soluta pariatur dicta, perspiciatis incidunt natus animi
                        quia at molestias quasi praesentium, voluptas debitis autem voluptatibus.
                        Suscipit doloribus ab incidunt molestias quasi! Veritatis aliquam ratione
                        cupiditate libero necessitatibus voluptates, quas quasi repellat nostrum
                        dolore iure facere recusandae, dolorum iusto eius doloribus harum
                        consectetur nulla ab quod id doloremque tempora illo. Id illum velit
                        corrupti ad adipisci officiis? Voluptatem asperiores maiores at accusamus
                        sed accusantium libero repellendus praesentium unde, atque voluptate
                        sapiente, eum, nostrum tenetur laborum. Ipsum blanditiis explicabo fuga
                        ullam corrupti in praesentium modi eaque neque, esse voluptas distinctio ab
                        sunt architecto minus excepturi saepe accusamus? Blanditiis explicabo,
                        facilis facere voluptatum iure aspernatur dolor in quos perferendis placeat
                        deleniti soluta error magni porro cum iusto id alias similique ratione ab
                        aperiam. Odit explicabo esse atque illo ipsum.
                    </p>
                    <div className={styles.like_button}>
                        <div className={styles.heart_bg}>
                            <LikeIcon className={styles.LikeIcon} />
                        </div>
                        <div className={styles.likes_amount}>0</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
