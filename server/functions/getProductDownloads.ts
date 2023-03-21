import { APIGatewayProxyHandler } from "aws-lambda";
import { Product } from "../models";

export const handler: APIGatewayProxyHandler = async (event) => {
  const productId = event.pathParameters?.id;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing key" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  const downloads = await Product.getDownloads(productId);

  return {
    statusCode: 200,
    body: JSON.stringify({ downloads }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
