const express = require('express');
const { auth } = require('../Controller/middleware');
const { submitFeedback, getFeedback } = require('../Controller/feedbackController');

const router = express.Router();

//routes need authentication
router.use('/feedback', auth);

module.exports = router;

router.route('/feedback').get(getFeedback);
router.route('/submit').post(submitFeedback);
