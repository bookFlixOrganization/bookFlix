POETRY_EXEC=poetry
PYTHON_EXEC = $(POETRY_EXEC) run python
TOML_FILES=poetry.lock pyproject.toml
MYPY_OPTS = --ignore-missing-imports
LINTER_DIRS=src main.py migrations tests
FORMAT_DIRS=src main.py migrations tests
AUTOFLAKE_OPTS = -i -r --verbose --ignore-init-module-imports --remove-all-unused-imports --expand-star-imports


all-linters: autoflake flake8 pylint mypy

autoflake:
	$(PYTHON_EXEC) -m autoflake $(AUTOFLAKE_OPTS) $(FORMAT_DIRS)

mypy:
	$(POETRY_EXEC) run mypy --show-error-codes --python-version=3.11 $(LINTER_DIRS)

flake8:
	$(POETRY_EXEC) run flake8 --jobs 4 --statistics --show-source $(LINTER_DIRS)

pylint:
	$(POETRY_EXEC) run pylint --jobs 4 --rcfile=setup.cfg --extension-pkg-whitelist='pydantic' $(LINTER_DIRS)

toml-sort:
	$(POETRY_EXEC) run toml-sort $(TOML_FILES) -i -a

app:
	python main.py

pytest:
	pytest -vv -s tests/

pytest-cov:
	pytest --cov=src -vv tests/src_test

.PHONY: all all-linters mypy flake8 pylint clean sort-toml autoflake app-start app-drop app-logs db-up db-down all-down app pytest