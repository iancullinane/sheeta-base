import { Stack, StackProps, CfnOutput, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pants from "@ianpants/pants-constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface ApplicationConfig extends StackProps {
  project: Project
  cfn: CloudformationConfig
}

interface Project {
  name: string
  env: string
  account: string
  region: string
}

export interface CloudformationConfig {
  bucketName: string;
}

export class SheetaBaseStack extends Stack {
  constructor(scope: Construct, id: string, props: ApplicationConfig) {
    super(scope, id, props);

    const cfnSyncBucket = new pants.AllPurposeBucket(this, `bucket`, {
      bucketName: props.cfn.bucketName
    })
    Tags.of(cfnSyncBucket).add('Name', props.cfn.bucketName);

    new CfnOutput(this, `${props.project.env}-${props.project.name}-cfn-bucket`, { value: cfnSyncBucket.bucket.bucketName });

  }
}
