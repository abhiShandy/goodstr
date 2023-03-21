import { APIGatewayProxyHandler } from "aws-lambda";
import { Product } from "../models";

interface RetrieveProductResponse {
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
      body: "Missing product id",
    };
  }

  const product = await Product.retrieve(event.pathParameters.id);

  if (!product) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Product not found",
    };
  }

  const response: RetrieveProductResponse = {
    id: product.id,
    title: product.title,
    description: product.description,
    images: product.images.map((image) => {
      return {
        src: `https://${process.env.BUCKET}.s3.amazonaws.com/${image.s3Key}`,
      };
    }),
    npub: product.seller.npub,
    asset: {
      s3Key: product.asset.s3Key,
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
