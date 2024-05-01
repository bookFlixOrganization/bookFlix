import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from './images/new_logo.svg';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__inner}>
                    <NavLink to="/" className={styles.logo}>
                        <img src={logo} alt="logo" />
                        <div className={styles.header_logo}>BookFlix</div>
                    </NavLink>
                    <ul className={styles.user_nav}>
                        <div className={`${styles.search} ${props.isActive ? styles.active : ''}`}>
                            <button
                                className={styles.icon}
                                onClick={props.handleSearchClick}
                            ></button>
                            <div className={styles.input}>
                                <input
                                    type="text"
                                    placeholder="Поиск"
                                    id="mySearch"
                                    onChange={props.handleTextChange}
                                    value={props.requestText || ''}
                                />
                            </div>
                            <button
                                className={styles.clear}
                                onClick={props.handleClearClick}
                            ></button>
                        </div>

                        <li className={styles.user_nav__item}>
                            <NavLink to="/auth" className={styles.entrance}>
                                Sign In
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
