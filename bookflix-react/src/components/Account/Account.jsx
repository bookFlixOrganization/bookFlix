import React from 'react';
import styles from './Account.module.css';

const Account = (props) => {
    const {
        email,
        password,
        handleEditAccEmail,
        handleEditAccPassword,
        toggleShowPassword,
        showPassword,
        handleSubmit,
    } = props;

    return (
        <div className={styles.account_container}>
            <h1>Личный кабинет</h1>
            <form className={styles.account_form}>
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

                <button type="submit" onClick={handleSubmit}>
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
};

export default Account;
