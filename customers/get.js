"use strict";
const dynamodb = require("../db");

module.exports.get = (event, context, callback) => {
  const customerId = event.pathParameters.id;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    ExpressionAttributeValues: {
      ":c_id": customerId,
      ":d_id": "info"
    },
    KeyConditionExpression: "customer_id = :c_id AND document = :d_id"
  };

  // fetch all todos from the database
  dynamodb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the customer."
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  });
};
