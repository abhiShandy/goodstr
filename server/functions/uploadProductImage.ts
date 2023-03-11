import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const main = async () => {
  if (!process.env.BUCKET) {
    throw new Error("BUCKET env var is not set");
  }

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: "hello-s3.txt",
    Body: "Hello S3!",
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
