"use strict";
const dynamodb = require("../db");
const qs = require("querystring");

module.exports.add = (event, context, callback) => {
  const customer = qs.parse(event.body);
  console.log(customer);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      ...customer,
      date: Number(customer.date)
    }
  };

  console.log(params);

  dynamodb.put(params, (err, data) => {
    // handle potential errors
    if (err) {
      console.error(err);
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't add the customer."
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: params.Item
    };
    callback(null, response);
  });
};
