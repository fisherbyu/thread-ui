const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
    const componentsPath = path.resolve(__dirname, 'src/components');
    const utilsPath = path.resolve(__dirname, 'src/utils');
    const hooksPath = path.resolve(__dirname, 'src/hooks');
    const readmePath = path.resolve(__dirname, 'README.md');

    const getComponentDirs = () =>
        fs.readdirSync(componentsPath, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name);

    const getDirs = (dirPath) => {
        if (!fs.existsSync(dirPath)) return [];
        return fs.readdirSync(dirPath, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name);
    };

    const buildSimpleActions = ({ basePath, parentIndexPath, kebabName, itemName }) => {
        const actions = [];

        actions.push({
            type: 'add',
            path: parentIndexPath,
            templateFile: '.plop-templates/parent-index.hbs',
            skipIfExists: true,
        });

        actions.push(
            {
                type: 'add',
                path: `${basePath}/${kebabName}.ts`,
                templateFile: '.plop-templates/util.hbs',
                data: { itemName, itemKebab: kebabName },
            },
            {
                type: 'add',
                path: `${basePath}/index.ts`,
                templateFile: '.plop-templates/util-index.hbs',
                data: { itemName, itemKebab: kebabName },
            }
        );

        actions.push({
            type: 'append',
            path: parentIndexPath,
            pattern: /$/,
            template: `export * from './${kebabName}';`,
        });

        return actions;
    };

    // --- Normalize a string for loose matching ---
    const normalize = (str) => str.toLowerCase().replace(/[-_]/g, ' ').trim();

    // --- Find the ### section header under ## Components that best matches dirName ---
    const findComponentSection = (readmeContent, dirName) => {
        const normalizedDir = normalize(dirName);

        // Collect all ### headers that fall under ## Components
        const componentBlockMatch = readmeContent.match(/^## Components$([\s\S]*?)^## /m);
        if (!componentBlockMatch) return null;

        const componentBlock = componentBlockMatch[1];
        const sectionHeaders = [...componentBlock.matchAll(/^### (.+)$/gm)].map((m) => m[1]);

        // Find the first header whose normalized text contains the normalized dir name
        const match = sectionHeaders.find((header) =>
            normalize(header).includes(normalizedDir) || normalizedDir.includes(normalize(header))
        );

        return match || null;
    };

    // --- Parse the backtick list line under a given ### header ---
    const parseReadmeListLine = (readmeContent, sectionHeader) => {
        // Match the line of backtick items directly after the header
        const pattern = new RegExp(`^### ${sectionHeader}\\n+(.*?)$`, 'm');
        const match = readmeContent.match(pattern);
        if (!match) return null;

        const line = match[1];
        const items = [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
        return { line, items };
    };

    // --- Build a sorted backtick list line from an array of names ---
    const buildListLine = (items) =>
        items
            .slice()
            .sort((a, b) => a.localeCompare(b))
            .map((name) => `\`${name}\``)
            .join(' ');

    // --- Register custom action type ---
    plop.setActionType('updateReadme', (answers, config) => {
        const { itemName, sectionDir } = config;

        let readme = fs.readFileSync(readmePath, 'utf8');

        if (sectionDir) {
            // Component path: find the right ### subsection
            const sectionHeader = findComponentSection(readme, sectionDir);
            if (!sectionHeader) {
                throw new Error(
                    `Could not find a matching ### section for directory "${sectionDir}" in README.md`
                );
            }

            const parsed = parseReadmeListLine(readme, sectionHeader);
            if (!parsed) {
                throw new Error(
                    `Could not find a backtick list line under "### ${sectionHeader}" in README.md`
                );
            }

            const updatedLine = buildListLine([...parsed.items, itemName]);
            readme = readme.replace(parsed.line, updatedLine);
        } else {
            // Flat list path: hooks (and future flat sections)
            // Find the section header passed via config.flatSection e.g. '## Hooks'
            const flatSection = config.flatSection || '## Hooks';
            const pattern = new RegExp(`^${flatSection}\\n+(.*?)$`, 'm');
            const match = readme.match(pattern);

            if (!match) {
                throw new Error(`Could not find "${flatSection}" in README.md`);
            }

            const line = match[1];
            const items = [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
            const updatedLine = buildListLine([...items, itemName]);
            readme = readme.replace(line, updatedLine);
        }

        fs.writeFileSync(readmePath, readme, 'utf8');
        return `README.md updated with \`${itemName}\``;
    });

    plop.setGenerator('setup', {
        description: 'Project scaffolding',
        prompts: [
            {
                type: 'list',
                name: 'buildType',
                message: 'What would you like to build?',
                choices: ['Component', 'Util', 'Hook'],
            },

            // --- Component prompts ---
            {
                type: 'list',
                name: 'dirChoice',
                message: 'Which components directory?',
                choices: () => [...getComponentDirs(), '+ Create new directory'],
                when: (answers) => answers.buildType === 'Component',
            },
            {
                type: 'input',
                name: 'newDirName',
                message: 'New directory name (kebab-case):',
                when: (answers) =>
                    answers.buildType === 'Component' &&
                    answers.dirChoice === '+ Create new directory',
                validate: (value) =>
                    /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(value) ||
                    'Directory name must be kebab-case',
            },
            {
                type: 'input',
                name: 'componentName',
                message: 'Component name (PascalCase):',
                when: (answers) => answers.buildType === 'Component',
                validate: (value) =>
                    /^[A-Z][A-Za-z0-9]*$/.test(value) ||
                    'Component name must be PascalCase',
            },

            // --- Util prompts ---
            {
                type: 'list',
                name: 'utilDirChoice',
                message: 'Which utils directory?',
                choices: () => [...getDirs(utilsPath), '+ Create new directory'],
                when: (answers) => answers.buildType === 'Util',
            },
            {
                type: 'input',
                name: 'newUtilDirName',
                message: 'New directory name (kebab-case):',
                when: (answers) =>
                    answers.buildType === 'Util' &&
                    answers.utilDirChoice === '+ Create new directory',
                validate: (value) =>
                    /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(value) ||
                    'Directory name must be kebab-case',
            },
            {
                type: 'input',
                name: 'utilName',
                message: 'Util name (camelCase):',
                when: (answers) => answers.buildType === 'Util',
                validate: (value) =>
                    /^[a-z][a-zA-Z0-9]*$/.test(value) || 'Util name must be camelCase',
            },

            // --- Hook prompts ---
            // TODO: Subdirectory support - when hooks grow, uncomment these two prompts:
            // {
            //     type: 'list',
            //     name: 'hookDirChoice',
            //     message: 'Which hooks directory?',
            //     choices: () => [...getDirs(hooksPath), '+ Create new directory'],
            //     when: (answers) => answers.buildType === 'Hook',
            // },
            // {
            //     type: 'input',
            //     name: 'newHookDirName',
            //     message: 'New directory name (kebab-case):',
            //     when: (answers) =>
            //         answers.buildType === 'Hook' &&
            //         answers.hookDirChoice === '+ Create new directory',
            //     validate: (value) =>
            //         /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(value) ||
            //         'Directory name must be kebab-case',
            // },
            {
                type: 'input',
                name: 'hookName',
                message: 'Hook name (camelCase, e.g. useMyHook):',
                when: (answers) => answers.buildType === 'Hook',
                validate: (value) =>
                    /^use[A-Z][a-zA-Z0-9]*$/.test(value) ||
                    'Hook name must be camelCase starting with "use"',
            },
        ],

        actions: (answers) => {
            const { buildType } = answers;

            if (buildType === 'Component') {
                const { dirChoice, newDirName, componentName } = answers;
                const parentDir = dirChoice === '+ Create new directory' ? newDirName : dirChoice;
                const kebabName = plop.getHelper('kebabCase')(componentName);
                const basePath = `src/components/${parentDir}/${kebabName}`;
                const parentIndexPath = `src/components/${parentDir}/index.ts`;
                const actions = [];

                actions.push({
                    type: 'add',
                    path: parentIndexPath,
                    templateFile: '.plop-templates/parent-index.hbs',
                    skipIfExists: true,
                });

                actions.push(
                    {
                        type: 'add',
                        path: `${basePath}/${kebabName}.types.ts`,
                        templateFile: '.plop-templates/component.types.hbs',
                        data: { itemName: componentName, itemKebab: kebabName },
                    },
                    {
                        type: 'add',
                        path: `${basePath}/${kebabName}.tsx`,
                        templateFile: '.plop-templates/component.tsx.hbs',
                        data: { itemName: componentName, itemKebab: kebabName },
                    },
                    {
                        type: 'add',
                        path: `${basePath}/index.ts`,
                        templateFile: '.plop-templates/component-index.hbs',
                        data: { itemName: componentName, itemKebab: kebabName },
                    },
                    {
                        type: 'add',
                        path: `${basePath}/${kebabName}.stories.tsx`,
                        templateFile: '.plop-templates/component.stories.hbs',
                        data: { itemName: componentName, itemKebab: kebabName },
                    }
                );

                actions.push({
                    type: 'append',
                    path: parentIndexPath,
                    pattern: /$/,
                    template: `export * from './${kebabName}';`,
                });

                actions.push({
                    type: 'updateReadme',
                    itemName: componentName,
                    sectionDir: parentDir,
                });

                return actions;
            }

            if (buildType === 'Util') {
                const { utilDirChoice, newUtilDirName, utilName } = answers;
                const parentDir = utilDirChoice === '+ Create new directory' ? newUtilDirName : utilDirChoice;
                const kebabName = plop.getHelper('kebabCase')(utilName);

                return buildSimpleActions({
                    basePath: `src/utils/${parentDir}/${kebabName}`,
                    parentIndexPath: `src/utils/${parentDir}/index.ts`,
                    kebabName,
                    itemName: utilName,
                });
            }

            if (buildType === 'Hook') {
                const { hookName } = answers;
                const kebabName = plop.getHelper('kebabCase')(hookName);
                const basePath = `src/hooks/${kebabName}`;

                // TODO: Subdirectory support - when hooks grow, replace this entire block with:
                // const { hookName, hookDirChoice, newHookDirName } = answers;
                // const parentDir = hookDirChoice === '+ Create new directory' ? newHookDirName : hookDirChoice;
                // const kebabName = plop.getHelper('kebabCase')(hookName);
                // return buildSimpleActions({
                //     basePath: `src/hooks/${parentDir}/${kebabName}`,
                //     parentIndexPath: `src/hooks/${parentDir}/index.ts`,
                //     kebabName,
                //     itemName: hookName,
                // });
                // also update the updateReadme action below:
                // sectionDir: parentDir,
                // flatSection: undefined,

                return [
                    {
                        type: 'add',
                        path: `src/hooks/index.ts`,
                        templateFile: '.plop-templates/parent-index.hbs',
                        skipIfExists: true,
                    },
                    {
                        type: 'add',
                        path: `${basePath}/${kebabName}.ts`,
                        templateFile: '.plop-templates/util.hbs',
                        data: { itemName: hookName, itemKebab: kebabName },
                    },
                    {
                        type: 'add',
                        path: `${basePath}/index.ts`,
                        templateFile: '.plop-templates/util-index.hbs',
                        data: { itemName: hookName, itemKebab: kebabName },
                    },
                    {
                        type: 'append',
                        path: `src/hooks/index.ts`,
                        pattern: /$/,
                        template: `export * from './${kebabName}';`,
                    },
                    {
                        type: 'updateReadme',
                        itemName: hookName,
                        sectionDir: null,
                        flatSection: '## Hooks',
                    },
                ];
            }

            return [];
        },
    });
};