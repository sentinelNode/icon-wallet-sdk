import { IconEventHandler } from './eventHandler';
import { ICON_REQUEST_EVENTS } from '@/types/IconWallet.types';
import {
  CallTransaction,
  DeployTransaction,
  DepositTransaction,
  IcxTransaction,
  JSON_RPC_RESPONSE,
  MessageTransaction,
} from '@/types/transaction.types';
import { isValidWallet } from '@/utils/address';
import { isValidTxHash, toRawTransaction } from '@/utils/transaction';

export class IconWallet {
  /**
   * Returns a boolean indicating if user has ICON wallet extension
   * @param timeoutMs timeout in ms for this request
   * @returns `boolean
   */
  static async connect(timeoutMs?: number) {
    return new Promise((resolve, reject) => {
      IconEventHandler.getEventResponse(ICON_REQUEST_EVENTS.REQUEST_HAS_ACCOUNT, timeoutMs)
        .then(res => resolve(res as boolean))
        .catch(err => resolve(false));
      IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_HAS_ACCOUNT);
    }) as Promise<boolean>;
  }

  /**
   * Returns a boolean indicating if user has access to provided ICON wallet address
   * If the wallet is locked, it prompts user to unlock wallet
   * @param address ICON wallet address
   * @param timeoutMs timeout in ms for this request
   * @returns `boolean`
   */
  static hasAddress(address: string, timeoutMs?: number) {
    return new Promise((resolve, reject) => {
      if (!isValidWallet(address)) {
        throw new Error('Invalid ICON address');
      }

      IconEventHandler.getEventResponse(ICON_REQUEST_EVENTS.REQUEST_HAS_ADDRESS, timeoutMs)
        .then(res => resolve(res as boolean))
        .catch(err => reject(err));
      IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_HAS_ADDRESS, address);
    }) as Promise<boolean>;
  }

  /**
   * Fetch the connected wallet address from ICON wallet extension.
   * If the wallet is locked, it prompts user to unlock wallet
   * @param timeoutMs timeout in ms for this request
   * @returns `string` wallet address
   */
  static async getWalletAddress(timeoutMs?: number) {
    return new Promise((resolve, reject) => {
      IconEventHandler.getEventResponse(ICON_REQUEST_EVENTS.REQUEST_ADDRESS, timeoutMs)
        .then(res => resolve(res as string))
        .catch(err => reject(err));
      IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_ADDRESS);
    }) as Promise<string>;
  }

  /**
   * Request for signing 32 bytes long ICON transaction hash.
   * If the wallet is locked, it prompts user to unlock wallet
   * @param walletAddress wallet address to sign with
   * @param txHash txHash to sign
   * @param timeoutMs timeout in ms for this request
   * @returns `string` signature
   */
  static async signTransaction(walletAddress: string, txHash: string, timeoutMs?: number) {
    if (!isValidTxHash(txHash)) {
      throw new Error('32 bytes long ICON transaction hash is required');
    }
    if (!isValidWallet(walletAddress)) {
      throw new Error('Invalid ICON address');
    }

    return new Promise((resolve, reject) => {
      IconEventHandler.getEventResponse(ICON_REQUEST_EVENTS.REQUEST_SIGNING, timeoutMs)
        .then(res => resolve(res as string))
        .catch(err => reject(err));
      IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_SIGNING, {
        from: walletAddress,
        hash: txHash.slice(2),
      });
    }) as Promise<string>;
  }

  /**
   * Request for calling standard ICON JSON-RPC API
   * @param txObj transaction object usually built with `IconBuilder` class from `icon-sdk-js`
   * @param timeoutMs timeout in ms for this request
   * @returns `JSON_RPC_RESPONSE`
   */
  static async sendTransaction(
    txObj:
      | IcxTransaction
      | DepositTransaction
      | DeployTransaction
      | MessageTransaction
      | CallTransaction,
    timeoutMs?: number,
  ) {
    const txId = parseInt((Math.random() * 10000000).toFixed(0));
    const payload = {
      jsonrpc: '2.0',
      method: 'icx_sendTransaction',
      params: toRawTransaction(txObj),
      id: txId,
    };

    return new Promise((resolve, reject) => {
      IconEventHandler.getEventResponse(ICON_REQUEST_EVENTS['REQUEST_JSON-RPC'], timeoutMs, txId)
        .then(res => resolve(res as JSON_RPC_RESPONSE))
        .catch(err => reject(err));
      IconEventHandler.request(ICON_REQUEST_EVENTS['REQUEST_JSON-RPC'], payload);
    }) as Promise<JSON_RPC_RESPONSE>;
  }
}
