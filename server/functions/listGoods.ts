import { APIGatewayProxyHandler } from "aws-lambda";
import { Image, Good, GoodFields } from "../models";

interface GoodWithImageUrl extends GoodFields {
  images: Array<Image & { url: string }>;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const goods = await Good.list();

    const goodsWithImageUrl: GoodWithImageUrl[] = goods.map((good) => {
      return {
        ...good,
        images: good.images.map((image) => {
          return {
            ...image,
            url: `https://${process.env.BUCKET}.s3.amazonaws.com/${image.s3Key}`,
          };
        }),
      };
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(goodsWithImageUrl),
    };
  } catch (err) {
    console.error("Error listing goods: ", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Error listing goods",
    };
  }
};
