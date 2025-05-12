const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "ContactSubmissions";

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const item = {
        id: Date.now().toString(),
        name: body.name,
        email: body.email,
        message: body.message,
        timestamp: new Date().toISOString()
    };

    await dynamo.put({
        TableName: TABLE_NAME,
        Item: item
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Submission received", item })
    };
};
