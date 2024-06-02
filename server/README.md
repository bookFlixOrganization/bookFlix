## Использование Makefile

- **Запуск линтеров**:
  ```sh
  make all-linters
  ```

- **Автоматическое исправление кода с помощью autoflake**:
  ```sh
  make autoflake
  ```

- **Проверка типов с mypy**:
  ```sh
  make mypy
  ```

- **Запуск flake8 для статического анализа кода**:
  ```sh
  make flake8
  ```

- **Запуск pylint для анализа кода**:
  ```sh
  make pylint
  ```

- **Сортировка TOML файлов**:
  ```sh
  make toml-sort
  ```

- **Запуск приложения**:
  ```sh
  make app
  ```

- **Запуск тестов**:
  ```sh
  make pytest
  ```

- **Запуск тестов с покрытием кода**:
  ```sh
  make pytest-cov
  ```