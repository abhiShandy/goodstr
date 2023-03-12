import { Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class ClientStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Bucket(this, "ClientBucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });
  }
}
