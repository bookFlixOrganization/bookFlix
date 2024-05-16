import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PreferencesCheck = () => {
    const navigate = useNavigate();
    const isPrefences = useSelector((state) => state.sessionReducer.is_preferences);
    const isAuth = useSelector((state) => state.sessionReducer.is_auth);
    useEffect(() => {
        if (!isPrefences && isAuth) {
            navigate('/preferences');
        }
    }, []);

    return null;
};

export default PreferencesCheck;
