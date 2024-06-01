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
    timeoutMs?: number,
    txId?: number,
  ): Promise<boolean | string | JSON_RPC_RESPONSE> {
    const expectedResponseEvent: ICON_RESPONSE_EVENTS = EVENT_RESPONSE[eventName];

    return new Promise((resolve, reject) => {
      if (timeoutMs) {
        setTimeout(() => {
          reject(`Request Timed out for ${eventName}`);
        }, timeoutMs);
      }

      window.addEventListener('ICONEX_RELAY_RESPONSE', ev => {
        const { detail } = ev as CustomEvent;
        const eventOfInterest = detail.type == expectedResponseEvent;

        switch (detail.type) {
          case ICON_RESPONSE_EVENTS.RESPONSE_HAS_ACCOUNT:
            eventOfInterest && resolve(detail.payload.hasAccount as boolean);
            break;

          case ICON_RESPONSE_EVENTS.RESPONSE_HAS_ADDRESS:
            eventOfInterest && resolve(detail.payload.hasAddress as boolean);
            break;

          case ICON_RESPONSE_EVENTS.RESPONSE_ADDRESS:
          case ICON_RESPONSE_EVENTS.RESPONSE_SIGNING:
            eventOfInterest && resolve(detail.payload as string);
            break;

          case ICON_RESPONSE_EVENTS['CANCEL_SIGNING']:
            // todo: transaction id should be received
            eventName == ICON_REQUEST_EVENTS.REQUEST_SIGNING && reject('User cancelled signing');
            break;

          case ICON_RESPONSE_EVENTS['RESPONSE_JSON-RPC']:
            const responseData = detail.payload as JSON_RPC_RESPONSE;
            // only watch for the relevant txId
            if (txId === responseData.id) {
              resolve(responseData);
            }
            break;

          case ICON_RESPONSE_EVENTS['CANCEL_JSON-RPC']:
            // todo: transaction id should be received
            eventName == ICON_REQUEST_EVENTS['REQUEST_JSON-RPC'] &&
              reject('User cancelled transaction');
            break;

          default:
            reject(`Unknown ICON_RESPONSE_EVENT ${detail?.type}`);
        }
      });
    });
  }
}
