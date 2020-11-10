const chai = require('chai');
const config = require('../config');

const expect = chai.expect;
const req = {
    headers: {}
};

describe('Config', () => {
    describe('Config Test', () => {

        it('Should return localhost for host', (done) => {
            expect(config.host).to.equal('localhost');
            done();
        });

        it('Should return 3000 for PORT', (done) => {
            expect(config.port).to.equal(3000);
            done();
        });

        it('Should return type object for logger', (done) => {
            expect(config.logger).to.be.an('object');
            done();
        });

    });
});