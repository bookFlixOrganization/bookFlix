POETRY_EXEC=poetry
PYTHON_EXEC = $(POETRY_EXEC) run python
TOML_FILES=poetry.lock pyproject.toml
MYPY_OPTS = --ignore-missing-imports
LINTER_DIRS=src main.py migrations tests
FORMAT_DIRS=src main.py migrations tests
AUTOFLAKE_OPTS = -i -r --verbose --ignore-init-module-imports --remove-all-unused-imports --expand-star-imports
APP_FILE = docker_compose/app.yaml
DB = docker_compose/storage.yaml


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

all:
	docker-compose -f ${APP_FILE} -f ${DB} up --build -d

app-start:
	docker-compose -f $(APP_FILE) up -d

app-down:
	docker-compose -f $(APP_FILE) down && docker network prune --force

app-logs:
	docker-compose -f ${APP_FILE} logs -f

db-up:
	docker-compose -f ${DB} up -d

db-down:
	docker-compose -f ${DB} down && docker network prune --force

all-down:
	docker-compose -f ${APP_FILE} -f ${DB} down && docker network prune --force

app:
	python main.py

pytest:
	pytest -vv -s tests/

pytest-cov:
	pytest --cov=src -vv tests/

.PHONY: all all-linters mypy flake8 pylint clean sort-toml autoflake app-start app-drop app-logs db-up db-down all-down app pytest