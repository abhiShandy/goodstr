import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { join } from "path";
import NodejsFunction from "./lib/NodejsFunction";

export class ServerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const imageBucket = new Bucket(this, "GoodImages", {
      publicReadAccess: true,
    });

    const assetBucket = new Bucket(this, "Assets", {
      cors: [
        {
          allowedHeaders: ["*"],
          allowedMethods: [HttpMethods.PUT],
          allowedOrigins: ["*"],
        },
      ],
    });

    const stage = scope.node.tryGetContext("stage") as string | undefined;

    const secret = stage
      ? Secret.fromSecretNameV2(
          this,
          `MONGO_URL`,
          `${stage.toUpperCase()}_MONGO_URL`
        )
      : Secret.fromSecretNameV2(this, `MONGO_URL`, `MONGO_URL`);

    // === Lambdas ===
    const createGoodFn = new NodejsFunction(this, "CreateGood", {
      entry: join(__dirname, "../server/functions/createGood.ts"),
      environment: {
        BUCKET: imageBucket.bucketName,
        SECRETS_ARN: secret.secretArn,
      },
    });

    imageBucket.grantWrite(createGoodFn);
    secret.grantRead(createGoodFn);

    const listGoodFn = new NodejsFunction(this, "ListGoods", {
      entry: join(__dirname, "../server/functions/listGoods.ts"),
      environment: {
        BUCKET: imageBucket.bucketName,
        SECRETS_ARN: secret.secretArn,
      },
    });

    secret.grantRead(listGoodFn);

    const retrieveGoodFn = new NodejsFunction(this, "RetrieveGood", {
      entry: join(__dirname, "../server/functions/retrieveGood.ts"),
      environment: {
        BUCKET: imageBucket.bucketName,
        SECRETS_ARN: secret.secretArn,
      },
    });

    secret.grantRead(retrieveGoodFn);

    const subscribeFn = new NodejsFunction(this, "Subscribe", {
      entry: join(__dirname, "../server/functions/subscribe.ts"),
      environment: {
        SECRETS_ARN: secret.secretArn,
      },
    });
    secret.grantRead(subscribeFn);

    const getAssetUploadURLFn = new NodejsFunction(this, "GetAssetUploadURL", {
      entry: join(__dirname, "../server/functions/getAssetUploadURL.ts"),
      environment: {
        BUCKET: assetBucket.bucketName,
      },
    });

    assetBucket.grantWrite(getAssetUploadURLFn);

    const getAssetDownloadURL = new NodejsFunction(
      this,
      "GetAssetDownloadURL",
      {
        entry: join(__dirname, "../server/functions/getAssetDownloadURL.ts"),
        environment: {
          BUCKET: assetBucket.bucketName,
          SECRETS_ARN: secret.secretArn,
        },
      }
    );

    secret.grantRead(getAssetDownloadURL);
    assetBucket.grantRead(getAssetDownloadURL);

    const getGoodDownloadsFn = new NodejsFunction(this, "GetGoodDownloads", {
      entry: join(__dirname, "../server/functions/getGoodDownloads.ts"),
      environment: {
        SECRETS_ARN: secret.secretArn,
      },
    });

    secret.grantRead(getGoodDownloadsFn);

    // === API Gateway ===
    const restApi = new RestApi(this, "RestApi", {
      restApiName: `${stage || "dev"}-goodstr-api`,
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

    /**
     * /goods
     */
    const goodsEndpoint = restApi.root.addResource("goods");

    goodsEndpoint.addMethod("POST", new LambdaIntegration(createGoodFn));
    goodsEndpoint.addMethod("GET", new LambdaIntegration(listGoodFn));

    /**
     * /goods/{id}
     */
    const goodsIdEndpoint = goodsEndpoint.addResource("{id}");
    goodsIdEndpoint.addMethod("GET", new LambdaIntegration(retrieveGoodFn));

    /**
     * /goods/{id}/assets
     */
    const assetEndpoint = goodsIdEndpoint.addResource("assets");
    /**
     * /goods/upload
     */
    const assetUploadEndpoint = goodsEndpoint.addResource("upload");

    assetUploadEndpoint.addMethod(
      "GET",
      new LambdaIntegration(getAssetUploadURLFn)
    );

    assetEndpoint.addMethod("GET", new LambdaIntegration(getAssetDownloadURL));

    /**
     * /goods/{id}/downloads
     */
    const downloadsEndpoint = goodsIdEndpoint.addResource("downloads");
    downloadsEndpoint.addMethod(
      "GET",
      new LambdaIntegration(getGoodDownloadsFn)
    );

    /**
     * /subscribe
     */
    const subscribeEndpoint = restApi.root.addResource("subscribe");
    subscribeEndpoint.addMethod("POST", new LambdaIntegration(subscribeFn));
  }
}
