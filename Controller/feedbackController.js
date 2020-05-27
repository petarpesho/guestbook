const moment = require('moment');
const sendResponse = require('./sendResponse');
const feedbackService = require('../Service/feedbackService');

exports.submitFeedback = async (req, res) => {
  const params = req.body;

  const responseObject = await feedbackService.submitFeedback(params);

  sendResponse(res, responseObject);
};

exports.getFeedback = async (req, res) => {
  const queryParams = req.query;

  const responseObject = await feedbackService.getFeedback(queryParams);

  sendResponse(res, responseObject);
};