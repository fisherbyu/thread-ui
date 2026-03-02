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

# Directories
DIST_DIR := dist
SRC_DIR := src
STYLED_SYSTEM_SRC := $(SRC_DIR)/styled-system
STYLED_SYSTEM_DIST := $(DIST_DIR)/styled-system
STYLES_SRC := $(SRC_DIR)/styles
STYLES_DIST := $(DIST_DIR)/styles
SCRIPTS_DIR := .scripts

# Files
PANDA_CSS := $(STYLES_SRC)/panda.css
STYLES_CSS := $(STYLES_SRC)/styles.css
THREAD_CSS := $(STYLES_SRC)/thread.css

# Default target
.DEFAULT_GOAL := help

# Internal Helpers
.PHONY: clean
clean: # Remove previous build
	rm -rf $(DIST_DIR)

.PHONY: prepare-panda-code
prepare-panda-code: # Generate Panda CSS codegen and copy to dist
	$(PANDA) codegen
	mkdir -p $(DIST_DIR)
	cp -r $(STYLED_SYSTEM_SRC) $(STYLED_SYSTEM_DIST)

.PHONY: prepare-panda-css
prepare-panda-css: # Generate Panda CSS output file
	$(PANDA) cssgen --outfile $(PANDA_CSS)

$(DIST_DIR):
	mkdir -p $(DIST_DIR)

$(STYLES_DIST):
	mkdir -p $(STYLES_DIST)

.PHONY: build-css
build-css: | $(STYLES_DIST) # Build and copy CSS files
	$(POSTCSS) $(STYLES_CSS) -o $(STYLES_DIST)/styles.css
	cp $(THREAD_CSS) $(STYLES_DIST)/thread.css
	cp $(PANDA_CSS) $(STYLES_DIST)/panda.css

.PHONY: prepare-typescript
prepare-typescript: prepare-panda-code # Compile TypeScript into JavaScript
	$(TSC)
	$(TSC_ALIAS)

# Developer Helpers
.PHONY: watch
watch: # Watch CSS files. Use CSS=tailwind|panda to limit (default: both)
	@if [ "$(CSS)" = "tailwind" ]; then \
		$(TAILWIND) -i $(STYLES_CSS) -o $(STYLES_CSS) --watch; \
	elif [ "$(CSS)" = "panda" ]; then \
		$(CONCURRENTLY) "$(PANDA) --watch" "$(PANDA) cssgen --outfile $(PANDA_CSS) --watch"; \
	else \
		$(CONCURRENTLY) \
			"$(TAILWIND) -i $(STYLES_CSS) -o $(STYLES_CSS) --watch" \
			"$(PANDA) --watch" \
			"$(PANDA) cssgen --outfile $(PANDA_CSS) --watch"; \
	fi

.PHONY: theme-css
theme-css: ## Generate theme CSS from TypeScript
	$(TSX) $(SCRIPTS_DIR)/generate-default-theme-css.scripts.ts
	$(PRETTIER) --write src/styles/thread.css

.PHONY: new-item
new-item: ## Generate New Items using Plop.js
	$(PLOP)

# Build Targets
.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: storybook
storybook: prepare-panda-code ## Run Storybook dev server (with Panda and Tailwind watch)
	$(CONCURRENTLY) "make watch" "$(STORYBOOK) dev -p 6006"

.PHONY: build
build: clean prepare-panda-code theme-css prepare-typescript prepare-panda-css build-css ## Full build pipeline
	@echo "Build complete!"

.PHONY: weave
weave: build ## Build and push to yalc
	$(NPX) yalc push


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
	new_version=$$(node -p "require('./package.json').version"); \
	echo ""; \
	echo "⚠️  Publishing thread-ui@$$new_version to npm"; \
	read -p "Continue? [y/N]: " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		npm publish; \
		echo "✅ Published thread-ui@$$new_version successfully!"; \
	else \
		echo "❌ Publish cancelled. Version was bumped in package.json but not published."; \
		exit 1; \
	fi
endef

.PHONY: do_publish_internal
do_publish_internal:
	@$(call do_publish,$(VERSION_TYPE))