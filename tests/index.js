async function connectWallet() {
  const { IconWallet } = icon_wallet_sdk;
  const res = await IconWallet.connect(2000);
  console.log(res);
}

async function hasAddress(address = 'hx254314b22930366cf1d97b3eb419b481e2986003') {
  const { IconWallet } = icon_wallet_sdk;
  const res = await IconWallet.hasAddress(address, 5000);
  console.log(res);
}

async function getWalletAddress() {
  const { IconWallet } = icon_wallet_sdk;
  const res = await IconWallet.getWalletAddress(5000);
  console.log(res);
}

async function signTransaction() {
  const txHash = '0x4b20f722d1f71eaa4d2487b91f2245019f9d5c8e1c443c924013d9b2a99737d5';
  const wallet = 'hx254314b22930366cf1d97b3eb419b481e2986003'; // source wallet
  const { IconWallet } = icon_wallet_sdk;
  const res = await IconWallet.signTransaction(wallet, txHash, 7_000); // time out after 20 sec
  console.log(res);
}

async function sendTransaction() {
  const transaction = {
    to: 'hx08de5fde771d50288c7cd0672f9b599019a45115',
    from: 'hx254314b22930366cf1d97b3eb419b481e2986003', // source wallet
    nid: '0x1',
    version: '0x3',
    timestamp: Date.now(),
    stepLimit: '0x3d0900',
    value: '0x16345785d8a0000',
  };
  const { IconWallet } = icon_wallet_sdk;
  const res = await IconWallet.sendTransaction(transaction, 7_000); // time out after 7 sec
  console.log(res);
}
