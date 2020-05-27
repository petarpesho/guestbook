module.exports = class ResponseObject {
  constructor(status, data, headers) {
    this.status = status;
    this.data = data;
    this.headers = headers;
  }
};