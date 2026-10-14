.DEFAULT_GOAL := help

.PHONY: help up prod down logs logs-backend logs-frontend build ps

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "%-16s %s\n", $$1, $$2}'

up: ## Start the local development stack (uses compose.override.yaml)
	docker compose up --build

prod: ## Start the production-style stack in the background
	docker compose -f compose.yaml up -d --build

down: ## Stop containers while preserving database volumes
	docker compose down

build: ## Build all application images
	docker compose build

logs: ## Follow logs for all services
	docker compose logs -f

logs-backend: ## Follow backend logs
	docker compose logs -f backend

logs-frontend: ## Follow frontend logs
	docker compose logs -f frontend

ps: ## Show service status
	docker compose ps
