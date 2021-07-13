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
        'no-shadow': ['error', {
            builtinGlobals: true,
        }],
        indent: ['error', 4],
    },
};
