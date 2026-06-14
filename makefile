# Variables - Use npx to run local node_modules binaries
NPX := npx
PANDA := $(NPX) panda
TSC := $(NPX) tsc
TSC_ALIAS := $(NPX) tsc-alias
POSTCSS := $(NPX) postcss
TAILWIND := $(NPX) tailwindcss
STORYBOOK := $(NPX) storybook
CONCURRENTLY := $(NPX) concurrently
TSX := $(NPX) tsx
PRETTIER := $(NPX) prettier
PLOP := $(NPX) plop
ESLINT := $(NPX) eslint
HTTP_SERVER := http-server

# Directories
DIST_DIR := dist
SRC_DIR := src
STYLED_SYSTEM_SRC := $(SRC_DIR)/styled-system
STYLED_SYSTEM_DIST := $(DIST_DIR)/styled-system
STYLES_SRC := $(SRC_DIR)/styles
STYLES_DIST := $(DIST_DIR)/styles
SCRIPTS_DIR := .scripts
STATIC_STORYBOOK := .storybook/.static

# File names
THEME_CSS_FILE := theme.css
PANDA_CSS_FILE := panda.css
STYLES_CSS_FILE := tailwind.css
THREAD_CSS_FILE := thread.css
THEME_SCRIPT := $(SCRIPTS_DIR)/generate-default-theme-css.scripts.ts
PACKAGE_JSON := package.json

# Package
PACKAGE_NAME := thread-ui

# Storybook
STORYBOOK_PORT := 6006

# Default target
.DEFAULT_GOAL := help

# Internal Helpers
.PHONY: clean
clean: # Remove previous build
	rm -rf $(DIST_DIR)
	
.PHONY: clean-storybook-build
clean-storybook-build: # Remove previous storybook build
	rm -rf $(STATIC_STORYBOOK)

.PHONY: prepare-panda-code
prepare-panda-code: # Generate Panda CSS codegen and copy to dist
	rm -rf $(STYLED_SYSTEM_SRC)
	$(PANDA) codegen
	mkdir -p $(DIST_DIR)
	cp -r $(STYLED_SYSTEM_SRC) $(STYLED_SYSTEM_DIST)

.PHONY: prepare-panda-css
prepare-panda-css: # Generate Panda CSS output file
	$(PANDA) cssgen --outfile $(STYLES_SRC)/$(PANDA_CSS_FILE)

$(DIST_DIR):
	mkdir -p $(DIST_DIR)

$(STYLES_DIST):
	mkdir -p $(STYLES_DIST)
	
.PHONY: generate-thread-css-export
generate-thread-css-export: # Generate the CSS export file from variables
	@printf "@import './$(THEME_CSS_FILE)';\n@import './$(PANDA_CSS_FILE)';\n@import './$(STYLES_CSS_FILE)';\n" > $(STYLES_SRC)/$(THREAD_CSS_FILE)

.PHONY: build-css
build-css: generate-thread-css-export | $(STYLES_DIST) # Build and copy CSS files
	$(POSTCSS) $(STYLES_SRC)/$(STYLES_CSS_FILE) -o $(STYLES_DIST)/$(STYLES_CSS_FILE)
	cp $(STYLES_SRC)/$(THEME_CSS_FILE) $(STYLES_DIST)/$(THEME_CSS_FILE)
	cp $(STYLES_SRC)/$(PANDA_CSS_FILE) $(STYLES_DIST)/$(PANDA_CSS_FILE)
	cp $(STYLES_SRC)/$(THREAD_CSS_FILE) $(STYLES_DIST)/$(THREAD_CSS_FILE)

.PHONY: prepare-typescript
prepare-typescript: prepare-panda-code # Compile TypeScript into JavaScript
	$(TSC)
	$(TSC_ALIAS)

# Developer Helpers
.PHONY: watch
watch: # Watch CSS files. Use CSS=tailwind|panda to limit (default: both)
	@if [ "$(CSS)" = "tailwind" ]; then \
		$(TAILWIND) -i $(STYLES_SRC)/$(STYLES_CSS_FILE) -o $(STYLES_SRC)/$(STYLES_CSS_FILE) --watch; \
	elif [ "$(CSS)" = "panda" ]; then \
		$(CONCURRENTLY) "$(PANDA) --watch" "$(PANDA) cssgen --outfile $(STYLES_SRC)/$(PANDA_CSS_FILE) --watch"; \
	else \
		$(CONCURRENTLY) \
			"$(TAILWIND) -i $(STYLES_SRC)/$(STYLES_CSS_FILE) -o $(STYLES_SRC)/$(STYLES_CSS_FILE) --watch" \
			"$(PANDA) --watch" \
			"$(PANDA) cssgen --outfile $(STYLES_SRC)/$(PANDA_CSS_FILE) --watch"; \
	fi

.PHONY: theme-css
theme-css: ## Generate theme CSS from TypeScript
	$(TSX) $(THEME_SCRIPT) --out $(STYLES_SRC)/$(THEME_CSS_FILE)
	$(PRETTIER) --write $(STYLES_SRC)/$(THEME_CSS_FILE)

.PHONY: new-item
new-item: ## Generate New Items using Plop.js
	$(PLOP)

.PHONY: lint
lint: # Lint and auto-fix source files
	$(ESLINT) $(SRC_DIR) --fix

.PHONY: lint-check
lint-check: # Lint without auto-fix (for CI/build)
	$(ESLINT) $(SRC_DIR)

.PHONY: prettier
prettier: # Format source files with Prettier
	$(PRETTIER) --write $(SRC_DIR) --log-level warn

.PHONY: prettier-check
prettier-check: # Check Prettier formatting without writing (for CI/build)
	$(PRETTIER) --check $(SRC_DIR) --log-level warn

.PHONY: format
format: lint prettier ## Run ESLint --fix and Prettier --write on source files

.PHONY: format-check
format-check: # Run lint and prettier checks without writing (for CI/build)
	@$(MAKE) lint-check
	@$(MAKE) prettier-check

# Build Targets
.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: storybook
storybook: prepare-panda-code theme-css ## Run Storybook dev server (with Panda and Tailwind watch)
	$(CONCURRENTLY) "make watch" "$(STORYBOOK) dev -p $(STORYBOOK_PORT) --no-open"

.PHONY: build
build: clean format-check prepare-panda-code theme-css prepare-typescript prepare-panda-css build-css ## Full build pipeline	@echo "Build complete!"

.PHONY: weave
weave: build ## Build and push to yalc
	$(NPX) yalc push

.PHONY: storybook-build
storybook-build: clean-storybook-build build ## Build Static Storybook Server
	$(NPX) $(STORYBOOK) build -o $(STATIC_STORYBOOK) 
	
.PHONY: storybook-run
storybook-run: ## Start Storybook Server
	$(NPX) $(HTTP_SERVER) $(STATIC_STORYBOOK)


# Publish Package to npm
.PHONY: npm-login-check
npm-login-check: # Ensure user is logged in to npm before publishing
	@echo "🔐 Checking npm login status..."; \
	if ! npm whoami > /dev/null 2>&1; then \
		echo "Not logged in. Running npm login..."; \
		npm login; \
	else \
		echo "✅ Logged in as $$(npm whoami)"; \
	fi

.PHONY: publish publish.patch publish.minor publish.major
publish: npm-login-check build ## Build and publish to npm (interactive)
	@$(call do_publish_prompt)

publish.patch: npm-login-check build ## Build and publish patch version (1.0.0 → 1.0.1)
	@$(call do_publish,patch)

publish.minor: npm-login-check build ## Build and publish minor version (1.0.0 → 1.1.0)
	@$(call do_publish,minor)

publish.major: npm-login-check build ## Build and publish major version (1.0.0 → 2.0.0)
	@$(call do_publish,major)

define do_publish_prompt
	echo "Select version bump:"; \
	echo "  1) patch (1.0.0 → 1.0.1) - bug fixes"; \
	echo "  2) minor (1.0.0 → 1.1.0) - new features"; \
	echo "  3) major (1.0.0 → 2.0.0) - breaking changes"; \
	read -p "Choice [1]: " choice; \
	choice=$${choice:-1}; \
	case $$choice in \
		1) version_type="patch" ;; \
		2) version_type="minor" ;; \
		3) version_type="major" ;; \
		*) echo "❌ Invalid choice"; exit 1 ;; \
	esac; \
	$(MAKE) do_publish_internal VERSION_TYPE=$$version_type
endef

define do_publish
	npm version $(1); \
	new_version=$$(node -p "require('./$(PACKAGE_JSON)').version"); \
	echo ""; \
	echo "⚠️  Publishing $(PACKAGE_NAME)@$$new_version to npm"; \
	read -p "Continue? [y/N]: " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		npm publish; \
		echo "✅ Published $(PACKAGE_NAME)@$$new_version successfully!"; \
	else \
		echo "❌ Publish cancelled. Version was bumped in $(PACKAGE_JSON) but not published."; \
		exit 1; \
	fi
endef

.PHONY: do_publish_internal
do_publish_internal:
	@$(call do_publish,$(VERSION_TYPE))