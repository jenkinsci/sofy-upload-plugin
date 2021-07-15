module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'plugin:mocha/recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'max-len': ['error', {
            code: 140,
            ignoreComments: true,
        }],
        indent: ['error', 4],
        'prefer-arrow-callback': 0,
        'func-names': 0,
        'mocha/no-top-level-hooks': 0,
        'mocha/no-hooks-for-single-case': 0,
        'import/no-unresolved': 0,
        'no-shadow': 0,
    },
};
