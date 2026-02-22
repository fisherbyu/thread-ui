const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
    const componentsPath = path.resolve(__dirname, 'src/components');
    const utilsPath = path.resolve(__dirname, 'src/utils');

    /**
     * Get directories inside src/components
     */
    const getComponentDirs = () =>
        fs
            .readdirSync(componentsPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

    /**
     * Get directories inside src/utils
     */
    const getUtilDirs = () => {
        if (!fs.existsSync(utilsPath)) return [];
        return fs
            .readdirSync(utilsPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
    };

    plop.setGenerator('setup', {
        description: 'Project scaffolding',
        prompts: [
            {
                type: 'list',
                name: 'buildType',
                message: 'What would you like to build?',
                choices: ['Component', 'Util'],
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
                choices: () => [...getUtilDirs(), '+ Create new directory'],
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
        ],

        actions: (answers) => {
            const { buildType } = answers;

            if (buildType === 'Component') {
                const { dirChoice, newDirName, componentName } = answers;

                const parentDir =
                    dirChoice === '+ Create new directory' ? newDirName : dirChoice;
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

                const parentDir =
                    utilDirChoice === '+ Create new directory'
                        ? newUtilDirName
                        : utilDirChoice;
                const kebabName = plop.getHelper('kebabCase')(utilName);
                const basePath = `src/utils/${parentDir}/${kebabName}`;
                const parentIndexPath = `src/utils/${parentDir}/index.ts`;

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
                        data: { itemName: utilName, itemKebab: kebabName },
                    },
                    {
                        type: 'add',
                        path: `${basePath}/index.ts`,
                        templateFile: '.plop-templates/util-index.hbs',
                        data: { itemName: utilName, itemKebab: kebabName },
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

            return [];
        },
    });
};