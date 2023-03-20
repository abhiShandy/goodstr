import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

import { Bucket } from "aws-cdk-lib/aws-s3";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { join } from "path";
import NodejsFunction from "./lib/NodejsFunction";

export class ServerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const imageBucket = new Bucket(this, "ProductImages", {
      publicReadAccess: true,
    });

    const assetBucket = new Bucket(this, "Assets", {});

    const stage = scope.node.tryGetContext("stage") as string | undefined;

    const secret = stage
      ? Secret.fromSecretNameV2(
          this,
          `MONGO_URL`,
          `${stage.toUpperCase()}_MONGO_URL`
        )
      : Secret.fromSecretNameV2(this, `MONGO_URL`, `MONGO_URL`);

    // === Lambdas ===
    const createProductFn = new NodejsFunction(this, "CreateProduct", {
      entry: join(__dirname, "../server/functions/createProduct.ts"),
      environment: {
        BUCKET: imageBucket.bucketName,
        SECRETS_ARN: secret.secretArn,
      },
    });

    imageBucket.grantWrite(createProductFn);
    secret.grantRead(createProductFn);

    const listProductFn = new NodejsFunction(this, "ListProducts", {
      entry: join(__dirname, "../server/functions/listProducts.ts"),
      environment: {
        BUCKET: imageBucket.bucketName,
        SECRETS_ARN: secret.secretArn,
      },
    });

    secret.grantRead(listProductFn);

    const retrieveProductFn = new NodejsFunction(this, "RetrieveProduct", {
      entry: join(__dirname, "../server/functions/retrieveProduct.ts"),
      environment: {
        BUCKET: imageBucket.bucketName,
        SECRETS_ARN: secret.secretArn,
      },
    });

    secret.grantRead(retrieveProductFn);

    const retrieveStoreFn = new NodejsFunction(this, "RetrieveStore", {
      entry: join(__dirname, "../server/functions/retrieveStore.ts"),
    });

    const subscribeFn = new NodejsFunction(this, "Subscribe", {
      entry: join(__dirname, "../server/functions/subscribe.ts"),
      environment: {
        SECRETS_ARN: secret.secretArn,
      },
    });
    secret.grantRead(subscribeFn);

    const getPreSignedS3URLFn = new NodejsFunction(this, "GetPreSignedS3URL", {
      entry: join(__dirname, "../server/functions/getPreSignedS3URL.ts"),
      environment: {
        BUCKET: assetBucket.bucketName,
      },
    });

    assetBucket.grantWrite(getPreSignedS3URLFn);

    // === API Gateway ===
    const restApi = new RestApi(this, "RestApi", {
      restApiName: `${stage || "dev"}-thegoodstr-api`,
      deployOptions: {
        stageName: stage || "dev",
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
    productsEndpoint.addMethod("GET", new LambdaIntegration(listProductFn));

    const productsIdEndpoint = productsEndpoint.addResource("{id}");
    productsIdEndpoint.addMethod(
      "GET",
      new LambdaIntegration(retrieveProductFn)
    );

    const storeEndpoint = restApi.root.addResource("stores");
    const storeIdEndpoint = storeEndpoint.addResource("{id}");

    storeIdEndpoint.addMethod("GET", new LambdaIntegration(retrieveStoreFn));

    const subscribeEndpoint = restApi.root.addResource("subscribe");
    subscribeEndpoint.addMethod("POST", new LambdaIntegration(subscribeFn));

    const assetS3Endpoint = restApi.root.addResource("assets-s3");
    assetS3Endpoint.addMethod(
      "GET",
      new LambdaIntegration(getPreSignedS3URLFn)
    );
  }
}
