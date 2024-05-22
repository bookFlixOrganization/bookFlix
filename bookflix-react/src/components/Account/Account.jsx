import React from 'react';
import styles from './Account.module.css';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

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
                    <button
                        className={styles.show_password}
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? 'Скрыть' : 'Показать'}
                    </button>
                </div>

                <button type="submit" onClick={handleSubmit}>
                    Сохранить изменения
                </button>
            </form>
            <button
                className={styles.account_edit_prefer}
                onClick={() => navigate('/edit-preferences')}
            >
                Редактировать предпочтения
            </button>
        </div>
    );
};

export default Account;
