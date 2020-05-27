const httpStatus = require('http-status-codes');
const ResponseObject = require('../Controller/ResponseObject');
const sendResponse = require('./sendResponse');
const constants = require('../constants');

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const responseObject = new ResponseObject(httpStatus.UNAUTHORIZED, {message: 'Not authorised!'}, {'WWW-Authenticate': 'Basic'});

    return sendResponse(res, responseObject);
  }

  const userCredentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const username = userCredentials[0];
  const password = userCredentials[1];

  if (username === constants.USERNAME && password === constants.PASSWORD) {
    next();
  } else {
    const responseObject = new ResponseObject(httpStatus.UNAUTHORIZED, {message: 'Not authorised!'}, {'WWW-Authenticate': 'Basic'});

    return sendResponse(res, responseObject);
  }
}
