from fastapi_users.authentication import CookieTransport, AuthenticationBackend
from fastapi_users.authentication import JWTStrategy

from src.config.project_config import settings

cookie_transport = CookieTransport(cookie_name="auth", cookie_max_age=3600, cookie_httponly=False)


def get_jwt_strategy() -> JWTStrategy:
    """
    Эта функция возвращает экземпляр JWTStrategy для аутентификации.

    Parameters:
    None

    Returns:
    JWTStrategy:Экземпляр JWTStrategy с предоставленным параметром SECRET и временем жизни в секундах.

    Raises:
    None

    Note:
    JWTStrategy используется для аутентификации на основе JWT (JSON Web Tokens).
    SECRET используется для подписи и проверки токенов JWT.
    Параметр lifetime_seconds указывает продолжительность действия токена JWT.
    """
    return JWTStrategy(secret=settings.SECRET, lifetime_seconds=14400)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)
