module.exports = (res, responseObject) => {
  if (responseObject && responseObject.status) {
    res.status(responseObject.status);

    if (responseObject.headers) {
      res.header(responseObject.headers);
    }

    res.json(responseObject.data);
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: 'Something went wrong!'});
  }
};