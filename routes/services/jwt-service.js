var jwt = require('jsonwebtoken');

var supersecretpasswordkey = 'school of computing and information technology - serve; connect; innovate;';

function generate(username, roles) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            username: username,
            roles: roles
        }
    }, supersecretpasswordkey);
}

function decode(token) {
    return jwt.decode(token);
}

function verifyToken(token) {
    var decoded = '';
    try {
        decoded = jwt.verify(token, supersecretpasswordkey);
    } catch(err) {
        return {
            error: err
        };
    }
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: decoded.data
    }, supersecretpasswordkey);
}

module.exports = {
    generate: generate,
    decode: decode,
    verify: verifyToken
};
