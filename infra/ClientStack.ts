import { Stack, StackProps } from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
  CloudFrontWebDistribution,
  ViewerCertificate,
} from "aws-cdk-lib/aws-cloudfront";
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

    const stage = this.node.tryGetContext("stage") || "dev";
    const domainName = `${stage}.thegoodstr.com`;

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName,
    });

    const sslCert = new Certificate(this, `${stage}Certificate`, {
      domainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const clientDistribution = new CloudFrontWebDistribution(
      this,
      "ClientDistribution",
      {
        comment: `Client Distribution for ${stage}`,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        defaultRootObject: "index.html",
        viewerCertificate: ViewerCertificate.fromAcmCertificate(sslCert, {
          aliases: [domainName],
        }),
        errorConfigurations: [
          {
            errorCode: 403,
            errorCachingMinTtl: 10,
            responsePagePath: "/index.html",
            responseCode: 200,
          },
        ],
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
      recordName: domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(clientDistribution)),
    });
  }
}
