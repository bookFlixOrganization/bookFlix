import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from './images/new_logo.svg';
import { ReactComponent as ProfileIcon } from './images/profile.svg';

const Header = ({ session, handleLogout }) => {
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

                        {!session.is_auth && (
                            <li className={styles.user_nav__item}>
                                <NavLink to="/auth" className={styles.entrance}>
                                    Sign In
                                </NavLink>
                            </li>
                        )}

                        {session.is_auth && (
                            <li className={styles.user_nav__item}>
                                <div className={`${styles.entrance} ${styles.profile_entrance}`}>
                                    <ProfileIcon className={styles.profile_icon} />
                                </div>
                                <ul className={styles.drop_down_menu}>
                                    <li className={styles.points}>
                                        <NavLink to="/">Главная</NavLink>
                                    </li>
                                    <li className={styles.points}>
                                        <NavLink to="/favourites">Избранное</NavLink>
                                    </li>
                                    <li className={styles.points}>
                                        <NavLink to="/history">История</NavLink>
                                    </li>
                                    <li className={styles.points}>
                                        <NavLink to="/subscribes">Мои подписки</NavLink>
                                    </li>
                                    <li className={styles.points}>
                                        <NavLink to="/reading-diary">Дневник чтения</NavLink>
                                    </li>
                                    <li className={styles.points}>
                                        <NavLink to="/account">Личный кабинет</NavLink>
                                    </li>
                                    <li className={styles.points}>
                                        <div className={styles.logout_button_container}>
                                            <button
                                                className={styles.logout_button}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
