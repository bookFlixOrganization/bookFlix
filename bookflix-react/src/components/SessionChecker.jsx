import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    setId,
    setEmail,
    setSuperuser,
    setIsAuth,
    setRoleId,
    setActive,
    setPreferences,
    setVerified,
    setUsername,
    setIsCheckingAuth,
    logout,
} from '../redux/sessionReducer.js';
import { server } from '../serverconf.js';

const SessionChecker = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isPreferences = useSelector((state) => state.sessionReducer.is_preferences);
    const isAuth = useSelector((state) => state.sessionReducer.is_auth);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`${server}/users/me`);
                const userData = userResponse.data;
                dispatch(setId(userData.id));
                dispatch(setEmail(userData.email));
                dispatch(setActive(userData.is_active));
                dispatch(setSuperuser(userData.is_superuser));
                dispatch(setVerified(userData.is_verified));
                dispatch(setUsername(userData.username));
                dispatch(setRoleId(userData.role_id));
                dispatch(setPreferences(userData.is_preferences));
                dispatch(setIsAuth(true));
                dispatch(setIsCheckingAuth(false));

                // Перенаправление на страницу предпочтений пользователя
                if (!isPreferences && isAuth) {
                    navigate('/preferences');
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
                dispatch(logout());
                navigate('/');
            }
        };

        // Проверяем, есть ли действительный токен в куки
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find((cookie) => cookie.startsWith('auth='));
        const token = authCookie ? authCookie.split('=')[1] : null;

        if (token) {
            fetchUserData();
        } else {
            dispatch(logout());
            navigate('/');
        }
    }, []);

    return null;
};

export default SessionChecker;
