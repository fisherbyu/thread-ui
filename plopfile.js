const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
    const componentsPath = path.resolve(__dirname, 'src/components');

    /**
     * Get directories inside src/components
     */
    const getComponentDirs = () =>
        fs
            .readdirSync(componentsPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

    plop.setGenerator('setup', {
        description: 'Project scaffolding',
        prompts: [
            {
                type: 'list',
                name: 'buildType',
                message: 'What would you like to build?',
                choices: ['Component'],
            },
            {
                type: 'list',
                name: 'dirChoice',
                message: 'Which components directory?',
                choices: (answers) => [
                    ...getComponentDirs(),
                    '+ Create new directory',
                ],
                when: (answers) => answers.buildType === 'Component',
            },
            {
                type: 'input',
                name: 'newDirName',
                message: 'New directory name (kebab-case):',
                when: (answers) => answers.dirChoice === '+ Create new directory',
                validate: (value) =>
                    /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(value) ||
                    'Directory name must be kebab-case',
            },
            {
                type: 'input',
                name: 'componentName',
                message: 'Component name (PascalCase):',
                validate: (value) =>
                    /^[A-Z][A-Za-z0-9]*$/.test(value) ||
                    'Component name must be PascalCase',
            },
        ],
        actions: (answers) => {
            const { dirChoice, newDirName, componentName } = answers;

            // Determine parent directory (either selected or new)
            const parentDir = dirChoice === '+ Create new directory'
                ? newDirName
                : dirChoice;

            const kebabName = plop.getHelper('kebabCase')(componentName);
            const basePath = `src/components/${parentDir}/${kebabName}`;
            const parentIndexPath = `src/components/${parentDir}/index.ts`;

            const actions = [];

            // Create parent directory index.ts if it doesn't exist
            actions.push({
                type: 'add',
                path: parentIndexPath,
                templateFile: '.plop-templates/parent-index.hbs',
                skipIfExists: true,
            });

            // Create component files
            actions.push(
                {
                    type: 'add',
                    path: `${basePath}/${kebabName}.types.ts`,
                    templateFile: '.plop-templates/component.types.hbs',
                },
                {
                    type: 'add',
                    path: `${basePath}/${kebabName}.tsx`,
                    templateFile: '.plop-templates/component.tsx.hbs',
                },
                {
                    type: 'add',
                    path: `${basePath}/index.ts`,
                    templateFile: '.plop-templates/index.hbs',
                }
            );

            // Append export to parent index.ts
            actions.push({
                type: 'append',
                path: parentIndexPath,
                pattern: /$/,
                template: `export * from './${kebabName}';`,
            });

            return actions;
        },
    });
};