SHELL := /bin/bash

.PHONY: install run run-web
install: install-node install-python install-web

all: install run

run:
	bash run_node.bash
	source venv/bin/activate && \
	python3 main.py

run-web:
	cd web/dash-node-explorer && \
	npm start

install-node:
	bash init_dashnode.bash

install-python:
	python3 -m venv venv
	source venv/bin/activate && \
	pip3 install -r requirements.txt

install-web:
	cd web/dash-node-explorer && \
	npm i && \
	npm run build && \
	cd ../..