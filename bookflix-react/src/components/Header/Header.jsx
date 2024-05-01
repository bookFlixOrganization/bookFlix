import React from 'react';
import styles from './Header.module.css';
import logo from './images/new_logo.svg';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__inner}>
                    <a href="/" className={styles.logo}>
                        <img src={logo} alt="logo" />
                        <div className={styles.header_logo}>BookFlix</div>
                    </a>
                    <ul className={styles.user_nav}>
                        <div className={styles.search}>
                            <div className={styles.icon}></div>
                            <div className={styles.input}>
                                <input type="text" placeholder="Поиск" id="mySearch" />
                            </div>
                            <span className={styles.clear}></span>
                        </div>

                        <li className={styles.user_nav__item}>
                            <a href="/" className={styles.entrance}>
                                Sign Up
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
