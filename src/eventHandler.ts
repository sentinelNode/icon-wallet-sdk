import { EVENT_RESPONSE } from './constants';
import { ICON_REQUEST_EVENTS, ICON_RESPONSE_EVENTS } from '@/types/IconWallet.types';
import { JSON_RPC_RESPONSE } from '@/types/transaction.types';

export class IconEventHandler {
  static request(eventName: ICON_REQUEST_EVENTS, payload?: unknown) {
    const eventDetail: any = {
      type: eventName,
    };
    if (payload) {
      eventDetail.payload = payload;
    }
    window.dispatchEvent(
      new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: eventDetail,
      }),
    );
  }

  static getEventResponse(
    eventName: ICON_REQUEST_EVENTS,
    txId?: number,
  ): Promise<boolean | string | JSON_RPC_RESPONSE> {
    return new Promise((resolve, reject) => {
      window.addEventListener(EVENT_RESPONSE[eventName], ev => {
        const { detail } = ev as CustomEvent;

        switch (detail.type) {
          case ICON_RESPONSE_EVENTS.RESPONSE_HAS_ACCOUNT:
            resolve(detail.payload.hasAccount as boolean);

          case ICON_RESPONSE_EVENTS.RESPONSE_HAS_ADDRESS:
            resolve(detail.payload.hasAddress as boolean);

          case ICON_RESPONSE_EVENTS.RESPONSE_ADDRESS:
          case ICON_RESPONSE_EVENTS.RESPONSE_SIGNING:
            resolve(detail.payload as string);

          case ICON_RESPONSE_EVENTS['RESPONSE_JSON-RPC']:
            const responseData = detail.payload as JSON_RPC_RESPONSE;
            // only watch for the relevant txId
            if (txId === responseData.id) {
              resolve(responseData);
            }
            break;

          case ICON_RESPONSE_EVENTS['CANCEL_JSON-RPC']:
            // todo: transaction id should be received here from wallet
            reject('User cancelled transaction');
          default:
            reject(`Unknown ICON_RESPONSE_EVENT ${detail?.type}`);
        }
      });
    });
  }
}
