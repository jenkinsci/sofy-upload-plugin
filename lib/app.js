const express = require('express');
const { Sequelize } = require('sequelize');

const models = require('@models');
const controllers = require('@controllers');
const routes = require('@routes');

class ExpressServer {
    /**
     * Creates a new instace of express server
     * @param {Object} config - Application configuration
     */
    constructor(config) {
        this.config = config;
        this.app = express();
        this.controllers = {};
        this.routes = {};
    }

    async setup() {
        this.initializeSequelize();
        this.initializeModels();
        this.initializeControllers();
        this.initializeRoutes();
    }

    initializeSequelize() {
        const {
            DB_USER,
            DB_NAME,
            DB_PASS,
            DB_HOST,
        } = this.config.sequelize;
        this.sequelize = new Sequelize({
            database: DB_NAME,
            username: DB_USER,
            password: DB_PASS,
            host: DB_HOST,
        });
    }

    initializeModels() {
        for (const model of Object.values(models)) {
            model.init(this.sequelize);
        }
    }

    initializeControllers() {
        const { UserModel } = models;

        this.controllers.authController = new controllers.AuthController({ UserModel });
    }

    initializeRoutes() {
        const { AuthRouter } = routes;
        this.routes = new AuthRouter(this.app, '/auth', this.controllers.authController);
    }
}

module.exports = ExpressServer;
