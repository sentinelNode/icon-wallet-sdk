# SDK Specification

## IconWallet

A utility class which provides utility methods to interact with ICON wallets ([Hana](https://hanawallet.io/) and [ICONex](https://chromewebstore.google.com/detail/iconex/flpiciilemghbmfalicajoolhkkenfel?hl=en)).

### connect()

Returns a boolean indicating if user has ICON wallet extension available.

```javascript
IconWallet.connect() => Promise<boolean>;
```

#### Returns

A boolean indicating if user has ICON wallet extension available.

### hasAddress()

Returns a boolean indicating if user has access to provided ICON wallet address. If the wallet is locked, it prompts user to unlock wallet.

```javascript
IconWallet.hasAddress(address: string) => Promise<boolean>;
```

#### Returns

A boolean indicating if user has access to provided ICON wallet address.

### getWalletAddress()

Fetch the connected wallet address from ICON wallet extension. If the wallet is locked, it prompts user to unlock wallet.

```javascript
IconWallet.getWalletAddress() => Promise<string>;
```

#### Returns

User's ICON wallet address.

### signTransaction()

Request for signing 32 bytes long transaction hash. If the wallet is locked, it prompts user to unlock wallet.

```javascript
IconWallet.signTransaction(txHash: string) => Promise<string>;
```

#### Returns

Signature string of the signed message. If the wallet is locked, it prompts user to unlock wallet.

### sendTransaction()

Request for calling standard ICON JSON-RPC API.

```javascript
IconWallet.sendTransaction(txObj: IcxTransaction | DepositTransaction | DeployTransaction | MessageTransaction | CallTransaction) => Promise<string>;
```

#### Returns

Raw JSON Response from ICON RPC node.
