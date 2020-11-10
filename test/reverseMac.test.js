const chai = require('chai');
const reverseMac = require('../helpers/reverseMac');

const expect = chai.expect;
let macs = [];
const responseObject = {
    "reversed-macs": [],
    "error": []
};

describe('Reverse Macs', () => {
    describe('Reverse Macs Test', () => {

        it('Should return object with empty arrays', (done) => {
            const reverseMacResult = reverseMac(macs);
            expect(reverseMacResult).to.be.an('object');
            expect(reverseMacResult).to.have.property('reversed-macs');
            expect(reverseMacResult).to.have.property('error');
            expect(reverseMacResult['reversed-macs']).to.be.an('array').with.lengthOf(0);
            expect(reverseMacResult['error']).to.be.an('array').with.lengthOf(0);
            done();
        });

        it('Should return object with reversed-mac array length of 1 (Mac address ":" case)', (done) => {
            macs = ['00:A0:C9:14:C8:29'];
            const reverseMacResult = reverseMac(macs);
            expect(reverseMacResult['reversed-macs']).to.be.an('array').with.lengthOf(1);
            expect(reverseMacResult['error']).to.be.an('array').with.lengthOf(0);
            done();
        });

        it('Should return object with reversed-mac array length of 1 (Mac address "-" case)', (done) => {
            macs = ['00-A0-C9-14-C8-29'];
            const reverseMacResult = reverseMac(macs);
            expect(reverseMacResult['reversed-macs']).to.be.an('array').with.lengthOf(1);
            expect(reverseMacResult['error']).to.be.an('array').with.lengthOf(0);
            done();
        });

        it('Should return object with reversed-mac array length of 1 (Mac address numbers case)', (done) => {
            macs = ['00A0C914C829'];
            const reverseMacResult = reverseMac(macs);
            expect(reverseMacResult['reversed-macs']).to.be.an('array').with.lengthOf(1);
            expect(reverseMacResult['error']).to.be.an('array').with.lengthOf(0);
            done();
        });

        it('Should return object with error array length of 3 (Regex failures case)', (done) => {
            macs = ['00A0C914C82*', '00-A0-C9-14-C8-9', '0!:A0:C9:14:C8:29'];
            const reverseMacResult = reverseMac(macs);
            expect(reverseMacResult['reversed-macs']).to.be.an('array').with.lengthOf(0);
            expect(reverseMacResult['error']).to.be.an('array').with.lengthOf(3);
            done();
        });

        it('Should return object with error array length of 1 (Non String Array case)', (done) => {
            macs = [123];
            const reverseMacResult = reverseMac(macs);
            expect(reverseMacResult['reversed-macs']).to.be.an('array').with.lengthOf(0);
            expect(reverseMacResult['error']).to.be.an('array').with.lengthOf(1);
            done();
        });

        it('Should return object with multiple successes and errors', (done) => {
            macs = [
                "00:A0:C9:14:C8:29",
                "00-A0-C9-14-C8-29",
                "00A0C914C829",
                "00A0C914C82*",
                123
            ];
            const reverseMacResult = reverseMac(macs);
            expect(reverseMacResult['reversed-macs']).to.be.an('array').with.lengthOf(3);
            expect(reverseMacResult['error']).to.be.an('array').with.lengthOf(2);
            done();
        });

    });
});