import React from 'react';
import styles from './AuthPage.module.css';
import { NavLink } from 'react-router-dom';

const AuthPage = (props) => {
    return (
        <div className={`${styles.wrapper} ${props.isActive ? styles.active : ''} `}>
            <span className={styles.bg_animate}></span>
            <span className={styles.bg_animate2}></span>

            <div className={`${styles.form_box} ${styles.login}`}>
                <h2 className={styles.animation} style={{ '--i': 0, '--j': 21 }}>
                    Login
                </h2>
                <form
                    action="#"
                    onSubmit={(event) => {
                        event.preventDefault();
                        window.history.pushState({}, '', window.location.pathname);
                    }}
                >
                    <div
                        className={`${styles.input_box} ${styles.animation}`}
                        style={{ '--i': 1, '--j': 22 }}
                    >
                        <input
                            id="in-username"
                            type="text"
                            onChange={props.handleInUsernameChange}
                            value={props.inUsername || ''}
                        />
                        <label htmlFor="in-username">Username</label>
                        <i className={`${styles.bx} ${styles.bxs_user}`}></i>
                    </div>
                    <div
                        className={`${styles.input_box} ${styles.animation}`}
                        style={{ '--i': 2, '--j': 23 }}
                    >
                        <input
                            id="in-password"
                            type="password"
                            onChange={props.handleInPasswordChange}
                            value={props.inPassword || ''}
                        />
                        <label htmlFor="in-password">Password</label>
                        <i className={`${styles.bx} ${styles.bxs_lock_alt}`}></i>
                    </div>
                    <div
                        className={`${styles.mailing_forgot} ${styles.animation}`}
                        style={{ '--i': 3, '--j': 24 }}
                    >
                        <NavLink to="#">Forgot password?</NavLink>
                    </div>
                    <button
                        type="submit"
                        className={`${styles.btn} ${styles.animation}`}
                        style={{ '--i': 3, '--j': 24 }}
                    >
                        Login
                    </button>
                    <div
                        className={`${styles.logreg_link} ${styles.animation}`}
                        style={{ '--i': 4, '--j': 25 }}
                    >
                        <p>
                            Don`&#39;`t have an account?{' '}
                            <button
                                className={styles.register_link}
                                onClick={props.handleRegistrationClick}
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </form>
            </div>

            <div className={`${styles.info_text} ${styles.login}`}>
                <h2 className={styles.animation} style={{ '--i': 0, '--j': 20 }}>
                    Welcome to the BookFlix!
                </h2>
                <p className={styles.animation} style={{ '--i': 1, '--j': 21 }}></p>
            </div>

            <div className={`${styles.form_box} ${styles.register}`}>
                <h2 className={styles.animation} style={{ '--i': 17, '--j': 0 }}>
                    Sign Up
                </h2>
                <form
                    action="#"
                    onSubmit={(event) => {
                        event.preventDefault();
                        window.history.pushState({}, '', window.location.pathname);
                    }}
                >
                    <div
                        className={`${styles.input_box} ${styles.animation}`}
                        style={{ '--i': 18, '--j': 1 }}
                    >
                        <input
                            id="up_username"
                            type="text"
                            onChange={props.handleUpUsernameChange}
                            value={props.upUsername || ''}
                        />
                        <label htmlFor="up_username">Username</label>
                        <i className={`${styles.bx} ${styles.bxs_user}`}></i>
                    </div>
                    <div
                        className={`${styles.input_box} ${styles.animation}`}
                        style={{ '--i': 19, '--j': 2 }}
                    >
                        <input
                            id="up_email"
                            type="text"
                            onChange={props.handleUpEmailChange}
                            value={props.upEmail || ''}
                        />
                        <label htmlFor="up_email">E-mail</label>
                        <i className={`${styles.bx} ${styles.bxs_envelope}`}></i>
                    </div>
                    <div
                        className={`${styles.input_box} ${styles.animation}`}
                        style={{ '--i': 20, '--j': 3 }}
                    >
                        <input
                            id="up_password"
                            type="password"
                            onChange={props.handleUpPasswordChange}
                            value={props.upPassword || ''}
                        />
                        <label htmlFor="up_password">Password</label>
                        <i className={`${styles.bx} ${styles.bxs_lock_alt}`}></i>
                    </div>
                    <div
                        className={`${styles.mailing_forgot} ${styles.animation}`}
                        style={{ '--i': 21, '--j': 4 }}
                    >
                        <label htmlFor="notifications">
                            <input
                                id="notifications"
                                type="checkbox"
                                onChange={props.handleNotificationsChange}
                                checked={props.notifications}
                            />
                            Receive e-mail notifications
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={`${styles.btn} ${styles.animation}`}
                        style={{ '--i': 21, '--j': 4 }}
                    >
                        Sign Up
                    </button>
                    <div
                        className={`${styles.logreg_link} ${styles.animation}`}
                        style={{ '--i': 22, '--j': 5 }}
                    >
                        <p>
                            Already have an account?{' '}
                            <button
                                className={styles.login_link}
                                onClick={props.handleRegistrationClick}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </form>
            </div>

            <div className={`${styles.info_text} ${styles.register}`}>
                <h2 className={styles.animation} style={{ '--i': 17, '--j': 0 }}>
                    Welcome to the BookFlix!
                </h2>
                <p className={styles.animation} style={{ '--i': 18, '--j': 1 }}></p>
            </div>
        </div>
    );
};

export default AuthPage;
