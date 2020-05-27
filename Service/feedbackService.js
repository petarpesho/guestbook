const httpStatus = require('http-status-codes');
const ResponseObject = require('../Controller/ResponseObject');
const moment = require('moment');
const fs = require('fs');
const readline = require('readline');
const constants = require('../constants');

exports.submitFeedback = async (data) => {
  const feedbackData = prepareFeedbackData(data);
  if (!feedbackData) {
    return new ResponseObject(httpStatus.BAD_REQUEST, {message: 'Bad Request!'});
  }

  return await new Promise(((resolve, reject) => {
    fs.appendFile(constants.FEEDBACK_FILE_NAME, JSON.stringify(feedbackData) + '\n', (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  })).then(() => {
    return new ResponseObject(httpStatus.OK, {message: 'Feedback submitted!'});
  }).catch((err) => {
    //log an error
  });
};

function prepareFeedbackData(params) {
  const isValidDate = moment(params.dateCreated, "DD-MM-YYYY").isValid();

  if (!params.authorName || !params.body || !isValidDate) {
    return null;
  }

  return {
    authorName: params.authorName,
    body: params.body,
    dateCreated: moment(params.dateCreated, "DD-MM-YYYY").format("DD-MM-YYYY")
  };
}

exports.getFeedback = async (queryParams) => {
  const filters = prepareFilters(queryParams);

  return await new Promise((resolve, reject) => {
    let fileStream = fs.createReadStream(constants.FEEDBACK_FILE_NAME);

    fileStream.on('error', (err) => {
      reject(err);
    });

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let responseData = [];

    rl.on('line', line => {
      let dataJson = JSON.parse(line);
      let hasMatch = true;

      if (filters) {
        if(filters.name && filters.name !== dataJson.authorName.toLowerCase()) {
          hasMatch = false;
        }

        if(filters.content && dataJson.body.toLowerCase().indexOf(filters.content) === -1) {
          hasMatch = false;
        }

        if(filters.fromDate && !moment(dataJson.dateCreated, "DD-MM-YYYY").isSameOrAfter(filters.fromDate)) {
          hasMatch = false;
        }

        if(filters.toDate && !moment(dataJson.dateCreated, "DD-MM-YYYY").isSameOrBefore(filters.toDate)) {
          hasMatch = false;
        }
      }

      if (hasMatch) {
        responseData.push(dataJson);
      }
    });

    rl.on('error', (err) => {
      reject(err);
    })

    rl.on('close', () => {
      resolve(responseData)
    })
  }).then((responseData) => {
    return new ResponseObject(httpStatus.OK, responseData)

  }).catch((err) => {
    //log an error

  });
};

function prepareFilters(queryParams) {
  return {
    'name' : queryParams.name
      ? queryParams.name.toLowerCase()
      : '',
    'fromDate' : queryParams.fromDate
      ? moment(queryParams.fromDate, 'DD-MM-YYYY').format("YYYY-MM-DD")
      : '',
    'toDate' : queryParams.toDate
      ? moment(queryParams.toDate, 'DD-MM-YYYY').format("YYYY-MM-DD")
      : '',
    'content' : queryParams.content
      ? queryParams.content.toLowerCase()
      : '',
  }
};

