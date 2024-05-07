import { IconEventHandler } from './eventHandler';
import { ICON_REQUEST_EVENTS } from './types/IconWallet.types';

export class IconWallet {
  async connect() {
    IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_HAS_ACCOUNT);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS.REQUEST_HAS_ACCOUNT,
    ) as Promise<boolean>;
  }
  async getWalletAddress() {
    IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_ADDRESS);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS.REQUEST_ADDRESS,
    ) as Promise<string>;
  }
  async signTransaction() {
    IconEventHandler.request(ICON_REQUEST_EVENTS.REQUEST_SIGNING);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS.REQUEST_SIGNING,
    ) as Promise<string>;
  }
  async sendTransaction() {
    IconEventHandler.request(ICON_REQUEST_EVENTS['REQUEST_JSON-RPC']);
    return IconEventHandler.getEventResponse(
      ICON_REQUEST_EVENTS['REQUEST_JSON-RPC'],
    ) as Promise<object>;
  }
}
