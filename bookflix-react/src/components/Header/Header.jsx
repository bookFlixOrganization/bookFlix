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
                        <div className={`${styles.search}`}>
                            <NavLink to="/search">
                                <div className={styles.icon}></div>
                            </NavLink>
                        </div>

                        {props.session.is_active && (
                            <li className={styles.user_nav__item}>
                                <NavLink to="/auth" className={styles.entrance}>
                                    Sign In
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
