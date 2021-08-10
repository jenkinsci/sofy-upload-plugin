const { AuthRouter } = require('@routes');
const { ExpressRouter } = require('@utilities');
const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const { UserModel } = require('@models');

const { AuthController } = require('@controllers');

describe('lib/routes/auth.routes.js', function () {
    const sandbox = sinon.createSandbox();
    let app;
    let authRouter;
    let authController;

    beforeEach(function () {
        app = express();
        authController = sandbox.createStubInstance(AuthController);
        authRouter = new AuthRouter(app, '/auth', authController);
    });

    // describe('@Constructor', function () {
    //     it('should call super with required arguments', function () {
    // const authController = sandbox.createStubInstance(AuthController);
    // const constructorSpy = sandbox.spy(ExpressRouter);

    // const authRouter = new AuthRouter(app, '/auth', authController);

    //         constructorSpy.calledOnce.should.be.true();
    //     });
    // });

    describe('#setupRoutes', function () {
        it('should set up auth routes', function () {
            sandbox.stub(authRouter.router, 'post');
            authRouter.setupRoutes();

            authRouter.router.post.calledTwice.should.be.true();
            authRouter.router.post.getCall(0).args.should.eql(['/login', authRouter.login]);
            authRouter.router.post.getCall(1).args.should.eql(['/register', authRouter.register]);
        });
    });

    describe('/login', function () {
        it('should return a successful response', async function () {
            const user = sandbox.createStubInstance(UserModel);

            authController.login.resolves(user);
            const response = await request(app)
                .post('/auth/login')
                .set({ email: 'testEmail', password: 'Pass123' });

            authController.login.calledOnce.should.be.true();
            authController.login.getCall(0).args.should.eql(['testEmail', 'Pass123']);

            response.should.eql(user);
        });
    });
});
