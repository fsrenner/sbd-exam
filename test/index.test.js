const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const should = chai.should();
chai.use(chaiHttp);

describe('REST API', () => {

    describe('GET /status', () => {
        it('Should return the API status', (done) => {
            const status = {
                message: 'Stanley Black & Decker Exam API is running',
                request: 'status',
                method: 'GET',
                success: true,
                status: 200
            }
            chai.request(app)
                .get('/status')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    expect(res.body.message).to.equal(status.message);
                    expect(res.body.request).to.equal(status.request);
                    expect(res.body.method).to.equal(status.method);
                    expect(res.body.success).to.equal(status.success);
                    expect(res.body.status).to.equal(status.status);
                    done();
                });
        });
    });

    describe('GET /reverse-mac', () => {

        it('Should return Bad Request (400)', (done) => {
            const response = {
                error: 'The macs parameter was not passed or was not sent as an array'
            };
            chai.request(app)
                .get('/reverse-mac')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    expect(res.body.error).to.equal(response.error);
                    done();
                });
        });

        it('Should return Unauthorized (401): no token provided', (done) => {
            const response = {
                error: 'The authentication bearer token was not provided with the request'
            };
            const data = {
                macs: ['00:A0:C9:14:C8:29']
            };
            chai.request(app)
                .get('/reverse-mac')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an('object');
                    expect(res.body.error).to.equal(response.error);
                    done();
                });
        });

        it('Should return Unauthorized (401): invalid token', (done) => {
            const response = {
                error: 'You are not authorized to access this endpoint: invalid authentication token'
            };

            const token = 'Test';
            const data = {
                macs: ['00:A0:C9:14:C8:29']
            };
            chai.request(app)
                .get('/reverse-mac')
                .set('authorization', `Bearer ${token}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an('object');
                    expect(res.body.error).to.equal(response.error);
                    done();
                });
        });

        it('Should return Success (200) with response object', (done) => {
            const response = {
                "reversed-macs": ['29:C8:14:C9:A0:00'],
                "error": []
            };
            const date = Date.now();
            const token = `${date}${date}`;
            const data = {
                macs: ['00:A0:C9:14:C8:29']
            };
            chai.request(app)
                .get('/reverse-mac')
                .set('authorization', `Bearer ${token}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    expect(res.body['reversed-macs'][0]).to.equal(response['reversed-macs'][0]);
                    done();
                });
        });

    });

});