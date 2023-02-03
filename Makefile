.PHONY: help build up down restart
.DEFAULT_GOAL := help

CONTAINER=assignment-one

ifneq ("$(wildcard ~/.docker/cli-plugins/docker-compose)","")
COMPOSE = docker compose
else
COMPOSE = docker-compose
endif

COMPOSE := $(COMPOSE) -f docker-compose.yml
EXEC = $(COMPOSE) exec $(CONTAINER)

## Show this help
help:
	@echo "$$(tput bold)Available command:$$(tput sgr0)";echo;sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' sort -f|awk -F --- -v n=$$(tput cols) -v i=19 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"%s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n%*s ",-i," ";}printf"%s ",w[j];}printf"\n";}'|more $(shell test $(shell uname) == Darwin && echo '-Xr')

## Build or rebuild services, run install scripts, and and start containers.
build:
	$(COMPOSE) up --build -d

## Create and start containers.
up:
	$(COMPOSE) up -d

## Stop and remove containers, volumes and networks.
down:
	$(COMPOSE) down --remove-orphans
	docker volume rm assignment-one_server_node_modules

## Restart containers.
restart:
	$(MAKE) restart