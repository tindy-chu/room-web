stage = local prod
.PHONY: $(stage)

$(stage): ## stage=[local, prod], run docker compose with different stage
	@if [ "$(@)" = "local" ]; then\
		export STAGE=local && sh ./script/gen-env.sh && yarn install && rm -rf node_modules/.vite && yarn dev;\
	else\
		docker-compose -f docker-compose.$@.yml build --no-cache;\
		docker-compose -f docker-compose.$@.yml up --remove-orphans --force-recreate;\
	fi

env: ## update env
	@export STAGE=local && sh ./script/gen-env.sh && cd ..

HELP_CMD = grep -E '.*?\#\# .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?\#\# "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
help:
	@${HELP_CMD}