import { Stack, StackProps, CfnOutput, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { BaseResourceStack } from "./nested-stacks/base-resources";

export interface ApplicationConfig extends StackProps {
  project: Project
  config: StackConfig
  cfn: CloudformationConfig
}

export interface Project {
  name: string
  env: string
  account: string
  region: string
}

export interface StackConfig {
  bucketName: string;
}

export interface CloudformationConfig {
  bucketName: string;
}

export class SheetaBaseStack extends Stack {
  constructor(scope: Construct, id: string, props: ApplicationConfig) {
    super(scope, id, props);


    const { cfnBucket, configBucket } = new BaseResourceStack(
      this,
      `base-resource-${props.project.name}`,
      {
        env: props.project.env,
        projectName: props.project.name,
        cfnBucketName: props.cfn.bucketName,
        configBucketName: props.config.bucketName
      }
    );

    // tags here are for IAM condition control
    Tags.of(configBucket).add('sheeta', "config");
    Tags.of(cfnBucket).add('sheeta', "cfn");

  }
}
