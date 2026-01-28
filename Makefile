# ===============================
# Makefile for openai-node-chatgpt-demo
# Kenyon CS
# ===============================

APP_NAME = openai-node-chatgpt-demo
ENTRY = server.js

.DEFAULT_GOAL := help

help:
	@echo ""
	@echo "Required:"
	@echo "  make run PORT=4xxx"
	@echo ""
	@echo "Targets:"
	@echo "  make install        Install npm dependencies"
	@echo "  make run PORT=xxxx  Run server on assigned port"
	@echo "  make dev PORT=xxxx  Run with nodemon"
	@echo "  make clean          Remove node_modules"
	@echo ""

# -------------------------------
# Setup
# -------------------------------
install:
	npm install

checkenv:
	@if [ ! -f .env ]; then \
		echo "ERROR: .env file not found."; \
		echo "Create .env with OPENAI_API_KEY=your_key_here"; \
		exit 1; \
	fi

checkport:
	@if [ -z "$(PORT)" ]; then \
		echo "ERROR: PORT not specified."; \
		echo "Usage: make run PORT=4101"; \
		exit 1; \
	fi

# -------------------------------
# Run targets
# -------------------------------
run: checkenv checkport
	PORT=$(PORT) node $(ENTRY)

dev: checkenv checkport
	PORT=$(PORT) npx nodemon $(ENTRY)

# -------------------------------
# Cleanup
# -------------------------------
clean:
	rm -rf node_modules
