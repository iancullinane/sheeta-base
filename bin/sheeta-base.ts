#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import * as fs from "fs";
import { SheetaBaseStack } from '../lib/sheeta-base-stack';

import { ApplicationConfig } from '../lib/sheeta-base-stack';


// var lclCfg = JSON.parse(fs.readFileSync('config/local.json', 'utf-8')) as ApplicationConfig;
// For demo purposes only
var lclCfg = {
  project: {
    name: "sheeta",
    account: "208744038881",
    region: "us-east-2",
    env: "dev"
  },
  cfn: {
    bucketName: "sheeta-cfn-bucket"
  },
  config: {
    bucketName: "sheeta-config-bucket"
  }
}

const envSheeta = { region: lclCfg.project.region, account: lclCfg.project.account };
const app = new App();
new SheetaBaseStack(app, 'SheetaBaseStack', {
  env: envSheeta,
  ...lclCfg
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
app.synth();
