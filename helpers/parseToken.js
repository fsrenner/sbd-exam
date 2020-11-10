const Logger = require('../config').logger;
const TEN_MINUTES = 10 * 60 * 1000;

/**
 * The parse token function looks at the token that is passed by the authentication bearer
 * header and ensures that the token is composed of a time stamp that is repeated twice,
 * and the timestamp in token is later than ten minutes before the current time and earlier
 * than ten minutes after the current time.
 * 
 * @param {String} token - The Authentication Bearer token from the request header
 */
module.exports = function (token) {

    // If the token is not a number, then return false. No need to process further.
    if (isNaN(token)) {
        return false;
    }
    const now = Date.now();
    const tenMinutesBeforeNow = now - TEN_MINUTES;
    const tenMinutesAfterNow = now + TEN_MINUTES;
    const nowLength = now.toString().length;

    // Need to fence in case token length is less than now length
    if (nowLength > token.length) {
        return false;
    }
    const tokenFirstHalf = Number(token.substring(0, nowLength));
    const tokenSecondHalf = Number(token.substring(nowLength , token.length));

    if (
        tokenFirstHalf !== tokenSecondHalf || // If not repeated time stamp return false
        tokenFirstHalf < tenMinutesBeforeNow || // if token timestamp is earlier than ten minutes ago return false
        tokenFirstHalf > tenMinutesAfterNow // if token timestamp is later than ten minute from now return false
    ) {
        return false
    } else {
        return true;
    }
    
};