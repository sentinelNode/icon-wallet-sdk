import BigNumber from 'bignumber.js';

export interface JSON_RPC_RESPONSE {
  jsonrpc: number;
  result: string;
  id: number;
}

export type Hash = string | BigNumber | number;

export interface IcxTransaction {
  to: string;
  from: string;
  value: Hash;
  stepLimit: Hash;
  nid: Hash;
  nonce: Hash;
  version: Hash;
  timestamp: Hash;
  data: string;
  dataType: any;
}

export interface DepositTransaction extends IcxTransaction {
  dataType: 'deposit';
  to: string;
  from: string;
  value: Hash;
  stepLimit: Hash;
  nid: Hash;
  nonce: Hash;
  version: Hash;
  timestamp: Hash;
  data: any;
}

export interface CallTransaction extends IcxTransaction {
  dataType: 'call';
  to: string;
  from: string;
  value: Hash;
  stepLimit: Hash;
  nid: Hash;
  nonce: Hash;
  version: Hash;
  timestamp: number;
  signature: string;
  method: string;
  params: any;
  data: any;
}

export interface DeployTransaction extends IcxTransaction {
  dataType: 'deploy';
  to: string;
  from: string;
  value: Hash;
  stepLimit: Hash;
  nid: Hash;
  nonce: Hash;
  version: Hash;
  timestamp: Hash;
  params: any;
  data: any;
}

export interface MessageTransaction extends IcxTransaction {
  dataType: 'message';
  to: string;
  from: string;
  value: Hash;
  stepLimit: Hash;
  nid: Hash;
  nonce: Hash;
  version: Hash;
  timestamp: Hash;
  data: string;
}

export interface RawTransaction {
  [key: string]: string | object;
}
