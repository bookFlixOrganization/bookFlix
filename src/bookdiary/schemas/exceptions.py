"""
Модуль содержит схемы исключений.
"""

from fastapi import HTTPException, status


class LenghtException(HTTPException):
    """
    Ошибка длинны поля
    """

    def __init__(self, detail: str):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)


class NotFoundException(HTTPException):
    """
    Ошибка не найдено
    """

    def __init__(self, detail: str):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class ConflictException(HTTPException):
    """
    Ошибка со стороны пользователя
    """

    def __init__(self, detail: str):
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail=detail)


class ServerException(HTTPException):
    """
    Ошибка сервера
    """

    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail,
        )


class ForbiddenException(HTTPException):
    """
    Доступ запрещен
    """

    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
        )
