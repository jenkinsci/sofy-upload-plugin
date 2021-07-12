const { UserModel } = require('@models');
const { Model, Sequelize } = require('sequelize');
// const Sequelize = require('sequelize-mock');
const bcrypt = require('bcrypt');
const sinon = require('sinon');

describe('lib/models/User.model.js', () => {
    const sandbox = sinon.createSandbox();
    let user; let
        sequelize;
    beforeEach(() => {
        sequelize = new Sequelize({

        });
        UserModel.init(sequelize);

        user = new UserModel();
        sandbox.stub(Model, 'init');
    });

    describe('#init', () => {
        it('should call super with schema', () => {
            Model.init.calledOnce.should.be.true();
            Model.init.getCall(0).args[0].should.be.an.instanceOf(Object);
            Model.init.getCall(0).args[1].sequelize.should.equal(sequelize);
        });
    });

    describe('#set password', () => {
        let user;
        beforeEach(() => {
            user = new UserModel();
        });

        it('should use bcrypt to generate and set password hash', () => {
            sandbox.stub(user, 'setDataValue');
            sandbox.stub(bcrypt, 'hashSync').returns('bcryptHash');

            user.password = 'abc';

            bcrypt.hashSync.calledOnce.should.be.true();
            bcrypt.hashSync.getCall(0).args.should.eql([
                'abc',
                10,
            ]);

            user.setDataValue.calledOnce.should.be.true();
            user.setDataValue.getCall(0).args.should.eql(['password', 'bcryptHash']);
        });
    });

    describe('#findByEmail', () => {
        beforeEach(() => {

        });

        it('should find one by lowercase email', async () => {

        });

        it('should throw if fails to find', async () => {

        });
    });

    describe('#isValidPassword', () => {

    });

    describe('#isValidOldPassword', () => {

    });

    describe('#getFullName', () => {

    });
});
