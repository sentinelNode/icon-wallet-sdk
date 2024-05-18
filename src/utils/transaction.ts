import { RawTransaction, Hash } from '@/types/transaction.types';
import BigNumber from 'bignumber.js';

export function isValidTxHash(txHash: string) {
  const regex = /^0x[a-fA-F0-9]{64}$/;
  return regex.test(txHash);
}

export function toHexNumber(value: Hash): string {
  const valueBN = BigNumber.isBigNumber(value) ? value : new BigNumber(value);
  const valueHex = valueBN.toString(16);
  return `0x${valueHex}`;
}

export function toRawTransaction(transaction: any): RawTransaction {
  const { to, from, stepLimit, nid, version, timestamp, dataType, data, value, nonce } =
    transaction;

  const rawTransaction: RawTransaction = {
    to,
    from,
    nid: toHexNumber(nid),
    version: toHexNumber(version),
    timestamp: toHexNumber(timestamp),
  };

  if (stepLimit) {
    rawTransaction['stepLimit'] = toHexNumber(stepLimit);
  }

  if (value) {
    rawTransaction['value'] = toHexNumber(value);
  }

  if (nonce) {
    rawTransaction['nonce'] = toHexNumber(nonce);
  }

  if (dataType) {
    rawTransaction['dataType'] = dataType;
  }

  if (data) {
    rawTransaction['data'] = data;
  }

  return rawTransaction;
}
