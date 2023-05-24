"use strict"

const {v4} = require("uuid")
const AWS = require("aws-sdk")
//const { DynamoDB } = require("aws-sdk")

const insertItem = async (event) => {

    const {item} = JSON.parse(event.body)
    const createdAT = new Date().toISOString()
    const id = v4()

    const dynamodb = new AWS.DynamoDB.DocumentClient()

    const newItem = {
        id,
        item,
        createdAT,
        itemStatus: false

    }

    await dynamodb.put(
        {
            TableName:"ItemTableNew",
            Item: newItem
        }
    ).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}

module.exports = {
    handler:insertItem
}