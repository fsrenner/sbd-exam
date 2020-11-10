/**
 * The extractToken function parses the request authorization header and looks for the
 * Bearer token. If found, and found in the format "Bearer <token>", then it splits
 * the string into an array and returns the token element. Otherwise, it returns null.
 * 
 * @param {Object} req - the request object
 */
module.exports = function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else {
        return null;
    }
};