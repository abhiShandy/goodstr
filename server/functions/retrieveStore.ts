import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.pathParameters?.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No store ID provided",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: event.pathParameters.id,
      name: "FunStr",
      description: "A store for fun things",
    }),
  };
};
