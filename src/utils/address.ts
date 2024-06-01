export function isValidWallet(address: string) {
  const regex = /^hx([a-f0-9]){40}$/;
  return regex.test(address);
}

export function isValidContract(address: string) {
  const regex = /^cx([a-f0-9]){40}$/;
  return regex.test(address);
}
