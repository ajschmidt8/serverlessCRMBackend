"use strict";
const dynamodb = require("../db");

module.exports.all = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: "documentIndex",
    ExpressionAttributeValues: {
      ":d_id": "info"
    },
    KeyConditionExpression: "document = :d_id"
  };

  // fetch all todos from the database
  dynamodb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: "Couldn't fetch the customers."
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  });
};
