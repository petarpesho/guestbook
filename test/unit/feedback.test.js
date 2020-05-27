const test = require('tape');
const sinon = require('sinon');
const feedbackService = require('../../Service/feedbackService');
const fs = require('fs');

function makeFakeFile() {
  const fakeFile = fs.createReadStream('./test/unit/feedback-test.txt');

  return sinon.stub(fs, 'createReadStream').callsFake(() => {
    return fakeFile;
  });
}

exports.processTests = () => {
  test('get feedback', async function (assert) {
    let readFileStub = makeFakeFile();

    let filters = {
      name: 'Math'
    };

    let result = await feedbackService.getFeedback(filters);

    let expect = [
      {
        authorName: 'Math',
        body: 'Lorem Ipsum is simply dummy text ',
        dateCreated: '21-03-2010'
      },
      {
        authorName: 'Math',
        body: 'Lorem Ipsum is simply dummy text',
        dateCreated: '07-02-2010'
      },
      {
        authorName: 'Math',
        body: 'Lorem Ipsum is simply dummy text',
        dateCreated: '09-02-2010'
      }
    ];

    assert.deepEqual(result.data, expect);
    assert.equal(result.status, 200);

    readFileStub.restore();
    readFileStub = makeFakeFile();

    filters = {
      name: 'Math',
      fromDate: '01-02-2010',
      toDate: '08-02-2010'
    };

    result = await feedbackService.getFeedback(filters);

    expect = [
      {
        authorName: 'Math',
        body: 'Lorem Ipsum is simply dummy text',
        dateCreated: '07-02-2010'
      }
    ];

    readFileStub.restore();

    assert.deepEqual(result.data, expect);
    assert.equal(result.status, 200);

    assert.end();
  });
}

