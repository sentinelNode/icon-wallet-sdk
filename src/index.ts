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
import { toRawTransaction } from '@/utils/transaction';

export class IconWallet {
  /**
   * Returns a boolean indicating if user has ICON wallet extension
   * @returns `boolean`
   */
  async connect() {
    IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_HAS_ACCOUNT);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS.REQUEST_HAS_ACCOUNT,
    ) as Promise<boolean>;
  }

  /**
   * Returns a boolean indicating if user has access to provided ICON wallet address
   * If the wallet is locked, it prompts user to unlock wallet
   * @returns `boolean`
   */
  async hasAddress(address: string) {
    if (!isValidWallet(address)) {
      throw new Error('Invalid ICON address');
    }

    IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_HAS_ADDRESS, address);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS.REQUEST_HAS_ADDRESS,
    ) as Promise<boolean>;
  }

  /**
   * Fetch the connected wallet address from ICON wallet extension.
   * If the wallet is locked, it prompts user to unlock wallet
   * @returns `string` wallet address
   */
  async getWalletAddress() {
    IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_ADDRESS);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS.REQUEST_ADDRESS,
    ) as Promise<string>;
  }

  /**
   * Request for signing 32 bytes long ICON transaction hash.
   * If the wallet is locked, it prompts user to unlock wallet
   * @param txHash txHash to sign
   * @returns `string` signature
   */
  async signTransaction(txHash: string) {
    IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_SIGNING, txHash);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS.REQUEST_SIGNING,
    ) as Promise<string>;
  }

  /**
   * Request for calling standard ICON JSON-RPC API
   * @param txObj transaction object usually built with `IconBuilder` class from `icon-sdk-js`
   * @returns `JSON_RPC_RESPONSE`
   */
  async sendTransaction(
    txObj:
      | IcxTransaction
      | DepositTransaction
      | DeployTransaction
      | MessageTransaction
      | CallTransaction,
  ) {
    const txId = parseInt((Math.random() * 10000000).toFixed(0));
    const payload = {
      jsonrpc: '2.0',
      method: 'icx_sendTransaction',
      params: toRawTransaction(txObj),
      id: txId,
    };

    IconEventHandler.request(ICON_REQUEST_EVENTS['REQUEST_JSON-RPC'], payload);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS['REQUEST_JSON-RPC'],
      txId,
    ) as Promise<JSON_RPC_RESPONSE>;
  }
}
