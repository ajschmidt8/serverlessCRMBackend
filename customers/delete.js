"use strict";
const dynamodb = require("../db");

module.exports.delete = (event, context, callback) => {
  const customerId = event.pathParameters.id;

  // determine whether or not this should delete customer AND invoices??

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      customer_id: customerId,
      document: "info"
    },
    ReturnValues: "ALL_OLD"
  };

  dynamodb.delete(params, (err, data) => {
    // handle potential errors
    if (err) {
      console.error(err);
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't delete the customer."
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: data.Attributes
    };
    callback(null, response);
  });
};
