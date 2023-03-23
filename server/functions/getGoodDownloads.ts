import { APIGatewayProxyHandler } from "aws-lambda";
import { Good } from "../models";

export const handler: APIGatewayProxyHandler = async (event) => {
  const goodId = event.pathParameters?.id;

  if (!goodId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing key" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  const downloads = await Good.getDownloads(goodId);

  return {
    statusCode: 200,
    body: JSON.stringify({ downloads }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
