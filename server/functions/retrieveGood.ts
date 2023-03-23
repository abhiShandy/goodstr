import { APIGatewayProxyHandler } from "aws-lambda";
import { Good } from "../models";

interface RetrieveGoodResponse {
  id: string;
  title: string;
  description: string;
  npub: string;
  images: Array<{ src: string }>;
  asset: {
    s3Key: string;
  };
}

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.pathParameters?.id) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Missing good id",
    };
  }

  const good = await Good.retrieve(event.pathParameters.id);

  if (!good) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Good not found",
    };
  }

  const response: RetrieveGoodResponse = {
    id: good.id,
    title: good.title,
    description: good.description,
    images: good.images.map((image) => {
      return {
        src: `https://${process.env.BUCKET}.s3.amazonaws.com/${image.s3Key}`,
      };
    }),
    npub: good.publisher.npub,
    asset: {
      s3Key: good.asset.s3Key,
    },
  };

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(response),
  };
};
