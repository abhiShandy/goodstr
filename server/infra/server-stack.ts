import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { join } from "path";

export class ServerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "ProductImages", {
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new NodejsFunction(this, "UploadProductImage", {
      entry: join(__dirname, "../functions/uploadProductImage.ts"),
      environment: {
        BUCKET: bucket.bucketName,
      },
    });
  }
}
