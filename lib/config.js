const {
    FRONTEND_URL,
    DB_HOST, DB_USER, DB_PASS, DB_NAME,
    JWT_KEY,
    GOGOLE_CLIENT_ID,
    EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS,
} = process.env;

module.exports = {
    FRONTEND_URL,
    DB: {
        HOST: DB_HOST,
        NAME: DB_NAME,
        USER: DB_USER,
        PASS: DB_PASS,
    },
    JWT_KEY,
    GOGOLE_CLIENT_ID,
    EMAIL: {
        HOST: EMAIL_HOST,
        PORT: EMAIL_PORT,
        USER: EMAIL_USER,
        PASS: EMAIL_PASS,
    },
};
