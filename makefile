# Variables - Use npx to run local node_modules binaries
NPX := npx
PANDA := $(NPX) panda
TSC := $(NPX) tsc
TSC_ALIAS := $(NPX) tsc-alias
POSTCSS := $(NPX) postcss
TAILWIND := $(NPX) tailwindcss
STORYBOOK := $(NPX) storybook
JEST := $(NPX) jest
CONCURRENTLY := $(NPX) concurrently

# Directories
DIST_DIR := dist
SRC_DIR := src
STYLED_SYSTEM_SRC := $(SRC_DIR)/styled-system
STYLED_SYSTEM_DIST := $(DIST_DIR)/styled-system
STYLES_SRC := $(SRC_DIR)/styles
STYLES_DIST := $(DIST_DIR)/styles

# Files
PANDA_CSS := $(STYLES_SRC)/panda.css
STYLES_CSS := $(STYLES_SRC)/styles.css
THREAD_CSS := $(STYLES_SRC)/thread.css

# Default target
.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: ## Remove build artifacts
	rm -rf $(DIST_DIR)

.PHONY: panda-prepare
panda-prepare: ## Generate Panda CSS codegen
	$(PANDA) codegen

.PHONY: panda-css
panda-css: ## Generate Panda CSS output file
	$(PANDA) cssgen --outfile $(PANDA_CSS)

$(STYLED_SYSTEM_DIST): $(STYLED_SYSTEM_SRC) | $(DIST_DIR)
	cp -r $(STYLED_SYSTEM_SRC) $(STYLED_SYSTEM_DIST)

$(DIST_DIR):
	mkdir -p $(DIST_DIR)

$(STYLES_DIST):
	mkdir -p $(STYLES_DIST)

.PHONY: typescript
typescript: panda-prepare ## Compile TypeScript
	$(TSC)
	$(TSC_ALIAS)

.PHONY: build-css
build-css: | $(STYLES_DIST) ## Build and copy CSS files
	$(POSTCSS) $(STYLES_CSS) -o $(STYLES_DIST)/styles.css
	cp $(THREAD_CSS) $(STYLES_DIST)/thread.css
	cp $(PANDA_CSS) $(STYLES_DIST)/panda.css

.PHONY: build
build: clean panda-prepare typescript $(STYLED_SYSTEM_DIST) panda-css build-css ## Full build pipeline
	@echo "Build complete!"

.PHONY: watch-tailwind
watch-tailwind: ## Watch and build Tailwind CSS
	$(TAILWIND) -i $(STYLES_CSS) -o $(STYLES_CSS) --watch

.PHONY: test
test: ## Run Jest tests
	$(JEST)

.PHONY: storybook
storybook: ## Run Storybook dev server (with Tailwind watch)
	$(CONCURRENTLY) "make watch-tailwind" "$(STORYBOOK) dev -p 6006"

.PHONY: storybook-build
storybook-build: ## Build Storybook
	$(STORYBOOK) build

.PHONY: pack
pack: ## Create npm package
	npm pack

.PHONY: pack-dev
pack-dev: build ## Build and pack for development
	npm pack
	mkdir -p $(DIST_DIR)
	mv thread-ui-*.tgz $(DIST_DIR)/

.PHONY: prepare-publish
prepare-publish: build ## Prepare for publishing

.PHONY: weave
weave: prepare-publish ## Build and push to yalc
	$(NPX) yalc push

# Development helpers
.PHONY: dev
dev: clean build ## Clean build for development

.PHONY: watch
watch: watch-tailwind ## Alias for watch-tailwind