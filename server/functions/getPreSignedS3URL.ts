import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { APIGatewayProxyHandler } from "aws-lambda";
import { nanoid } from "../models/utils";

export const handler: APIGatewayProxyHandler = async (event) => {
  const s3Client = new S3Client({});

  if (!process.env.BUCKET) throw new Error("BUCKET not set");

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: "asset_" + nanoid(),
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
