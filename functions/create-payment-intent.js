exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, total_amount, shipping_fee } = JSON.parse(event.body);
    console.log(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    };
  } else {
    return {
      statusCode: 200,
      body: "Create payment intent",
    };
  }
};
