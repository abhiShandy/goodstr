import Subscribers from "../models/Subscribers";

export const handler = async (event: AWSLambda.APIGatewayProxyEvent) => {
  if (!event.body)
    return {
      statusCode: 400,
      body: "Bad Request",
      headers: { "Access-Control-Allow-Origin": "*" },
    };

  const { contact } = JSON.parse(event.body);

  if (!contact)
    return {
      statusCode: 400,
      body: "Bad Request",
      headers: { "Access-Control-Allow-Origin": "*" },
    };

  const subscriber = new Subscribers(contact);
  await subscriber.create();

  return {
    statusCode: 204,
    body: JSON.stringify({}),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
