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
                name: 'parentDir',
                message: 'Which components directory?',
                choices: getComponentDirs,
                when: (answers) => answers.buildType === 'Component',
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
            const { parentDir, componentName } = answers;

            const kebabName = plop.getHelper('kebabCase')(componentName);
            const basePath = `src/components/${parentDir}/${kebabName}`;

            return [
                {
                    type: 'add',
                    path: `${basePath}/${kebabName}.types.ts`,
                    templateFile: 'plop-templates/component.types.hbs',
                },
                {
                    type: 'add',
                    path: `${basePath}/${kebabName}.tsx`,
                    templateFile: 'plop-templates/component.tsx.hbs',
                },
                {
                    type: 'add',
                    path: `${basePath}/index.ts`,
                    templateFile: 'plop-templates/index.hbs',
                },
                {
                    type: 'append',
                    path: `src/components/${parentDir}/index.ts`,
                    pattern: /$/,
                    template: `export * from './${kebabName}';`,
                },
            ];
        },
    });
};
