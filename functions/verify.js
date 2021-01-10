const validate = require('validate-vat');

exports.handler = function (event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters);

  const { vat, countrycode } = event.queryStringParameters;

  const response = async (err, info) => {
    try {
      console.log(vat, countrycode);
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

  validate(countrycode, vat, response);
};
