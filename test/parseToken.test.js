const chai = require('chai');
const parseToken = require('../helpers/parseToken');

const expect = chai.expect;
let token = 'hello';
const TEN_MINUTES = 10 * 60 * 1000;
const MORE_THAN_TEN_MINUTES = TEN_MINUTES + 1000;

describe('Parse Token', () => {
    describe('Parse Token Test', () => {

        it('Should return false (NaN)', (done) => {
            const parseTokenResult = parseToken(token);
            expect(parseTokenResult).to.be.false;
            done();
        });

        it('Should return false (Bad Token)', (done) => {
            const date = Date.now();
            token = `${date}${date - 1}`
            const parseTokenResult = parseToken(token);
            expect(parseTokenResult).to.be.false;
            done();
        });

        it('Should return false (Token less characters than date)', (done) => {
            token = '1234';
            const parseTokenResult = parseToken(token);
            expect(parseTokenResult).to.be.false;
            done();
        });

        it('Should return false (More than ten minutes old)', (done) => {
            const date = Date.now();
            const moreThanTenMinutesOld = date - MORE_THAN_TEN_MINUTES;
            token = `${moreThanTenMinutesOld}${moreThanTenMinutesOld}`
            const parseTokenResult = parseToken(token);
            expect(parseTokenResult).to.be.false;
            done();
        });

        it('Should return false (More than ten minutes ahead)', (done) => {
            const date = Date.now();
            const moreThanTenMinutesAhead = date + MORE_THAN_TEN_MINUTES;
            token = `${moreThanTenMinutesAhead}${moreThanTenMinutesAhead}`
            const parseTokenResult = parseToken(token);
            expect(parseTokenResult).to.be.false;
            done();
        });

        it('Should return true', (done) => {
            const date = Date.now();
            token = `${date}${date}`
            const parseTokenResult = parseToken(token);
            expect(parseTokenResult).to.be.true;
            done();
        });
    });
});