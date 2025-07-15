module.exports = {
    plugins: {
        '@pandacss/dev/postcss': {},
        tailwindcss: {},
        'postcss-prefix-selector': {
            prefix: 'thread-',
            transform(prefix, selector) {
                // Don't prefix already prefixed selectors
                if (selector.includes(prefix)) {
                    return selector;
                }
                // Don't prefix @keyframes
                if (selector.includes('@keyframes')) {
                    return selector;
                }
                return `${prefix}${selector}`;
            }
        },
        autoprefixer: {},
    }
}