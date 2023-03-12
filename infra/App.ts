import { App } from "aws-cdk-lib";
import { ServerStack } from "./ServerStack";
import { ClientStack } from "./ClientStack";

const app = new App();

const CLIStage = app.node.tryGetContext("stage");

new ServerStack(app, `Server${CLIStage ? `-${CLIStage}` : ""}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  tags: {
    Project: "TheGoodStr",
  },
});

new ClientStack(app, `Client${CLIStage ? `-${CLIStage}` : ""}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  tags: {
    Project: "TheGoodStr",
  },
});
