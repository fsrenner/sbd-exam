const TWO_CHAR_REGEX = /.{1,2}/g;
const ALPHA_NUMERIC_REGEX = /[A-Za-z0-9_]+$/;
const alphaNumericPattern = new RegExp(ALPHA_NUMERIC_REGEX);
/**
 * The reverseMac function takes an array of strings that are set up according to the 
 * following formats: "00:A0:C9:14:C8:29", "00-A0-C9-14-C8-29", "00A0C914C829" and
 * reverses them either by splitting them according to the separator character or
 * by pairs of characters if not separating character is provided.
 * 
 * @param {Array} macs - the array of strings
 */
module.exports = function (macs) {
    const reversedMacs = [];
    const errorMacs = [];
    for(const mac of macs) {
        // If the mac address is not a string, then push into errorMacs array
        if (typeof mac !== 'string') {
            errorMacs.push(mac);
        }
        // Case 1: mac address contains the ":" character
        else if (mac.includes(':')) {
            let strArray = mac.split(':');
            if (strArray.every(elem => ( alphaNumericPattern.test(elem) && elem.length === 2))) {
                strArray = strArray.reverse();
                reversedMacs.push(strArray.join(':'));
            } else {
                errorMacs.push(mac);
            }
            
        }
        // Case 2: mac address contains the "-" character
        else if (mac.includes('-')) {
            let strArray = mac.split('-');
            if (strArray.every(elem => ( alphaNumericPattern.test(elem) && elem.length === 2))) {
                strArray = strArray.reverse();
                reversedMacs.push(strArray.join('-'));
            } else {
                errorMacs.push(mac);
            }
        }
        // Case 3: mac address contains no separator character
        else {
            // If the mac address does not have an even length, then push into errorMacs
            if(mac.length === 0 || mac.length % 2 !== 0 || !alphaNumericPattern.test(mac)) {
                errorMacs.push(mac);
            } else {
                let strArray = mac.match(TWO_CHAR_REGEX);
                strArray = strArray.reverse();
                reversedMacs.push(strArray.join(''));
            }
        }
    }

    return {
        "reversed-macs": reversedMacs,
        "error": errorMacs
    };

}