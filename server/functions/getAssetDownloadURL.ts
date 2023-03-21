import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { APIGatewayProxyHandler } from "aws-lambda";
import { Product } from "../models";

export const handler: APIGatewayProxyHandler = async (event) => {
  const s3Client = new S3Client({});

  if (!process.env.BUCKET) throw new Error("BUCKET not set");

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

  const product = await Product.retrieve(productId);

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Product not found" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET,
    Key: product.asset.s3Key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  await Product.incrementDownloads(productId);

  return {
    statusCode: 200,
    body: JSON.stringify({ url, key: command.input.Key }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
