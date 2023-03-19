import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction as AWSNodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

class NodejsFunction extends AWSNodejsFunction {
  constructor(scope: Construct, id: string, props: NodejsFunctionProps) {
    super(scope, id, {
      runtime: Runtime.NODEJS_16_X,
      memorySize: 1024,
      ...props,
    });
  }
}

export default NodejsFunction;
