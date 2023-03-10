import * as cdk from "aws-cdk-lib";
import { ServerStack } from "./server-stack";

const app = new cdk.App();
new ServerStack(app, "ServerStack", {});
