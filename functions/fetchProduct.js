const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const response = await axios.get(
      "https://www.course-api.com/react-store-single-product?id=recNZ0koOqEmilmoz"
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};
