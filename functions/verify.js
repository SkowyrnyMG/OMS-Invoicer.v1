const validate = require('validate-vat');

exports.handler = function (event, context, callback) {
  const { vat, countrycode } = event.queryStringParameters;

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

  validate(countrycode, vat, response);
};
