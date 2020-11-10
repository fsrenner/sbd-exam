const chai = require('chai');
const logRequests = require('../helpers/logRequests');

const req = {
    protocol: 'test',
    method: 'test',
    hostname: 'test',
    ip: 'test',
    path: 'test',
    originalUrl: 'test',
    get: (str) => str
};

describe('Log Requests', () => {
    describe('Log Requests Test', () => {

        it('Should call next() once', (done) => {
            logRequests(req, {}, () => {
                done();
            });
        });

    });
});