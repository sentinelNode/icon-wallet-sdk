import { IconWallet } from './dist/icon_wallet_sdk.bundle.js';

var userWallet = '';

async function connectWallet() {
  const res = await IconWallet.connect(2000);
  console.log(res);
}

async function hasAddress(address = 'hx254314b22930366cf1d97b3eb419b481e2986003') {
  const res = await IconWallet.hasAddress(address, 5000);
  console.log(res);
}

async function getWalletAddress() {
  const walletAddress = await IconWallet.getWalletAddress(5000);
  console.log(walletAddress);

  userWallet = walletAddress;

  const userWalletSection = document.getElementById('wallet-address');
  userWalletSection.innerHTML = `Wallet Address = ${walletAddress}`;
}

async function signTransaction() {
  const txHash = '0x4b20f722d1f71eaa4d2487b91f2245019f9d5c8e1c443c924013d9b2a99737d5';

  const res = await IconWallet.signTransaction(userWallet, txHash, 7_000); // time out after 20 sec
  console.log(res);
}

async function sendTransaction() {
  const transaction = {
    to: 'hx08de5fde771d50288c7cd0672f9b599019a45115',
    from: userWallet, // use your wallet address here
    nid: '0x1',
    version: '0x3',
    timestamp: Date.now() * 1000,
    stepLimit: '0x3d0900',
    value: '0x16345785d8a0000',
  };

  const res = await IconWallet.sendTransaction(transaction, 7_000); // time out after 7 sec
  console.log(res);
}

function printNewLine(lines) {
  while (lines-- > 0) {
    var newLine = document.createElement('br');
    document.body.append(newLine);
  }
}

function createButtons() {
  const userWalletSection = document.createElement('p');
  userWalletSection.id = 'wallet-address';
  document.body.append(userWalletSection);

  printNewLine(2);

  const connectBtn = document.createElement('button');
  connectBtn.onclick = ev => connectWallet();
  connectBtn.innerHTML = 'Connect Wallet';
  document.body.append(connectBtn);

  printNewLine(2);

  const hasAddressBtn = document.createElement('button');
  hasAddressBtn.onclick = ev => hasAddress();
  hasAddressBtn.innerHTML = 'Has address hx254314b22930366cf1d97b3eb419b481e2986003?';
  document.body.append(hasAddressBtn);

  printNewLine(2);

  const getWalletBtn = document.createElement('button');
  getWalletBtn.onclick = ev => getWalletAddress();
  getWalletBtn.innerHTML = 'get wallet address';
  document.body.append(getWalletBtn);

  printNewLine(2);

  const signTxnBtn = document.createElement('button');
  signTxnBtn.onclick = ev => signTransaction();
  signTxnBtn.innerHTML = 'sign transaction';
  document.body.append(signTxnBtn);

  printNewLine(2);

  const sendTxnBtn = document.createElement('button');
  sendTxnBtn.onclick = ev => sendTransaction();
  sendTxnBtn.innerHTML = 'send transaction';
  document.body.append(sendTxnBtn);

  printNewLine(2);
}

createButtons();
