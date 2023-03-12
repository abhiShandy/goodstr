import { APIGatewayProxyHandler } from "aws-lambda";
import { Image, Product, ProductFields } from "../models";

interface ProductWithImageUrl extends ProductFields {
  images: Array<Image & { url: string }>;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const products = await Product.list();

    const productsWithImageUrl: ProductWithImageUrl[] = products.map(
      (product) => {
        return {
          ...product,
          images: product.images.map((image) => {
            return {
              ...image,
              url: `https://${process.env.BUCKET}.s3.amazonaws.com/${image.s3Key}`,
            };
          }),
        };
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(productsWithImageUrl),
    };
  } catch (err) {
    console.error("Error listing products: ", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Error listing products",
    };
  }
};
