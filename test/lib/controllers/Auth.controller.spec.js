const { AuthController } = require('@controllers');
const { UserModel } = require('@models');
const sinon = require('sinon');

describe('lib/controllers/Auth.controller.js', function () {
    let authController;
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        authController = new AuthController({ UserModel });
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('@Constructor', function () {
        it('should successfully initialize auth controller', function () {
            authController.UserModel.should.equal(UserModel);
        });

        it('should throw if UserModel not provided', function () {
            let error;

            try {
                new AuthController();
            } catch (err) {
                error = err;
            }

            should.exist(error);
            should(error).be.eql(new Error('UserModel is required'));

            (function () {
                return new AuthController();
            }).should.throw(new Error('UserModel is required'));
        });
    });

    describe('#login', function () {
        let user;

        beforeEach(function () {
            user = sandbox.createStubInstance(UserModel);
            sandbox.stub(authController.UserModel, 'findByEmail').resolves(user);
        });

        it('should find user by email', async function () {
            await authController.login('some-email', 'some-password');

            authController.UserModel.findByEmail.calledOnce.should.be.true();
            authController.UserModel.findByEmail.getCall(0).args.should.eql(['some-email']);
        });

        it('should fail if find by email fails', async function () {
            const testErr = new Error('test error');
            authController.UserModel.findByEmail.rejects(testErr);

            await authController.login('some-email', 'some-password').should.be.rejectedWith(testErr);

            // authController.UserModel.findByEmail.calledOnce.should.be.true();
            // authController.UserModel.findByEmail.getCall(0).args.should.eql(['some-email'])
        });

        it('should fail if unable to find user by email', async function () {
            authController.UserModel.findByEmail.resolves();

            await authController.login('some-email', 'some-password').should.be.rejectedWith(new Error("User doesn't exists"));
        });
    });

    describe('#register', function () {

    });
});

// const a = { x: 1, z: { name: '1' }};
// const b = { x: 1, z: { name: '1' }};
// const c = a;

// a === b //equal: false, eql: true
// c === a //equal: true , eql: true
