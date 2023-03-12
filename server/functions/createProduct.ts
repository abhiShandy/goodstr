import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { APIGatewayProxyHandler } from "aws-lambda";
import { MongoClient } from "mongodb";
import { customAlphabet } from "nanoid";
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

type Product = {
  name: string;
  description: string;
  images: [
    {
      s3Key: string;
      type: string;
    }
  ];
  price: number;
};

const nanoid = customAlphabet("1234567890abdef", 10);

const s3Client = new S3Client({});
const secretsManagerClient = new SecretsManagerClient({});

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

  if (!process.env.SECRETS_ARN) {
    console.error("SECRETS_ARN env var is not set");
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "SECRETS_ARN env var is not set",
    };
  }

  const secretValue = await secretsManagerClient.send(
    new GetSecretValueCommand({
      SecretId: process.env.SECRETS_ARN,
    })
  );

  if (!secretValue.SecretString) {
    console.error("Secret value is not set");
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Secret value is not set",
    };
  }

  const MONGO_URL = JSON.parse(secretValue.SecretString).MONGO_URL;

  const mongoClient = new MongoClient(MONGO_URL);

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

  const newProduct: Product = {
    name,
    description,
    images: [
      {
        s3Key: "img_" + nanoid() + "." + images[0].type.split("/")[1],
        type: images[0].type,
      },
    ],
    price,
  };

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

    await mongoClient.connect();
    const db = mongoClient.db("thegoodstr");
    const productsCollection = db.collection<Product>("products");
    const res = await productsCollection.insertOne(newProduct);

    console.info("Inserted product", res.insertedId);

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
