#Makefile для проекта на Python

#Переменные
PYTHON_SRC = $(shell find . -name "*.py")
TOML_SRC = $(shell find . -name "*.toml")
MYPY_OPTS = --ignore-missing-imports
FLAKE8_OPTS =
PYLINT_OPTS = --disable=all --enable=F,E,W,R --disable=import-error --output-format=colorized
AUTOFLAKE_OPTS = --in-place --remove-all-unused-imports --remove-unused-variables --expand-star-imports
APP_FILE = docker_compose/app.yaml

#Цели
all-linters: autoflake mypy flake8 pylint

autoflake:
	autoflake $(AUTOFLAKE_OPTS) $(PYTHON_SRC)

mypy:
	mypy $(MYPY_OPTS) $(PYTHON_SRC)

flake8:
	flake8 $(FLAKE8_OPTS) $(PYTHON_SRC)

pylint:
	pylint $(PYLINT_OPTS) $(PYTHON_SRC)

clean:
	find . -name "*.pyc" -exec rm -f {} \;
	rm -rf pycache

sort-toml:
	for file in $(TOML_SRC);
	do toml-sort $$file > $$file.tmp;
	mv $$file.tmp $$file;
	done

all:
	docker-compose -f ${APP_FILE} up --build -d

app-start:
	docker-compose -f $(APP_FILE) up -d

app-drop:
	docker-compose -f $(APP_FILE) down

app-logs:
	docker-compose -f ${APP_FILE} logs -f



.PHONY: all all-linters mypy flake8 pylint clean sort-toml autoflake app-start app-drop app-logs