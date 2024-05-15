import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PreferencesCheck = () => {
    const navigate = useNavigate();
    const isPrefences = useSelector((state) => state.sessionReducer.is_preferences);
    useEffect(() => {
        if (!isPrefences) {
            navigate('/preferences');
        }
    }, []);

    return null;
};

export default PreferencesCheck;
