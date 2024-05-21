import React from 'react';
import styles from './Account.module.css';

const Account = (props) => {
    const {
        username,
        email,
        password,
        handleEditAccUsername,
        handleEditAccEmail,
        handleEditAccPassword,
        toggleShowPassword,
        showPassword,
    } = props;

    return (
        <div className={styles.account_container}>
            <h1>Личный кабинет</h1>
            <form className={styles.account_form}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleEditAccUsername}
                />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={handleEditAccEmail} />

                <label htmlFor="password">Password:</label>
                <div className={styles.password_input}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={handleEditAccPassword}
                    />
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>

                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default Account;
