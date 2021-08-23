const express = require('express');
const cors = require('cors');
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
        this.initializeLibraries();
        this.initializeSequelize();
        this.initializeModels();
        this.initializeControllers();
        this.initializeRoutes();
    }

    initializeLibraries() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use((err, req, res, next) => {
            console.error(err);
            res.status(err.statusCode || 500).json({
                message: err.message || 'Something went wrong!',
            });
        });

        this.app.listen(8000, () => console.log('Sofy server is up and running on port 8000'));
    }

    initializeSequelize() {
        const { DB } = this.config;
        try {
            this.sequelize = new Sequelize({
                database: DB.NAME,
                username: DB.USER,
                password: DB.PASS,
                host: DB.HOST,

                // eslint-disable-next-line no-console
                logging: console.log,
                dialect: 'mssql',
                dialectOptions: {
                    options: {
                        encrypt: true,
                    },
                },
            });

            // this.sequelize.connectionManager;
        } catch (error) {
            debugger;
        }
    }

    initializeModels() {
        for (const model of Object.values(models)) {
            model.init(this.sequelize);
            model.associate();
        }
    }

    initializeControllers() {
        const { UserModel, UserCode, ApplicationModel } = models;

        this.controllers.authController = new controllers.AuthController({ UserModel, UserCode });
        this.controllers.ApplicationController = new controllers.ApplicationController({ ApplicationModel });
    }

    initializeRoutes() {
        const { AuthRouter, ApplicationRouter } = routes;
        this.routes = new AuthRouter(this.app, '/auth', this.controllers.authController);
        this.routes = new ApplicationRouter(this.app, '/', this.controllers.ApplicationController);
    }
}

module.exports = ExpressServer;
