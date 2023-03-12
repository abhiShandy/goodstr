import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { join } from "path";

export class ServerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "ProductImages", {
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const secret = Secret.fromSecretNameV2(this, "MONGO_URL", "MONGO_URL");

    const createProductFn = new NodejsFunction(this, "CreateProduct", {
      entry: join(__dirname, "../server/functions/createProduct.ts"),
      environment: {
        BUCKET: bucket.bucketName,
        SECRETS_ARN: secret.secretArn,
      },
    });

    bucket.grantWrite(createProductFn);
    secret.grantRead(createProductFn);

    const restApi = new RestApi(this, "RestApi", {
      restApiName: "Product Service",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["POST"],
        allowHeaders: ["*"],
        allowCredentials: true,
      },
    });

    const productsEndpoint = restApi.root.addResource("products");

    productsEndpoint.addMethod("POST", new LambdaIntegration(createProductFn));
  }
}
