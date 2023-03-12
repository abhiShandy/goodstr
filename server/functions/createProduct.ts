import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { APIGatewayProxyHandler } from "aws-lambda";
import { Product } from "../models/Product";
import nanoid from "../models/utils/nanoid";

const s3Client = new S3Client({});

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!process.env.BUCKET) {
    console.error("BUCKET env var is not set");
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "BUCKET env var is not set",
    };
  }

  if (!event.body) {
    console.error("Missing request body");
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Missing request body",
    };
  }

  const { name, description, images, price } = JSON.parse(event.body);

  if (!name || !description || !images || !price) {
    console.error("Missing required fields");
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Missing required fields",
    };
  }

  const newProduct = new Product({
    name,
    description,
    images: [
      {
        s3Key: "img_" + nanoid() + "." + images[0].type.split("/")[1],
        type: images[0].type,
      },
    ],
    price,
    seller: {
      id: "123",
      name: "John Doe",
    },
  });

  // TODO: add support for multiple images
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: newProduct.images[0].s3Key,
    ContentType: images[0].type.split("/")[1],
    ContentEncoding: "base64",
    Body: Buffer.from(images[0].data, "base64"),
  });

  try {
    await s3Client.send(command);

    console.info("Uploaded image to S3");

    await newProduct.create();

    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Success!",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Failed to create product. Check logs.",
    };
  }
};
