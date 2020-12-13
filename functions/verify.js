const validate = require('validate-vat');

exports.handler = function (event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters);

  const { vat } = event.queryStringParameters;

  const response = async (err, info) => {
    try {
      const data = await info;
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          data,
        }),
      });
    } catch (error) {
      console.log(err);
    }
  };

  validate('PL', vat, response);
};
