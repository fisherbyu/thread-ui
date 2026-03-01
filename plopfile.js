const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
    const componentsPath = path.resolve(__dirname, 'src/components');
    const utilsPath = path.resolve(__dirname, 'src/utils');
    const hooksPath = path.resolve(__dirname, 'src/hooks');

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
                ];
            }

            return [];
        },
    });
};