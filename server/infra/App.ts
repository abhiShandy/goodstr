import { App } from "aws-cdk-lib";
import { ServerStack } from "./server-stack";

const app = new App();
new ServerStack(app, "ServerStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
