import { Stack, StackProps } from "aws-cdk-lib";
import { CloudFrontWebDistribution } from "aws-cdk-lib/aws-cloudfront";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { join } from "path";

export class ClientStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "ClientBucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName: "thegoodstr.com",
    });

    const clientDistribution = new CloudFrontWebDistribution(
      this,
      "ClientDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        defaultRootObject: "index.html",
      }
    );

    new BucketDeployment(this, "ClientBucketDeployment", {
      destinationBucket: bucket,
      sources: [Source.asset(join(__dirname, "../client/dist"))],
      distribution: clientDistribution,
      distributionPaths: ["/index.html"],
    });

    new ARecord(this, "ClientARecord", {
      zone: hostedZone,
      recordName: "thegoodstr.com",
      target: RecordTarget.fromAlias(new CloudFrontTarget(clientDistribution)),
    });
  }
}
