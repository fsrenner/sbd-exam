const chai = require('chai');
const extractToken = require('../helpers/extractToken');

const expect = chai.expect;
const req = {
    headers: {}
};

describe('Extract Token', () => {
    describe('Extract Token Test', () => {

        it('Should return null', (done) => {
            const extractTokenResult = extractToken(req);
            expect(extractTokenResult).to.be.null;
            done();
        });

        it('Should return Bearer Token', (done) => {
            const token = 'Test';
            req.headers.authorization = `Bearer ${token}`;
            const extractTokenResult = extractToken(req);
            expect(extractTokenResult).to.be.a('string');
            expect(extractTokenResult).to.equal(token);
            done();
        });
    });
});