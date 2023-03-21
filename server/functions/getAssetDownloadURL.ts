import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  const s3Client = new S3Client({});

  if (!process.env.BUCKET) throw new Error("BUCKET not set");

  const key = event.pathParameters?.key;

  if (!key) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing key" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return {
    statusCode: 200,
    body: JSON.stringify({ url, key: command.input.Key }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
