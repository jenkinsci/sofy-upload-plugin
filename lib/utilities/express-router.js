/**
 * @typedef {import('express').IRouter} ExpressRouter
 * @typedef {import('express').Application} ExpressApplication
 */

const express = require('express');

class ExpressRouter {
    /**
     * Sets up router and routes on the mount point
     * @param {ExpressApplication} app - Express Application
     * @param {string} mountPoint - path to attach router
     */
    constructor(app, mountPoint) {
        if (this.constructor === ExpressRouter) {
            throw new Error('Can\'t create instance of abstract class');
        }

        /**
         * @type {ExpressRouter}
         */
        this.router = express.Router();

        app.use(mountPoint, this.router);

        this.setupRoutes();
    }

    /**
     * Sets up the routes
     * @abstract
     */
    // eslint-disable-next-line class-methods-use-this
    setupRoutes() {
        throw new Error('Implementation missing');
    }
}

module.exports = ExpressRouter;
