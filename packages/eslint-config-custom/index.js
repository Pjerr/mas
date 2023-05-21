module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['next', 'turbo', 'prettier'],
    settings: {
        react: {
            version: 'detect',
        },
    },
};
