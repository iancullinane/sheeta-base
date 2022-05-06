import { Tags, NestedStack, NestedStackProps, CfnOutput } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

import * as pants from "@ianpants/pants-constructs";
import { Ec2Action } from "aws-cdk-lib/aws-cloudwatch-actions";

export interface LookUpProps extends NestedStackProps {
  env: string;
  projectName: string;
  cfnBucketName: string;
  configBucketName: string;
}

export class BaseResourceStack extends NestedStack {

  public readonly cfnBucket: s3.IBucket;
  public readonly configBucket: s3.IBucket;
  public readonly vpc: ec2.IVpc;

  constructor(scope: Construct, id: string, props: LookUpProps) {
    super(scope, id, props);

    this.cfnBucket = new pants.AllPurposeBucket(this, `cfn-bucket-${props.projectName}-${props.env}`, {
      bucketName: props.cfnBucketName,
      destroyOnDelete: "yes"
    }).bucket
    Tags.of(this.cfnBucket).add('Name', props.cfnBucketName);

    new CfnOutput(this, `${props.projectName}-${props.env}-cfn-bucket`, { value: this.cfnBucket.bucketName });

    this.configBucket = new pants.AllPurposeBucket(this, `config-bucket-${props.projectName}-${props.env}`, {
      bucketName: props.configBucketName,
      destroyOnDelete: "yes"
    }).bucket
    Tags.of(this.configBucket).add('Name', props.configBucketName);

    new CfnOutput(this, `${props.projectName}-${props.env}-config-bucket`, { value: this.configBucket.bucketName });

    this.vpc = new pants.SimpleVpc(this, `vpc-${props.projectName}`, {
      project_name: props.projectName
    }).vpc

    new CfnOutput(this, `${props.projectName}-${props.env}-vpc`, { value: this.vpc.vpcId });

  }

}
