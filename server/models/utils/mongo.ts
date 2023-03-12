import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { MongoClient as Mongo } from "mongodb";

const secretsManagerClient = new SecretsManagerClient({});

async function MongoClient() {
  if (!process.env.SECRETS_ARN) {
    console.error("SECRETS_ARN env var is not set");
    throw new Error("SECRETS_ARN env var is not set");
  }

  const secretValue = await secretsManagerClient.send(
    new GetSecretValueCommand({
      SecretId: process.env.SECRETS_ARN,
    })
  );

  if (!secretValue.SecretString) {
    console.error("Secret value is not set");
    throw new Error("Secret value is not set");
  }

  const MONGO_URL = JSON.parse(secretValue.SecretString).MONGO_URL;
  return new Mongo(MONGO_URL);
}

export default MongoClient;
