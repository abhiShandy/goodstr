import { App } from "aws-cdk-lib";
import { ServerStack } from "./ServerStack";
import { ClientStack } from "./ClientStack";

const app = new App();
new ServerStack(app, "ServerStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  tags: {
    Project: "TheGoodStr",
  },
});

new ClientStack(app, "ClientStack", {});
